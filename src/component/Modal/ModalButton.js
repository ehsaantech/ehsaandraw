import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { database, provider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Grid from "@mui/material/Grid";
import SideNav from "../Drawer/Drawer";
import EhsaanDrawScreen from "../EhsaanDraw/EhsaanDraw";
import { auth  } from "../../firebaseConfig";

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userName, setUserName] = useState("");
  const [scenes, setScenes] = useState([]);
  const [values, setValues] = useState([]);
  const [user, setUser] = useState(null);


  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  const handleGithubLogin =()=>{
    signInWithPopup(auth, provider).then((result)=>{
      setUser(result.user)
      console.log(result.user)
    }).catch((error)=>{
      console.log(error)
  
  })
}

  const handleLogout = () => {
    setUser(null)
  }
  const value = collection(database, "appdata");
  const handleCreateBoard = async () => {

    const data = await addDoc(value, { userName1: userName, scenes1: [] });
    setId(data.id)
    setScenes([])
    setUserName("");
    setOpen(false);
  };



  useEffect(() => {
    const getData = async () => {
      const dbValue = await getDocs(value);
      setValues(dbValue.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });
  const handleDelete = async (id) => {
    const deleteValue = doc(database, "appdata", id);
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

    console.log("updateData elements",elements);

    if(!id){

      window.alert("Please select a document or create a new one.")
      return false;
    }


    const updateValue = doc(database, "appdata", id);
     await updateDoc(updateValue, { scenes1: JSON.stringify(elements) });
     window.alert("Document update successfully");


    setScenes(elements);
    //setShow(false);
    //setUserName("");
    //setScenes("");
    //setOpen(false);
  };



  // const handleUpdate = async () => {
  //   const updateValue = doc(database, "appdata", id);
  //   await updateDoc(updateValue, { userName1: userName, scenes1: scenes });
  //   setShow(false);
  //   setUserName("");
  //   setScenes("");
  //   setOpen(false);
  // };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}>
        {
          user ? (
            <div>
            <button onClick={handleLogout}>Logout</button>
            <h3>{user.displayName}</h3>
            </div>
          ):(
            <button onClick={handleGithubLogin}>
               Login With Github
            </button>
          )
        }
      </div>
      <section>




      <Grid container spacing={2} margin={0.1} >
             
      <Grid item xs={4}> </Grid>
              <Grid item xs={6}>
           <h1  style={{marginRight: '10rem' }}> Ehsaan Draw</h1>
              </Grid>

              <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={handleOpen}
                style={{ backgroundColor: "#4caf50", color: "#fff" }}
              >
                Add New
              </Button>
            </Grid>
          </Grid>
      
      </section>
      <EhsaanDrawScreen 
        updateData = {updateData}
        scenes = {scenes}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sketch Details
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
              {/* <TextField
                label="Scenes"
                variant="outlined"
                fullWidth
                value={scenes}
                onChange={(e) => setScenes(e.target.value)}
                style={{ marginBottom: "10px" }}
              /> */}
            </div>
            {!show ? (
              <Button
                variant="contained"
                onClick={handleCreateBoard}
                style={{ backgroundColor: "#4caf50", color: "#fff" }}
              >
                Create
              </Button>
            ) : (
              <Button
                variant="contained"
               //onClick={handleUpdate}
                style={{ backgroundColor: "#4caf50", color: "#fff" }}
              >
                Update
              </Button>
            )}
          </Typography>
        </Box>
      </Modal>
      <SideNav
        id={id}
        values={values}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
