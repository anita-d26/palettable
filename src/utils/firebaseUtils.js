// firebaseUtils.js - Utility functions to interact with Firestore for saving, retrieving, and clearing palettes

import { db } from "../firebase"; // Firebase config and initialized Firestore instance
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

// Name of the Firestore collection used for storing palettes
const PALETTE_COLLECTION = "palettes";

// Saves a palette object to Firestore
// @param {Object} paletteData - An object containing mood, paletteType, hexValues, etc.
export const savePalette = async (paletteData) => {
  try {
    // Adds a new document with a timestamp
    const docRef = await addDoc(collection(db, PALETTE_COLLECTION), {
      ...paletteData,
      timestamp: new Date(),
    });
    console.log("Palette saved with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving palette: ", error);
  }
};

// Retrieves all palettes from Firestore
// @returns {Array} An array of palette objects including their Firestore document IDs
export const getPalettes = async () => {
  try {
    const snapshot = await getDocs(collection(db, PALETTE_COLLECTION));
    // Map Firestore documents to array of JS objects with ID included
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching palettes: ", error);
    return [];
  }
};

// Deletes all palettes in the Firestore collection 
export const clearAllPalettes = async () => {
  try {
    const snapshot = await getDocs(collection(db, PALETTE_COLLECTION));
    // Create an array of delete promises for each doc
    const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletions); // Wait for all deletions to complete
    console.log("All palettes deleted");
  } catch (error) {
    console.error("Error clearing palettes:", error);
  }
};