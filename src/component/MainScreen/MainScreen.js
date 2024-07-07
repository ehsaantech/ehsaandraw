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
import toast from "react-hot-toast";
import { useRadioGroup } from "@mui/material";
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
  const [appData, setAppData] = useState([]);
  const [id, setId] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { githubId, logout } = useGithub();

  console.log("GitMain scere", githubId);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateBoard = async () => {
    
    const appdataRef = collection(database, "users", `${githubId}/scenes`);
    setAppData(appdataRef)
    const newSceneData = {
      userName1: userName,
      scenes1: [],
    };
    const newSceneRef = await addDoc(appdataRef, newSceneData);
    toast.success("Document created successfully");
    // console.log("New scene added with ID: ", newSceneRef.id);
    setId(newSceneRef.id);
    setScenes([]);
    setUserName("");
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      const appdataRef = collection(database, "users", `${githubId}/scenes`);
      const docSnap = await getDocs(appdataRef);
      setValues(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };
    getData();
    // eslint-disable-next-line
  },[id,deleteValue]);


  const handleDelete = async (id) => {
    const deleteValue = doc(database, "users", `${githubId}/scenes`, id);
    setDeleteValue(deleteValue)
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
    <div
      style={{
        display: "flex",
        minHeight: "100vh", // Adjust as needed
        flexDirection: "column",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: "0",
          borderBottom: "1px",
          display: "flex",
          height: "4rem", // Adjust height as needed
          alignItems: "center",
          gap: "1rem", // Adjust gap as needed
          background: "#70b1ec", // Change to your background color
          zIndex: "50",
          padding: "0.75rem 1rem", // Adjust padding as needed
          boxShadow: "5px 5px 5px gray",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1 style={{ margin: 0, color: "#fff", fontFamily: "sans-serif" }}>
            Ehsaan Draw
          </h1>
        </div>
        <div style={{ marginRight: "10px" }}>
          <AddSquare onClick={handleOpen} size="32" color="#fff" />
        </div>
        <div>
          <Button
            style={{
              background: "#70b1ec",
              border: "2px solid white",
              color: "#fff",
              width: "max-content",
              fontWeight: "bold",
            }}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </header>
      <div>{location.pathname.startsWith("/edit") && <EditPage />}</div>

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
                maxLength={40}
                onKeyDown={(e)=>{
                  if(e.key === "Enter"){
                    handleCreateBoard();
                  }
                }}
                onChange={(e) => {
                  // if (e.target.value.length <= 25) {
                    setUserName(e.target.value);
                  // }
                }}
                style={{ marginBottom: "10px" }}
              />
            </div>
            <Button
              variant="contained"
              onClick={handleCreateBoard}
              style={{ backgroundColor: "#70b1ec", color: "#fff" }}
            >
              Create
            </Button>
          </Typography>
        </Box>
      </Modal>

      <div
        style={{
          flex: 1,
          maxWidth: "100%",
          overflowX: "auto",
          padding: "0 20px",
          marginLeft: "10px",
        }}
      >
        <CardList
          id={id}
          values={values}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          scenes={scenes}
        />
      </div>
    </div>
  );
};

export default MainApplication;
