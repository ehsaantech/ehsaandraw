import React, { useState ,useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@material-ui/core";
import gitImage from "../../assets/gitImage.png"
// import GitHubIcon from '@material-ui/icons/GitHub'; // Import GitHub icon
// import githubimage from '.../assets/githubimage.png'
import { useGithub } from "../../context";

const GithubAuth = () => {

  const { githubId, handleGithubLogin } = useGithub(); 

  const navigate = useNavigate()

  console.log("GithubAuthScreeeeen",githubId)

  useEffect(()=>{
    if(githubId){
      navigate("/")
    }
  })


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card style={{ maxWidth: 300 }}>
          <CardContent style={{ textAlign: "center" }}>
            <Typography>Welcome to Social Login</Typography>
            <img src={gitImage} alt="GitHub Logo" style={{ width: 80, marginBottom: 10 }} /> 

            <button
              style={{
                background: "#70b1ec",
                border: "none",
                color: "#fff",
                width: "100%",
                fontWeight: "bold",
                padding: "20px 40px",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onClick={handleGithubLogin}
            >
              Login With GitHub
            </button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default GithubAuth;
