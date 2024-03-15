import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useEffect, useRef, useState } from "react";


function EhsaanDrawScreen() {

    const [initialState, setinitialState] = useState([]);
   
    useEffect(() => {
      setinitialState(JSON.parse(localStorage.getItem("sceneData")));
        }, [initialState]);
  
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Ehsaan Draw</h1>
        <div style={{ height: "500px" }}>
          <Excalidraw
  
          excalidrawAPI={(api)=> setExcalidrawAPI(api)}
          initialData={{ elements:initialState}}
          renderTopRightUI={() => {
            return (
              <button
                style={{
                  background: "#70b1ec",
                  border: "none",
                  color: "#fff",
                  width: "max-content",
                  fontWeight: "bold",
                }}
                onClick={() => 
                  {
  
  
                    localStorage.setItem("sceneData", JSON.stringify(excalidrawAPI?.getSceneElements()) );
                    
                  window.alert("Data save successfully")}
  
                }
              >
                Save Me
              </button>
            );
          }}
          /> 
         </div>
      </>
    );
  }
  
  export default EhsaanDrawScreen;