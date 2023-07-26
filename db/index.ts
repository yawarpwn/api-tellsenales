import type { Product } from "../types/product.d.ts";
import { PRODUCTS_COLLECTION_NAME } from "../constants.ts";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { FIREBASE_CONFIG } from "../config.ts";



const firebaseApp = initializeApp(JSON.parse(FIREBASE_CONFIG));
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

const productsCol = collection(db, PRODUCTS_COLLECTION_NAME);

/*
try {

  const docRef = await addDoc(productsCol, {
    name: 'neyda',
    middle: 'Maldonado',
    code: 'qlo',
    born: 1989
  })
  console.log('[Firestore:] doc added with id: ', docRef.id)
} catch(err) {
  console.log('[Firestore:] Error adding doc: ', err)
}
*/

export async function getProducts() {
  const productsSnapshot = await getDocs(productsCol);
  const productsList = productsSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return productsList;
}

export async function getProduct(id: string) {
  const docRef = doc(productsCol, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  } else {
    throw new Error("[Firestore]: Doc no encontrado");
  }
}

export async function addProduct(newProduct: Product) {
  try {
    const docRef = await addDoc(productsCol, newProduct);
    console.log('Doc agregado con id: ', docRef.id)
  } catch (error) {
    throw new Error("Error al intentar agregar el documento", error);
  }
}

export async function deleteProduct(id: string) {
  const docRef = doc(productsCol, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await deleteDoc(docRef);
    return docSnap.data()
  } else {
    throw new Error("[Firestore]: Doc  no encontrado");
  }
}

export async function updateProduct(product: Product, id: string) {
  const docRef = doc(productsCol, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    updateDoc(docRef, product, { merge: true} )
    return docSnap.data()
  } else {
    throw new Error("[Firestore]: Doc  no encontrado");
  }
}
