import { Excalidraw } from "@excalidraw/excalidraw";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
      <div style={{ height: "500px" }}>
        <Excalidraw 
         initialData={{
          elements: [
            {
              type: "rectangle",
              version: 141,
              versionNonce: 361174001,
              isDeleted: false,
              id: "oDVXy8D6rom3H1-LLH2-f",
              fillStyle: "hachure",
              strokeWidth: 1,
              strokeStyle: "solid",
              roughness: 1,
              opacity: 100,
              angle: 0,
              x: 100.50390625,
              y: 93.67578125,
              strokeColor: "#000000",
              backgroundColor: "transparent",
              width: 186.47265625,
              height: 141.9765625,
              seed: 1968410350,
              groupIds: [],
            },
          ],
          appState: { zenModeEnabled: true, viewBackgroundColor: "#a5d8ff" },
          scrollToContent: true
        }}
        />
      </div>
    </>
  );
}

export default App;
