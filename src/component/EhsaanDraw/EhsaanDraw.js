import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useEffect, useState } from "react";

function EhsaanDrawScreen({updateData,scenes}) {

    const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    useEffect(() => {
      excalidrawAPI?.updateScene(  {elements:scenes});
    }, [scenes,excalidrawAPI]);

    return (
      <>
        <div style={{
          height: "100vh"
        }}>
          <Excalidraw
          excalidrawAPI={(api)=> setExcalidrawAPI(api)}
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
                    updateData(excalidrawAPI?.getSceneElements())
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