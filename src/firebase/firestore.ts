import { db } from "./config.js";
import { collection, addDoc } from "firebase/firestore";

export async function saveResponse(userId: string, prompt: string, response: string) {
  try {
    await addDoc(collection(db, "responses"), {
      userId,
      prompt,
      response,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Error saving response:", err);
  }
}
