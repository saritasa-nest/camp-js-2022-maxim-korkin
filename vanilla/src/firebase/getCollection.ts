import { collection, CollectionReference, DocumentData } from 'firebase/firestore';

import { FirestoreCollections } from '../enums/FirestoreCollections/FirestoreCollections';

import { firestoreDB } from './firebase';

/**
 * Function for getting the collection reference with the given doc types.
 * @param collectionName - Name of the collection in the firestore.
 * @returns Collection reference.
 */
export const getCollectionRef = <T = DocumentData>(collectionName: FirestoreCollections): CollectionReference<T> =>
  collection(firestoreDB, collectionName) as CollectionReference<T>;
