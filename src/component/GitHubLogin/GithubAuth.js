import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gitImage from "../../assets/gitImage.png";
import { useGithub } from "../../context";

const GithubAuth = () => {
  const { githubId, handleGithubLogin } = useGithub();

  const navigate = useNavigate();
  useEffect(() => {
    if (githubId) {
      navigate("/");
    }
  });

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
        {/* Custom Card Container */}
        <div
          style={{
            maxWidth: "300px",
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Card Content */}
          <div
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: "16px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
              }}
            >
              Welcome to Social Login
            </h3>

            <img
              src={gitImage}
              alt="GitHub Logo"
              style={{ width: "80px", marginBottom: "10px" }}
            />

            <button
              style={{
                background: "#000000",
                border: "none",
                color: "#fff",
                width: "100%",
                fontWeight: "bold",
                padding: "12px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                font: "sans-serif",
              }}
              onClick={handleGithubLogin}
            >
              Login With GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GithubAuth;
