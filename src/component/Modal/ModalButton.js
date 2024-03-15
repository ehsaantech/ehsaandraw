import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import contactImage from "../Images/My Photo.jpg";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { database } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import DataCard from "../Cards/Card";
import Grid from "@mui/material/Grid";
import SideNav from "../Drawer/Drawer";

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
  const [scenes, setScenes] = useState("");
  const [values, setValues] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  const value = collection(database, "appdata");
  const handleCreateBoard = async () => {
    await addDoc(value, { userName1: userName, scenes1: scenes });
    setUserName("");
    setScenes("");
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
    setOpen(true);
    setUserName(userName);
    setScenes(scenes);
    setId(id);
    setShow(true);
  };
  const handleUpdate = async () => {
    const updateValue = doc(database, "appdata", id);
    await updateDoc(updateValue, { userName1: userName, scenes1: scenes });
    setShow(false);
    setUserName("");
    setScenes("");
    setOpen(false);
  };

  return (
    <div>
      <section>
        <Button
          style={{ border: "2px solid lightblue", marginLeft: "550px" }}
          onClick={handleOpen}
        >
          Add Sketch
          {/* <EditIcon></EditIcon> */}
        </Button>
      </section>

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
                label="User Name"
                variant="outlined"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="Scenes"
                variant="outlined"
                fullWidth
                value={scenes}
                onChange={(e) => setScenes(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
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
                onClick={handleUpdate}
                style={{ backgroundColor: "#4caf50", color: "#fff" }}
              >
                Update
              </Button>
            )}
          </Typography>
        </Box>
      </Modal>
      <SideNav
        values={values}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
