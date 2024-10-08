import React, { useEffect, useState, useContext } from "react";
import { database } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import CardList from "../CardList/CardList";
import { useNavigate, useLocation } from "react-router-dom";
import EditPage from "../Edit Page/EditScreen";
import { useGithub } from "../../context";
import toast from "react-hot-toast";
import { SquarePlus, Search } from "lucide-react";
import SkeletonGrid from "../Skeleton/Skeleton";
import "../../App.css";
import { ThemeContext } from "../../ThemeContext";

const LandingScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scenes, setScenes] = useState([]);
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const [error, setError] = useState(false); 
  const [openSearch, setOpenSearch] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { theme } = useContext(ThemeContext); 

  const headerStyles = {
    position: "sticky",
    top: "0",
    borderBottom: theme ==="dark" ? "1px solid #444" : "1px solid #ccc",
    display: "flex",
    height: "4rem",
    alignItems: "center",
    justifyContent: "center",
    background: theme ==="dark" ? "#121212" : "#fff", 
    zIndex: "50",
    padding: "0.75rem 1rem",
    boxShadow: theme ==="dark" ? "5px 5px 5px #000" :"5px 5px 5px gray",
  };

  const inputStyles = {
    background: theme ==="dark" ? "#333" : "#fff",
    color: theme ==="dark" ? "#eee" : "#000", 
    border: theme ==="dark" ? "2px solid #555" : "2px solid #ccc", 
    outline: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s, box-shadow 0.3s",
    marginRight: "5px",
  };

  const buttonStyles = {
    background: theme ==="dark" ? "#121212" : "#fff",
    color: theme ==="dark" ? "#fff" : "#000",
    border: theme ==="dark" ? "2px solid #fff" : "3px solid black",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { githubId, logout } = useGithub();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(false);
  };
  const handleCreateBoard = async () => {
    if (!userName.trim()) {
      setError(true);
      return;
    }

    setIsCreating(true); 

    try {
      const appdataRef = collection(database, "users", `${githubId}/scenes`);

      const newSceneData = {
        userName1: userName,
        scenes1: [],
        createdAt: serverTimestamp(),
      };

      const newSceneRef = await addDoc(appdataRef, newSceneData);
      toast.success("Document created successfully");
      setError(false);
      setId(newSceneRef.id);
      setScenes([]);
      setUserName("");
      handleClose();
      setOpen(false);
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Failed to create document.");
    } finally {
      setIsCreating(false); 
    }
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
      setFilteredValues(fetchedValues); 
    };
    getData();
    // eslint-disable-next-line
  }, [id, deleteValue]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = values.filter(
      (item) => item.userName1.toLowerCase().includes(query.toLowerCase()) 
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
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        background: theme ==="dark" ? "#121212" : "#fff", 
        color: theme ==="dark" ? "#eee" : "#000", 
      }}
    >
      <header style={headerStyles}>
        <h1
          className="ehsaandraw"
          style={{
            color: theme ==="dark" ? "#fff" : "#000",
            fontSize: "3rem",
            fontWeight: "bold",
            letterSpacing: "2px",
            margin: 0,
          }}
        >
          EhsaanDraw
        </h1>

        {/* Search and Icons */}
        <div
          style={{
            position: "absolute",
            right: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {openSearch && (
            <input
              placeholder="Search Document"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                ...inputStyles,
                width: "250px",
                padding: "8px",
                height: "24px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#000")}
              onBlur={(e) => (e.target.style.borderColor = theme ==="dark" ? "#555" : "#ccc")}
            />
          )}
          <Search
            size={34}
            color={theme ==="dark" ? "#fff" : "#000"}
            style={{ cursor: "pointer" }}
            onClick={() => setOpenSearch(!openSearch)}
          />
          <SquarePlus
            onClick={handleOpen}
            size="42"
            color={theme ==="dark" ? "#fff" : "#000"}
            strokeWidth={"1.3px"}
            style={{ marginLeft: "15px", cursor: "pointer" }}
          />
          <button
            style={{
              ...buttonStyles,
              width: "100px",
              height: "37px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              outline: "none",
              marginLeft: "15px",
              fontSize: "16px",
              fontFamily: "Cascadia, sans-serif",
              borderRadius: "4px",
              borderWidth: "2.3px",
            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div>{location.pathname.startsWith("/edit") && <EditPage />}</div>

      {/* Modal */}
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
              backgroundColor: theme ==="dark" ? "#232329":"#fff",
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
              <div
                className="edit-container"
                style={{ display: "flex", flexDirection: "column" }}
              >
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
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (error) {
                      setError(false);
                    }
                  }}
                  style={{
                    width: "93%",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    border: error ? "2px solid red" : "1px solid #ccc", 
                    marginBottom: "0", 
                  }}
                  required
                />
                {error && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      margin: "0",
                      marginBottom: "8px",
                      marginTop: "2px",
                    }}
                  >
                    Document name is required
                  </p>
                )}
              </div>
              <button
                onClick={handleCreateBoard}
                style={{
                  backgroundColor: theme === "dark" ? "#000":"#000",
                  color: theme ==="dark" ? "#fff" :"#fff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                  marginTop: "25px",
                }}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create"}{" "}
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
              onMouseEnter={(e) => (e.target.style.color = theme ==="dark" ? "#fff" : "#000")}
              onMouseLeave={(e) => (e.target.style.color = theme ==="dark" ? "#fff" : "#000")}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="content-container">
        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <CardList
          values={filteredValues}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          scenes={scenes}
          id={id}

          />
        )}
      </div>
    </div>
  );
};

export default LandingScreen;
