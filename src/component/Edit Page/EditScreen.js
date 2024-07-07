import { useParams } from "react-router-dom";
import EhsaanDrawScreen from "../EhsaanDraw/EhsaanDraw";
import { collection, getDocs, doc,addDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { useGithub } from "../../context";
import toast from "react-hot-toast";

function EditPage() {
  const [updatedScenes, setUpdatedScenes] = useState([]);
  const { id } = useParams();
  const { githubId } = useGithub();
  const [collectionUrl, setCollectionUrl] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const appdataRef = collection(database, "users", `${githubId}/scenes`);
        setCollectionUrl(appdataRef.path)
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

  const shareScenesData = async () => {
    try {
      const appdataRef = collection(database, "share");
      const newShareDoc = {
        userId: githubId,
        scenesData: updatedScenes, // Store the actual scenes data
        sceneId: id // Store the specific scene ID
      };
      const docRef = await addDoc(appdataRef, newShareDoc);
      const shareableLink = `${window.location.origin}/shared/${docRef.id}`;
      console.log("Shareable Link: ", shareableLink);
      navigator.clipboard.writeText(shareableLink).then(() => {
        toast.success("Shareable link copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy link: ", err);
        toast.error("Failed to copy link.");
        console.log("Error: ", err);
      });
    } catch (error) {
      console.error("Error sharing data:", error);
      toast.error("Failed to share data.");
    }
  };

  const updateData = async (elements) => {
    if (!id) {
      toast.error("Please select a document or create a new one.");
      return false;
    }
    const updateValue = doc(database, "users", `${githubId}/scenes`, id);
    await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
    setUpdatedScenes(elements);
  };
  
  return (
    <div>
      <EhsaanDrawScreen updateData={updateData} scenes={updatedScenes} shareScenesData={shareScenesData} />
    </div>
  );
}

export default EditPage;
