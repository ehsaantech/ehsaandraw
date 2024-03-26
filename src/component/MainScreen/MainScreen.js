// MainApplication.js
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { database } from "../../firebaseConfig";
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
import Grid from "@mui/material/Grid";
import EhsaanDrawScreen from "../EhsaanDraw/EhsaanDraw";
import DocumentList from "../DocumentList/DocumentList";
import CardList from "../CardList/CardList";
import { AddSquare } from "iconsax-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MainApplication = ({ handleLogout, gitHubId , user}) => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scenes, setScenes] = useState([]);
  const [values, setValues] = useState([]);
  const [id, setId] = useState("");


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleCreateBoard = async () => {
    // const value = collection(database, "appdata");
    // const data = await addDoc(value, { userName1: userName, scenes1: []});





  // const appdataRef = doc(database, "appdata", gitHubId);
  // const data = await updateDoc(appdataRef, {
  //     key1: { userName1: userName, scenes1: []}
  // });



//   const appdataRef = doc(database, "appdata", gitHubId);
// const newDataRef = child(appdataRef, 'key1').push(); // Generate unique key under 'key1'

// const data = await updateDoc(newDataRef, {
//     userName1: userName,
//     scenes1: []
// });




// const appdataRef = doc(database, "appdata", gitHubId);
// const newDataRef = doc(appdataRef.collection('key1')); // Generate unique key under 'key1' collection

// const data = await setDoc(newDataRef, {
//     userName1: userName,
//     scenes1: []
// });



// const appdataRef = doc(database, "appdata","users");
// const key1CollectionRef = collection(appdataRef, gitHubId);
// const newDocRef = doc(key1CollectionRef); // Firestore will generate a unique ID

// const data = await setDoc(newDocRef, {
//     userName1: userName,
//     scenes1: []
// });

const appdataRef = collection(database, "users", `${gitHubId}/scenes`);
const newSceneData = {
  // Add whatever properties you want for the new scene
  // Example:
  userName1: userName,
  scenes1: []
  // Add more properties as needed
};
const newSceneRef = await addDoc(appdataRef, newSceneData);

console.log("New scene added with ID: ", newSceneRef.id);
    setId(newSceneRef.id);
    setScenes([]);
    setUserName("");
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {



      // get list of scenes
      // replace draws with scenes in firebase data
      // remove appdata from firebase data -> this is a short term fix!!!! But need to have better understanding of how firebase works!!!
      // save json against a single scene on first save
      // render a single scene with appdata/users/userid/scenes/sceneId
      // update single scene

      // Written by Haroon Bhai
// const appdataRef = doc(database, "appdata", "users/m7VSqiaucPTD0rycgBHQuF7GprE2/draws");

// First case 
const appdataRef = collection(database, "users", `${gitHubId}/scenes`);

// const dataCollection = await collection(database,"scenes")

const docSnap = await getDocs(appdataRef);


console.log(setValues(docSnap.docs.map((doc)=> ({ ...doc.data(),id: doc.id}))))


      // setValues(dbValue.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

// const key1CollectionRef = collection(appdataRef, gitHubId);



// console.log("key1CollectionRef",key1CollectionRef);



//       const docRef = doc(database, "appdata", "users");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }



      // const dbValue = await getDocs(collection(database, "users"));


      // console.log("dbValue",dbValue);

      // dbValue.docs.forEach((doc) => {


      //   console.log("doc.users");
      //   console.log(doc);

      // });


      //setValues(dbValue.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });

  // useEffect(() => {
  //   const updateDocument = async () => {
  //     try {
  //       const docRef = doc(database, "users", "m7VSqiaucPTD0rycgBHQuF7GprE2", "scenes", "YJSP4CtoxVAIdLk6w2Bh");
  //       const docSnap = await getDoc(docRef);
        
  //       // Check if the document exists
  //       if (docSnap.exists()) {
  //         const currentData = docSnap.data();
          
  //         // Modify the data as needed
  //         // For example, let's update a property named 'updatedAt'
  //         const newData = {
  //           ...currentData,
  //           updatedAt: new Date() // Add/update any properties here
  //         };
  
  //         // Update the document with the modified data
  //         await updateDoc(docRef, newData);
  //         console.log("Document updated",newData);
  //         console.log("Document updated successfully");
  //       } else {
  //         console.log("Document does not exist");
  //       }
  //     } catch (error) {
  //       console.error("Error updating document: ", error);
  //     }
  //   };
  
  //   updateDocument();
  // }, []);
  


  const handleDelete = async (id) => {
    const deleteValue = doc(database, "users", `${gitHubId}/scenes`, id);
    await deleteDoc(deleteValue);
  };

  const handleEdit = async (id, userName, scenes) => {
    let scene = [];
    if(scenes.length > 0){
      scene = JSON.parse(scenes);
    }
    setScenes(scene);
    setId(id);
  };

  

  // useEffect(()=>{

  //   const elements = {
  //     document: {
  //       scene1: "JSON",
  //       userName: "Ehsaans",
  
  //     // },
  //     // scene2: {
  //     //   name: "Scene 2",
  //     //   description: "Description of Scene 2",
  //     //   imageUrl: "https://example.com/image2.jpg",
  //       // Add other properties as needed
  //     },
  //     // Add more scenes as needed
  //   };
  //   const updateData = async (elements) => {
  //     // if(!"YJSP4CtoxVAIdLk6w2Bh"){
  //     //   window.alert("Please select a document or create a new one.")
  //     //   return false;
  //     // }
  //     const updateValue = doc(database, "users", "YJSP4CtoxVAIdLk6w2Bh");
  //      await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
  //      window.alert("Document update successfully");
  //     setScenes(elements);
  //   }
  //   updateData(elements);

  // },[])

  const updateData = async (elements) => {
    // if(!"YJSP4CtoxVAIdLk6w2Bh"){
    //   window.alert("Please select a document or create a new one.")
    //   return false;
    // }
    // const updateValue = doc(database, "users", "YJSP4CtoxVAIdLk6w2Bh");
    //  await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
    //  window.alert("Document update successfully");
    // setScenes(elements);

    if(!id){
      window.alert("Please select a document or create a new one.")
      return false;
    }
    const updateValue =doc(database, "users", `${gitHubId}/scenes`, id);
     await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
     window.alert("Document update successfully");
    setScenes(elements);
  };

  return (
    <div>
     <div>
  <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    {/* <div>Recently Modified by You</div> */}
    <div style={{ flex: 1, textAlign: 'center' }}>
      <h1 style={{ margin: 0 }}>Ehsaan Draw</h1>
    </div>
    <div>
      <AddSquare onClick={handleOpen} size="32" color="#0000FF
"/>
    </div>
  </header>
</div>
      <EhsaanDrawScreen 
        updateData={updateData}
        scenes={scenes}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Document Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="edit-container">
              <TextField
                label="Document Name"
                variant="outlined"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
            </div>
            <Button
              variant="contained"
              onClick={handleCreateBoard}
              style={{ backgroundColor: "#0000FF", color: "#fff" }}
            >
              Create
            </Button>
          </Typography>
        </Box>
      </Modal>
      <CardList
        id={id}
        values={values}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default MainApplication;
