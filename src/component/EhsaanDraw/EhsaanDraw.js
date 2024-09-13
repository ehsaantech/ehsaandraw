import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Share2 } from "lucide-react";

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
                        // padding: "2px",
                        borderRadius: "5px",
                        background: "#fff",
                        border: "3px solid black",
                        color: "#000000",
                        width: "50px",
                        height: "37px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        outline: "none",
                        marginLeft: "10px",
                      }}
                      onClick={() => navigate("/")}
                    >
                      <ArrowLeft />
                    </button>
                    <button
                       style={{
                        // padding: "2px",
                        borderRadius: "5px",
                        background: "#fff",
                        border: "3px solid black",
                        color: "#000000",
                        width: "50px",
                        height: "37px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        outline: "none",
                        marginLeft: "10px",
                      }}
                      onClick={shareScenesData}
                    >
                      <Share2 />
                    </button>
                    <button
                       style={{
                        // padding: "2px",
                        borderRadius: "5px",
                        background: "#000000",
                        // border: "3px solid black",
                        color: "#fff",
                        width: "100px",
                        height: "37px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        outline: "none",
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        updateData(excalidrawAPI?.getSceneElements());
                        toast.success("Sketch saved successfully");
                      }}
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
