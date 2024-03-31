import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Modal from "./component/Modal/Modal";
import BasicModal from "./component/Modal/ModalButton";
import EhsaanDrawScreen from "./component/EhsaanDraw/EhsaanDraw";
import GithubAuth from "./component/GitHubLogin/GithubAuth";
import Dashboard from "./component/Dashboard/Dashboard";
import MainApplication from "./component/MainScreen/MainScreen";
import EditPage from "./component/Edit Page/EditScreen";

function App() {
  const [user, setUser] = useState(null);
  const [gitHubId, setGitHubId] = useState("");

  const handleLogout = () => {
    setUser(null); // Set user to null
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<GithubAuth setUser={setUser} setGitHubId={setGitHubId} />}
          />
                    <Route path="/edit/:id" element={<EditPage gitHubId={gitHubId}/>} />

          <Route
            path="/"
            element={
              user ? (
                <MainApplication
                  handleLogout={handleLogout}
                  gitHubId={gitHubId}
                  user={user}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
