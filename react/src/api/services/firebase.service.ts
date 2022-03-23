import {
  getFirestore, CollectionReference, collection, DocumentData, QuerySnapshot,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSANGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export namespace Firebase {
  export const firestore = getFirestore(app);
  export const auth = getAuth(app);

  /**
   * Function for getting typed collectionReference.
   * @param collectionName - Collection name.
   */
  export function getCollectionReference<T = DocumentData>(collectionName: string): CollectionReference<T> {
    return collection(firestore, collectionName) as CollectionReference<T>;
  }

  /**
   * Method maps query snapshot from Firestore to regular array.
   * @param snapshot Query snapshot with Dtos.
   * @param fromDtoMapper Mapper method which perform mapping.
   * @returns Array with entities.
   */
  export function mapQuerySnapshotToArray
  <TDto, TData>(snapshot: QuerySnapshot<TDto>, fromDtoMapper: (dto: TDto) => TData): TData[] {
    return snapshot.docs.map(dto => fromDtoMapper(dto.data()));
  }
}
