import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useGithub } from "../../context";
import toast from "react-hot-toast";
import ShareIcon from "@mui/icons-material/Share";

function EhsaanDrawScreen({ updateData, scenes }) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const navigate = useNavigate();
  const { githubId } = useGithub();
  const shareLink = () => {
    if (githubId) {
      const url = window.location.href.split("?")[0]; // Remove query parameters
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to share!");
        })
        .catch((error) => {
          toast.error("Error copying link:", error);
        });
    }
  };

  useEffect(() => {
    excalidrawAPI?.updateScene({ elements: scenes });
  }, [scenes, excalidrawAPI]);

  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
      >
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          renderTopRightUI={() => {
            return (
              <>
                <button
                  style={{
                    padding: "2px",
                    borderRadius: "5px",
                    background: "#70b1ec",
                    border: "none",
                    color: "#fff",
                    width: "45px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => navigate("/")}
                >
                  <ArrowBackIcon />
                </button>
                <button
                  style={{
                    background: "#70b1ec",
                    border: "none",
                    width: "45px",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  onClick={shareLink}
                >
                  <ShareIcon />
                </button>
                <button
                  style={{
                    background: "#70b1ec",
                    border: "none",
                    color: "#fff",
                    width: "max-content",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                  onClick={() => updateData(excalidrawAPI?.getSceneElements())}
                >
                  Save Sketch
                </button>
              </>
            );
          }}
        />
      </div>
    </>
  );
}

export default EhsaanDrawScreen;
