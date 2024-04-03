import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GithubAuth from "./component/GitHubLogin/GithubAuth";
import MainApplication from "./component/MainScreen/MainScreen";
import EditPage from "./component/Edit Page/EditScreen";
import { useGithub } from "./context";
import { useNavigate } from "react-router-dom";


function App() {

  const { githubId } = useGithub(); 
   console.log("App Js",githubId);
  

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              githubId ? (
                <MainApplication
                />
              ) : (
              <Navigate to="/login"/>   
                         )
            }
          />
          <Route
            path="/login"
            element={<GithubAuth />}
          />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
