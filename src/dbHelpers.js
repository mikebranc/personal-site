/*
Helper function to reduce code written for calls to DB

Parameters:
collectionType - the name of the collection in the db
stateSetter - the function used to update the state of the data being called (i.e. setExpereince)
loadingFunction - loading function used when making db calls, typically setLoading for this app

Return:
Void, should update state with stateSetter function passed in

*/
import { firestore } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore"
const getData = async (collectionType, stateSetter, loadingFunction) => {
    try {
      const dataCol = collection(firestore, collectionType)
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

export {getData}