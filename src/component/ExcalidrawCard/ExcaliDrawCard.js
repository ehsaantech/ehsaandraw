  import { Excalidraw } from "@excalidraw/excalidraw";
  import { useEffect, useRef } from "react";

  const ExcaliDrawCard = ({ sceneData }) => {
      const excalidrawRef = useRef(null);
      useEffect(() => {
      console.log(sceneData);

        // Load the Excalidraw scene JSON into the component
        if (excalidrawRef.current) {  
          console.log('okay, I was current')
          excalidrawRef.current.updateScene({ elements: sceneData });
        }
      }, [sceneData]);
    
      return (
        <div className="card">
          <div style={{ height: 300, width: 250 }}>
            <Excalidraw ref={excalidrawRef} sceneData={sceneData} />
          </div>
        </div>
      );
    };

  export default ExcaliDrawCard;