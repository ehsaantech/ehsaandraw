
import React,{useState} from "react";
import { BrowserRouter as Router , Routes ,Route ,Navigate } from "react-router-dom";
import Modal from "./component/Modal/Modal";
import BasicModal from "./component/Modal/ModalButton";
import EhsaanDrawScreen from "./component/EhsaanDraw/EhsaanDraw";
import GithubAuth from "./component/GitHubLogin/GithubAuth";
import Dashboard from "./component/Dashboard/Dashboard";

 function App() {
  const [user, setUser] = useState(null);
  const[gitHubId,setGitHubId] = useState("")

  const handleLogout = () => {
    setUser(null); // Set user to null
  };

  return (
    <>
      <Router>
      <Routes>
        <Route path="/login" element={<GithubAuth setUser={setUser} setGitHubId={setGitHubId} />} />
        <Route
          path="/"
          element={user ? <Dashboard handleLogout={handleLogout} gitHubId={gitHubId} user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router> 
    </>
  );
}

export default App;
