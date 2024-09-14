import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useRef } from "react";

const ExcaliDrawCard = ({ sceneData }) => {
    const excalidrawRef = useRef(null);
    useEffect(() => {
    console.log(sceneData);

      // Load the Excalidraw scene JSON into the component
      if (excalidrawRef.current) {
        console.log('okay, I was current')
        excalidrawRef.current.updateScene({ elements: scene2 });
      }
    }, [sceneData]);
  
    return (
      <div className="card">
        <div style={{ height: 200, width: 300 }}>
          <Excalidraw ref={excalidrawRef} initialData={scene2} />
        </div>
      </div>
    );
  };

export default ExcaliDrawCard;