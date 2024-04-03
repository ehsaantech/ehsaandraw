import { useParams } from "react-router-dom";
import EhsaanDrawScreen from "../EhsaanDraw/EhsaanDraw";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { useGithub } from "../../context";

function EditPage() {
  const [updatedScenes, setUpdatedScenes] = useState([]);
  const { id } = useParams();

  
  const { githubId} = useGithub(); 

  console.log("GitHubId on EditScreen",githubId);

  useEffect(() => {
    const getData = async () => {
      try {
        const appdataRef = collection(database, "users", `${githubId}/scenes`);
        const docSnap = await getDocs(appdataRef);
        const scenesData = docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        // console.log("Scenes Data", scenesData);
        
        const filteredScenes = scenesData.find(scene => scene.id === id);
        setUpdatedScenes(JSON.parse(filteredScenes.scenes1));
        // setUpdatedScenes(filteredScenes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  },[]); 

  // useEffect(() => {
  
  //      getData();
  // });

  // const getData = async () => {

  //   console.log("getData");

  //   console.log("githubId",githubId);

    
  //   console.log("id",id);

    

  //   const appdataRef = collection(database,"users", `${githubId}/scenes/${id}/scenes1`);
  //   const docSnap = await getDocs(appdataRef);

  //   const updatedScenesData = docSnap.docs.map((doc) => {
  //     const data = { ...doc.data(), id: doc.id };
  //     if (data.id === id) {
  //       console.log("Idddddddddddd", data.id);
  //     }
  //     return data;
  //   });

  //   console.log("updatedScenesData", updatedScenesData);

  //   setUpdatedScenes(updatedScenesData);
  // };

  const updateData = async (elements) => {
    if (!id) {
      window.alert("Please select a document or create a new one.");
      return false;
    }
    const updateValue = doc(database, "users", `${githubId}/scenes`, id);
    await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
    window.alert("Document update successfully");
    setUpdatedScenes(elements);
  };

  return (
    <div>
      <EhsaanDrawScreen updateData={updateData} scenes={updatedScenes} />
    </div>
  );
}

export default EditPage;
