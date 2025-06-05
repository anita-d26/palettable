// firebaseUtils.js

import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const PALETTE_COLLECTION = "palettes";

export const savePalette = async (paletteData) => {
  try {
    const docRef = await addDoc(collection(db, PALETTE_COLLECTION), {
      ...paletteData,
      timestamp: new Date(),
    });
    console.log("Palette saved with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving palette: ", error);
  }
};

export const getPalettes = async () => {
  try {
    const snapshot = await getDocs(collection(db, PALETTE_COLLECTION));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching palettes: ", error);
    return [];
  }
};

export const clearAllPalettes = async () => {
  try {
    const snapshot = await getDocs(collection(db, PALETTE_COLLECTION));
    const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletions);
    console.log("All palettes deleted");
  } catch (error) {
    console.error("Error clearing palettes:", error);
  }
};