import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Card, CardContent ,Typography} from '@material-ui/core';



// import GitHubIcon from '@material-ui/icons/GitHub'; // Import GitHub icon
// import githubimage from '.../assets/githubimage.png'

const GithubAuth = ({ setUser ,setGitHubId }) => {

    const navigate = useNavigate();

  const handleGithubLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setUser(result.user);
        localStorage.setItem('userLogin', JSON.stringify(result.user));
        if(result.user){
          navigate("/")
        }
         // eslint-disable-next-line no-undef

// const value = collection(database, "appdata");
// const data = await addDoc(value, result.user.uid);
        setGitHubId(result.user.uid)
        console.log("Github Id", result.user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ maxWidth: 300 }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography>
            Welcome to Social Login
          </Typography>
          {/* <img src={githubimage} alt="GitHub Logo" style={{ width: 50, marginBottom: 10 }} /> Replace 'github_logo.png' with the actual path to your GitHub logo */}

          <button
            style={{
              background: '#70b1ec',
              border: 'none',
              color: '#fff',
              width: '100%',
              fontWeight: 'bold',
              padding: '20px 40px',
              borderRadius: 5,
              cursor: 'pointer',
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
