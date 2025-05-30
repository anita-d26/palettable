// SavePalette.js - saves palette

import { db, collection, addDoc } from "../firebase";

export const savePalette = async (mood, description, colors) => {
  try {
    const docRef = await addDoc(collection(db, "palettes"), {
      mood,
      description,
      colors,
      timestamp: new Date()
    });
    console.log("Palette saved with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};