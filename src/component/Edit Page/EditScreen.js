import { useParams } from "react-router-dom";
import {useLocation} from "react-router-dom";
import EhsaanDrawScreen from "../EhsaanDraw/EhsaanDraw";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
setDoc,
  getDoc
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useState ,useEffect } from "react";

function EditPage({gitHubId ,setValues }) {

  const [updatedScenes, setUpdatedScenes] = useState([]);




  
    console.log("Githhhhhhfdfshfshshfds",gitHubId)
    const { id } = useParams(); // Get the ID from the URL

    const updateData = async (elements) => {
      if(!id){
        window.alert("Please select a document or create a new one.")
        return false;
      }
      const updateValue =doc(database, "users", `${gitHubId}/scenes`, id);
       await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
       window.alert("Document update successfully");
       setUpdatedScenes(elements);
    };

    return (
      <div>
        <h1>Edit Page for ID: {id}</h1>
       
 <EhsaanDrawScreen 
        updateData={updateData}
        scenes={updatedScenes}
      />    
      </div>
    );
  }
  
  export default EditPage;