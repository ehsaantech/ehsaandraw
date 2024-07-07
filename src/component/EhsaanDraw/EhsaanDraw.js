import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import toast from "react-hot-toast";

function EhsaanDrawScreen({
  updateData,
  scenes,
  shareScenesData,
  readOnly = false,
}) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    excalidrawAPI?.updateScene({ elements: scenes });
  }, [scenes, excalidrawAPI]);


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (excalidrawAPI) {
  //       // Save the current drawing and selection state
  //       const currentElements = excalidrawAPI.getSceneElements();
  //       const currentAppState = excalidrawAPI.getAppState();

  //       // Update the data
  //       updateData(currentElements);

  //       // Re-apply the current state to avoid losing in-progress work
  //       excalidrawAPI.updateScene({
  //         elements: currentElements,
  //         appState: currentAppState,
  //       });
  //     }
  //   }, 100000); // 5000 milliseconds = 5 seconds

  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [excalidrawAPI, updateData]);
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
                {!readOnly && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%", // Ensure the parent div has enough width to distribute space
                      gap: "10px", // Optional: add gap for consistent spacing
                    }}
                  >
                    <button
                      style={{
                        padding: "2px",
                        borderRadius: "5px",
                        background: "#70b1ec",
                        border: "none",
                        color: "#fff",
                        height: "45px",

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
                        padding: "6px",
                        borderRadius: "5px",
                        background: "#70b1ec",
                        border: "none",
                        width: "45px",
                        height: "45px",

                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      onClick={shareScenesData}
                    >
                      <ShareIcon />
                    </button>
                    <button
                      style={{
                        padding: "2px",
                        borderRadius: "5px",
                        background: "#70b1ec",
                        border: "none",
                        color: "#fff",
                        width: "100px",
                        height: "45px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() =>{
                        updateData(excalidrawAPI?.getSceneElements())
                        toast.success("Sketch saved successfully");
                      }
                      }
                    >
                      Save Sketch
                    </button>
                  </div>
                )}
              </>
            );
          }}
        />
      </div>
    </>
  );
}

export default EhsaanDrawScreen;
