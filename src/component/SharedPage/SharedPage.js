import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import toast from "react-hot-toast";
import EhsaanDrawScreen from '../EhsaanDraw/EhsaanDraw';

function SharedPage({ database }) {
  const [sharedScenes, setSharedScenes] = useState([]);
  const { shareId } = useParams();

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const sharedDocRef = doc(database, "share", shareId);
        const sharedDocSnap = await getDoc(sharedDocRef);
        if (sharedDocSnap.exists()) {
          const { scenesData } = sharedDocSnap.data();
          setSharedScenes(scenesData);
        } else {
          toast.error("Shared document not found.");
        }
      } catch (error) {
        console.error("Error fetching shared data:", error);
        toast.error("Failed to fetch shared data.");
      }
    };
    fetchSharedData();
  }, [shareId, database]);

  return (
    <div>
      <EhsaanDrawScreen scenes={sharedScenes} readOnly={true} />
    </div>
  );
}

export default SharedPage;
