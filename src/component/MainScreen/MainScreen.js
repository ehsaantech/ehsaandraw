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
} from "firebase/firestore";
import CardList from "../CardList/CardList";
import { AddSquare } from "iconsax-react";
import { useNavigate, useLocation } from "react-router-dom";
import EditPage from "../Edit Page/EditScreen";
import { useGithub } from "../../context";
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

const MainApplication = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scenes, setScenes] = useState([]);
  const [values, setValues] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { githubId , logout} = useGithub(); 


  console.log("GitMain scere", githubId);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateBoard = async () => {
    const appdataRef = collection(database, "users", `${githubId}/scenes`);
    const newSceneData = {
      userName1: userName,
      scenes1: [],
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
      const appdataRef = collection(database, "users", `${githubId}/scenes`);
      const docSnap = await getDocs(appdataRef);

      console.log(
        setValues(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    };
    getData();
  },[]);

  const handleDelete = async (id) => {
    const deleteValue = doc(database, "users", `${githubId}/scenes`, id);
    await deleteDoc(deleteValue);
  };

  const handleEdit = async (id, userName, scenes) => {
    let scene = [];
    if (scenes.length > 0) {
      scene = JSON.parse(scenes);
    }
    navigate(`/edit/${id}`);
    setScenes(scene);
    setId(id);
  };

  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#3498db", padding: "10px 20px" }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1 style={{ margin: 0, color: '#fff' }}>Ehsaan Draw</h1>
        </div>
        <div style={{ marginRight: '10px' }}>
          <AddSquare onClick={handleOpen} size="32" color="#fff" />
        </div>
        <div>
          <Button style={{ background: "#70b1ec", border: "none", color: "#fff", width: "max-content", fontWeight: "bold" }} onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      {location.pathname.startsWith("/edit") && <EditPage />}

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Document Details
          </Typography> 
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="edit-container">
              <TextField label="Document Name" variant="outlined" fullWidth value={userName} onChange={(e) => setUserName(e.target.value)} style={{ marginBottom: "10px" }} />
            </div>
            <Button variant="contained" onClick={handleCreateBoard} style={{ backgroundColor: "#70b1ec", color: "#fff" }}>
              Create
            </Button>
          </Typography>
        </Box>
      </Modal>

      <div style={{ flex: 1, maxWidth: '100%', overflowX: 'auto', padding: '0 20px' }}>
        <CardList id={id} values={values} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </div>
  );
};

export default MainApplication;
