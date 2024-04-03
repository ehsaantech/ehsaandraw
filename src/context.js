import React, { createContext, useState, useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth , provider } from './firebaseConfig';
// import { useNavigate } from "react-router-dom";

const GithubContext = createContext();


const GithubProvider = ({ children }) => {
  const [githubId, setGithubId] = useState(() => {
    // Initialize the state with the value from localStorage if available
    const storedId = localStorage.getItem("github_Id");
    return storedId ? JSON.parse(storedId) : null;
  }); 
  // const navigate = useNavigate()
  
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const githubUser = result.user.uid;
      localStorage.setItem("github_Id", JSON.stringify(githubUser));
      setGithubId(githubUser);
      // navigate("/");
      console.log("githubIdONLOgin",githubUser);
    } catch (error) {
      console.log(error);
    }
  };


  const logout = async () => {
    try {
      localStorage.removeItem("github_Id");
      setGithubId(null);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <GithubContext.Provider value={{ githubId, handleGithubLogin,logout }}>
      {children}
    </GithubContext.Provider>
  );
};

const useGithub = () => useContext(GithubContext);

export { GithubProvider, useGithub };
