import { collection, CollectionReference, DocumentData } from 'firebase/firestore';

import { FirestoreCollections } from './../utils/enums/FirestoreCollections/FirestoreFollections';

import { firestoreDB } from './firebase';

/**
 * Function for gettig the collection reference with the given doc types.
 * @param collectionName - Name of the collection in the firestore.
 * @returns Collection reference.
 */
export const getCollectionRef = <T = DocumentData>(collectionName: FirestoreCollections): CollectionReference<T> =>
  collection(firestoreDB, collectionName) as CollectionReference<T>;
