// Client helper that calls our Firebase Function proxy in prod.
// In development, you can set VITE_USE_DIRECT_HF=1 with VITE_HF_API_KEY and VITE_HF_MODEL
// to call Hugging Face directly while the proxy isn't deployed.
export async function queryHuggingFace(prompt: string) {
    const isDev = import.meta.env.DEV;
    const useDirect = import.meta.env.VITE_USE_DIRECT_HF === '1';
    const proxyUrl = import.meta.env.VITE_HF_PROXY_URL || '/api/hf';

    if (isDev && useDirect) {
        const apiKey = import.meta.env.VITE_HF_API_KEY as string | undefined;
        const endpointUrl = import.meta.env.VITE_HF_ENDPOINT_URL as string | undefined;
        const model = (import.meta.env.VITE_HF_MODEL as string | undefined) || 'Swasti2004/results';
        if (!apiKey) {
            throw new Error('Missing VITE_HF_API_KEY for direct dev calls');
        }
        const url = endpointUrl || `https://api-inference.huggingface.co/models/${model}`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } }),
        });
        if (!resp.ok) {
            const errorText = await resp.text();
            throw new Error(`Direct Hugging Face request failed: ${resp.status} ${errorText}`);
        }
        return resp.json();
    }

    const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face proxy request failed: ${response.status} ${errorText}`);
    }
    return response.json();
}

// Unified AI query: prefers Gemini if VITE_GEMINI_API_KEY is set; falls back to Hugging Face
export async function queryAI(
    prompt: string,
    history?: Array<{ role: "assistant" | "user"; content: string }>
): Promise<string | unknown> {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    const model = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || 'gemini-1.5-flash';

    if (geminiKey) {
        // Call Gemini directly from the client in dev. For production, proxy via server.
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
        // Trim history to last 6 messages to keep latency low
        const trimmed = Array.isArray(history) ? history.slice(-6) : [];
        for (const msg of trimmed) {
            contents.push({ role: msg.role === 'assistant' ? 'model' : 'user', parts: [{ text: msg.content }] });
        }
        contents.push({ role: 'user', parts: [{ text: prompt }] });

        // Add a timeout to fail fast on slow networks
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents }),
            signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(`Gemini request failed: ${resp.status} ${errText}`);
        }
        const data = await resp.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                     data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('\n');
        return text || "I'm here with you. Could you share a bit more?";
    }

    // Fallback to Hugging Face
    return queryHuggingFace(prompt);
}

export function extractTopEmotion(hfResponse: unknown): { label: string; score: number } | null {
    try {
        const arr = hfResponse as Array<Array<{ label: string; score: number }>>;
        const scores = Array.isArray(arr) && Array.isArray(arr[0]) ? arr[0] : [];
        if (!scores.length) return null;
        const sorted = [...scores].sort((a, b) => b.score - a.score);
        return sorted[0] || null;
    } catch {
        return null;
    }
}

// Convert HF emotion scores into a supportive, human message
export function formatEmotionResponse(hfResponse: unknown, userText: string): string {
    try {
        const arr = hfResponse as Array<Array<{ label: string; score: number }>>;
        const scores = Array.isArray(arr) && Array.isArray(arr[0]) ? arr[0] : [];
        if (!scores.length) {
            return "I'm here for you. Tell me more about how you're feeling right now.";
        }
        const sorted = [...scores].sort((a, b) => b.score - a.score);
        const top = sorted[0];
        const confidence = Math.round((top.score || 0) * 100);

        const suggestionsByLabel: Record<string, string[]> = {
            anger: [
                "Try a slow 4-7-8 breath: inhale 4s, hold 7s, exhale 8s",
                "If you can, step away briefly and name what feels unfair",
            ],
            fear: [
                "Ground yourself: notice 5 things you see, 4 you feel, 3 you hear",
                "Remind yourself: feelings are real, and they also pass",
            ],
            sadness: [
                "Be gentle with yourself—it's okay to move slowly today",
                "A short walk or a warm drink can help ease heaviness",
            ],
            joy: [
                "That's lovely—what made it feel good? Let's build on that",
                "Capture this moment: a note, a photo, or a small celebration",
            ],
            surprise: [
                "Unexpected moments can be a lot—take a breath and check in",
                "What part of this surprise matters most right now?",
            ],
        };

        const label = (top.label || "").toLowerCase();
        const friendly: Record<string, string> = {
            anger: "I’m sensing a lot of frustration or anger.",
            fear: "It sounds like there’s worry or fear coming up.",
            joy: "I’m picking up joy and positive energy.",
            sadness: "I’m sensing sadness—thank you for sharing this.",
            surprise: "There may be some surprise or shock in what you're feeling.",
        };

        const opening = friendly[label] || "I’m here with you—thanks for sharing.";
        const tips = suggestionsByLabel[label] || [
            "Let’s take one small step you can manage right now",
            "A few calm breaths can help steady things",
        ];

        return [
            opening,
            `Confidence: ~${confidence}%`,
            `You said: “${userText}”`,
            `Helpful next steps: 1) ${tips[0]}  2) ${tips[1]}`,
            "If you'd like, I can also connect you to more resources.",
        ].join("\n\n");
    } catch {
        return "I’m here for you. Would you like to share a bit more?";
    }
}

// High-level conversational reply with simple intent handling for greetings and short messages
export function generateChatReply(
    userText: string,
    hfResponse: unknown,
    history?: Array<{ role: "assistant" | "user"; content: string }>,
    previousTopLabel?: string | null
): string {
    const text = (userText || "").trim();
    const lower = text.toLowerCase();
    const isVeryShort = text.split(/\s+/).filter(Boolean).length <= 2;

    const greetings = /^(hi|hello|hey|yo|hola|namaste|namaskar|good\s*(morning|afternoon|evening))\b/;
    const thanks = /(thank you|thanks|thx|ty)\b/;
    const bye = /\b(bye|goodbye|see you|ttyl)\b/;

    if (!text) {
        return "Hi, I’m here with you. What’s on your mind today?";
    }
    if (greetings.test(lower)) {
        return "Hey! I’m glad you’re here. How are you feeling right now?";
    }
    if (thanks.test(lower)) {
        return "You’re welcome. I’m here anytime—want to talk more about how you’re feeling?";
    }
    if (bye.test(lower)) {
        return "Take care. If you need me later, I’ll be here for you.";
    }

    // For very short inputs, invite the user to share more instead of jumping to labels
    if (isVeryShort) {
        return "I hear you. Would you like to tell me a bit more about what’s going on?";
    }

    // Default: use the emotion formatter, but reduce repetition if same emotion persists
    const top = extractTopEmotion(hfResponse);
    const label = (top?.label || "").toLowerCase();
    const confidence = Math.round((top?.score || 0) * 100);

    const followUps: Record<string, string[]> = {
        anger: [
            "What feels most unfair or stuck right now?",
            "Would you like to try a quick 60-second reset together?",
        ],
        fear: [
            "What’s the scariest ‘what if’ in your mind? Let’s reality-check it.",
            "Would a 5-4-3-2-1 grounding exercise help right now?",
        ],
        sadness: [
            "What would feel gentle and doable for the next hour?",
            "Who or what usually comforts you in moments like this?",
        ],
        joy: [
            "I love that. What made it special?",
            "How can we bottle a bit of this for later?",
        ],
        surprise: [
            "What part of this surprise matters most to you?",
            "Do you want to talk through possible next steps?",
        ],
    };

    if (previousTopLabel && label && previousTopLabel.toLowerCase() === label) {
        const options = followUps[label] || [
            "What feels like the next small step we can take together?",
            "I’m with you—tell me more about what you need right now.",
        ];
        return [
            `I’m still with you. I’m hearing ${label} in what you’re sharing.`,
            `You said: “${userText}”`,
            `Next step: ${options[0]}`,
        ].join("\n\n");
    }

    return formatEmotionResponse(hfResponse, userText);
}
