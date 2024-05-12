import { useParams } from "react-router-dom";
import EhsaanDrawScreen from "../EhsaanDraw/EhsaanDraw";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { useGithub } from "../../context";
import toast from "react-hot-toast";

function EditPage() {
  const [updatedScenes, setUpdatedScenes] = useState([]);
  const { id } = useParams();
  const { githubId } = useGithub();

  useEffect(() => {
    const getData = async () => {
      try {
        const appdataRef = collection(database, "users", `${githubId}/scenes`);
        const docSnap = await getDocs(appdataRef);
        const scenesData = docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const filteredScenes = scenesData.find((scene) => scene.id === id);
        setUpdatedScenes(JSON.parse(filteredScenes.scenes1));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const updateData = async (elements) => {
    if (!id) {
      toast.success("Please select a document or create a new one.");
      return false;
    }
    const updateValue = doc(database, "users", `${githubId}/scenes`, id);
    await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
    toast.success("Sketch saved successfully");
    setUpdatedScenes(elements);
  };
  return (
    <div>
      <EhsaanDrawScreen updateData={updateData} scenes={updatedScenes} />
    </div>
  );
}

export default EditPage;
