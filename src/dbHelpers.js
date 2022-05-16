
import { firestore } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore"

/*
Helper function to reduce code written for calls to DB

Parameters:
collectionType - the name of the collection in the db
stateSetter - the function used to update the state of the data being called (i.e. setExpereince)
loadingFunction - loading function used when making db calls, typically setLoading for this app

Return:
Void, should update state with stateSetter function passed in

*/
const getData = async (collectionName, stateSetter, loadingFunction) => {
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

// const getFirestoreDocument = async(documentId, collectionName, idField,)

//     const getBlog = async () => {
//         try{
//             const postRef = query(collection(firestore, "blog"), where("slug", "==", blogId))
//             const postDocs = await getDocs(postRef)
//             //Shows several results, but we should only have one entry for each slug. 
//             //We will write rules to enforce this
//             postDocs.forEach(doc => setBlog(doc.data()))
//         }
//         catch(error){
//             throw error.message
//         }
//     }

export {getData}