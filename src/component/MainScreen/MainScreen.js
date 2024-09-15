import React, { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import CardList from "../CardList/CardList";
import { useNavigate, useLocation } from "react-router-dom";
import EditPage from "../Edit Page/EditScreen";
import { useGithub } from "../../context";
import toast from "react-hot-toast";
import { SquarePlus } from "lucide-react";
import SkeletonGrid from "../Skeleton/Skeleton";


import '../../App.css'

const MainApplication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scenes, setScenes] = useState([]);
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]); // State for filtered data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [id, setId] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { githubId, logout } = useGithub();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateBoard = async () => {
    const appdataRef = collection(database, "users", `${githubId}/scenes`);

    const newSceneData = {
      userName1: userName,
      scenes1: [],
    };

    const newSceneRef = await addDoc(appdataRef, newSceneData);
    toast.success("Document created successfully");

    setId(newSceneRef.id);
    setScenes([]);
    setUserName("");
    handleClose();
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const appdataRef = collection(database, "users", `${githubId}/scenes`);
      const docSnap = await getDocs(appdataRef);
      const fetchedValues = docSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setIsLoading(false);
      setValues(fetchedValues);
      setFilteredValues(fetchedValues); // Initialize filtered data
    };
    getData();
    // eslint-disable-next-line
  }, [id, deleteValue]);

  // Filter function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = values.filter(
      (item) => item.userName1.toLowerCase().includes(query.toLowerCase()) // Adjust this field as needed
    );
    setFilteredValues(filtered);
  };

  const handleDelete = async (id) => {
    const deleteValue = doc(database, "users", `${githubId}/scenes`, id);
    setDeleteValue(deleteValue);
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
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <header
        style={{
          position: "sticky",
          top: "0",
          borderBottom: "1px",
          display: "flex",
          height: "4rem",
          alignItems: "center",
          gap: "1rem",
          background: "#fff",
          zIndex: "50",
          padding: "0.75rem 1rem",
          boxShadow: "5px 5px 5px gray",
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: "center",
            marginLeft: "200px",
            backgroundColor: "#fff",
            color: "#fff",
          }}
        >
          <h1 class = "ehsaandraw"
            style={{
              marginLeft: "70px",
              color: "#000", // Set text color to white for a dark background
              // textShadow: "2px 2px 8px #444", // Subtle shadow effect for better readability
              fontSize: "3rem", // Increase text size for emphasis
              fontWeight: "bold", // Bold font for better visibility
              letterSpacing: "2px", // Adds spacing between letters for a clean look
              margin:0
            }}
          >
            EhsaanDraw
          </h1>
        </div>
        <div
          style={{
            margin: "20px",
            textAlign: "center",
            // background: "#fff",
            // padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginRight: "40px",
          }}
        >
          <input
            placeholder="Search Document" // Added placeholder
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: "2px solid #ccc",
              borderRadius: "8px",
              outline: "none",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ffff")} // Focus effect
            onBlur={(e) => (e.target.style.borderColor = "#ccc")} // Blur effect
          />
        </div>

        <div
          style={{
            marginRight: "10px",
            alignContent: "center",
            textAlign: "center",
            marginTop: "4px",
          }}
        >
          <SquarePlus
            onClick={handleOpen}
            size="42"
            color="#000000"
            strokeWidth={"1.3px"}
          />
        </div>
        <div>
          <button
            style={{
              borderRadius: "5px",
              background: "#fff",
              border: "3px solid black",
              color: "#000000",
              width: "100px",
              height: "37px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "border-color 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              outline: "none",
              marginLeft: "10px",
              fontSize: "16px",

            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Search Input */}

      <div>{location.pathname.startsWith("/edit") && <EditPage />}</div>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000, 
            padding: "20px", 
          }}
          onClick={handleClose} 
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              maxWidth: "100%",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", 
              position: "relative", 
              display: "flex",
              flexDirection: "column",
              gap: "20px", 
            }}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Title */}
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textAlign: "center",
              }}
            >
              Document Details
            </h2>

            {/* Content */}
            <div>
              <div className="edit-container">
                <input
                  type="text"
                  placeholder="Document Name"
                  value={userName}
                  maxLength={40}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateBoard();
                    }
                  }}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: "93%",
                    padding: "12px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                />
              </div>
              <button
                onClick={handleCreateBoard}
                style={{
                  backgroundColor: "#000000",
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
              >
                Create
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#aaa",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000")}
              onMouseLeave={(e) => (e.target.style.color = "#aaa")}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          flex: 1,
          maxWidth: "100%",
          overflowX: "auto",
          padding: "0 20px",
          marginLeft: "10px",
        }}
      >
      {isLoading ? <SkeletonGrid /> :
        <CardList
          id={id}
          values={filteredValues}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          scenes={scenes}
        /> }
      </div>
    </div>
  );
};

export default MainApplication;
