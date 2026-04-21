import { firestore } from "./firebase/config";
import { collection, getDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const getFirestoreCollection = async (collectionName, stateSetter, loadingFunction) => {
  try {
    const dataCol = collection(firestore, collectionName);
    const dataDocs = await getDocs(dataCol);
    const data = [];
    dataDocs.forEach((item) => {
      data.push({ id: item.id, ...item.data() });
    });
    stateSetter([...data]);
    loadingFunction(false);
  } catch (error) {
    throw error.message;
  }
};

const getFirestoreDocument = async (documentId, stateSetter, loadingFunction, collectionName) => {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    const currDoc = await getDoc(docRef);
    if (collectionName === "experience") {
      stateSetter({
        ...currDoc.data(),
        description: currDoc.data().description.join(";"),
      });
    } else {
      stateSetter(currDoc.data());
    }
    loadingFunction(false);
  } catch (error) {
    throw error.message;
  }
};

const deleteFirestoreDocument = async (documentId, stateSetter, loadingFunction, collectionName) => {
  try {
    await deleteDoc(doc(firestore, collectionName, documentId));
    stateSetter((oldData) => oldData.filter((curr) => curr.id !== documentId));
    loadingFunction(false);
  } catch (error) {
    throw error.message;
  }
};

export { getFirestoreCollection, getFirestoreDocument, deleteFirestoreDocument };
