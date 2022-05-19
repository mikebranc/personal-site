
import { firestore } from "./firebase/config";
import { collection, getDoc, getDocs, doc, deleteDoc } from "firebase/firestore"

/*
Helper function to reduce code written for collection calls to DB

Parameters:
collectionName - the name of the collection in the db
stateSetter - the function used to update the state of the data being called (i.e. setExpereince)
loadingFunction - loading function used when making db calls, typically setLoading for this app

Return:
Void, should update state with stateSetter function passed in

*/
const getFirestoreCollection = async (collectionName, stateSetter, loadingFunction) => {
    try {
      const dataCol = collection(firestore, collectionName)
      const dataDocs = await getDocs(dataCol);
      const data = []
      dataDocs.forEach((item) => {
          //onsole.log(doc.data())
          data.push({
              id: item.id,
              ...item.data()
          })
      });
      stateSetter([...data])
      loadingFunction(false)
    } catch (error) {
      throw error.message
    }
}

/*
Helper function to reduce code written for document calls to DB

Parameters:
documentId - the document we're trying to get
stateSetter - the function used to update the state of the data being called (i.e. setExpereince)
loadingFunction - loading function used when making db calls, typically setLoading for this app
collectionName - the name of the collection in the db


Return:
Void, should update state with stateSetter function passed in

*/
const getFirestoreDocument = async(documentId, stateSetter, loadingFunction, collectionName) =>{
  try{
    const docRef = doc(firestore, collectionName, documentId)
    const currDoc = await getDoc(docRef)
    if(collectionName==="experience"){
      stateSetter({
        ...currDoc.data(),
        description: currDoc.data().description.join(";")
      })
    }
    else{
      stateSetter(currDoc.data())
    }
    loadingFunction(false)
  }catch(error){
    throw error.message
  }
}

const deleteFirestoreDocument = async(documentId, stateSetter, loadingFunction, collectionName) =>{
  try{
      await deleteDoc(doc(firestore, collectionName, documentId))
      stateSetter(oldData =>{
          return oldData.filter(curr => curr.id !== documentId)
      })
      loadingFunction(false)
  }
  catch(error){   
      throw error.message
  }
}




export {getFirestoreCollection, getFirestoreDocument, deleteFirestoreDocument}