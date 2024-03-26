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
  

const appdataRef = collection(database, "users", `${gitHubId}/scenes`);
const newSceneData = {
 
  userName1: userName,
  scenes1: []
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

const appdataRef = collection(database, "users", `${gitHubId}/scenes`);
const docSnap = await getDocs(appdataRef);

console.log(setValues(docSnap.docs.map((doc)=> ({ ...doc.data(),id: doc.id}))))
    };
    getData();
  });


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

  const updateData = async (elements) => {
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
