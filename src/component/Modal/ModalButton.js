// import MainApplication from "../MainScreen/MainScreen";
// import GithubAuth from "../GitHubLogin/GithubAuth";
// import React, { useState } from "react";
// import { auth } from "../../firebaseConfig";
// import Dashboard from "../Dashboard/Dashboard";
// import { useNavigate } from "react-router-dom";

//   export default function BasicModal() {
//     const [user, setUser] = useState(null);
//     const[gitHubId,setGitHubId] = useState("")
//     const navigate = useNavigate();

//     console.log("usssserrr",user)

//     const handleLogout = () => {
//       auth.signOut().then(() => {
//         setUser(null);
//         navigate("/login");
//       }).catch((error) => {
//         // Handle any errors
//         console.error("Error signing out: ", error);
//       });    };

//     return (
//       <div>
//         {user ? (
//           <Dashboard user={user} gitHubId={gitHubId} handleLogout={handleLogout} />
//         ) : (
//           <GithubAuth setUser={setUser} setGitHubId={setGitHubId} />
//         )}
//       </div>
//     );
//   }
