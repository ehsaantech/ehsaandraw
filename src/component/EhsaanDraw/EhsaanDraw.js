import { Excalidraw, THEME } from "@excalidraw/excalidraw";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Sun, Moon, Share2 } from "lucide-react";

function EhsaanDrawScreen({
  updateData,
  scenes,
  shareScenesData,
  readOnly = false,
  isSaving
}) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [theme, setTheme] = useState(THEME.LIGHT); 
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || THEME.LIGHT;
    setTheme(savedTheme);

    if (excalidrawAPI) {
      excalidrawAPI.updateScene({ elements: scenes });
    }
  }, [scenes, excalidrawAPI]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      if (excalidrawAPI) {
        excalidrawAPI.updateScene({
          appState: { theme: newTheme },
        });
      }
      // Save the selected theme to localStorage
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleSave = () => {
    if (excalidrawAPI) {
      updateData(excalidrawAPI.getSceneElements());
      toast.success("Sketch saved successfully");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const buttonStyles = {
    borderRadius: "5px",
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
  };

  const lightThemeStyles = {
    background: "#fff",
    border: "3px solid black",
    color: "#000000",
  };

  const darkThemeStyles = {
    background: "#232329",
    border: "3px solid #232329",
    color: "#E3E3E8",
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
      >
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          initialData={{
            appState: {
              theme,
            },
            elements: scenes,
          }}
          renderTopRightUI={() => {
            return (
              <>
                {!readOnly && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{
                        ...buttonStyles,
                        ...(theme === THEME.LIGHT ? lightThemeStyles : darkThemeStyles),
                      }}
                      onClick={handleBack}
                    >
                      <ArrowLeft />
                    </button>
                    <button
                      style={{
                        ...buttonStyles,
                        ...(theme === THEME.LIGHT ? lightThemeStyles : darkThemeStyles),
                      }}
                      onClick={shareScenesData}
                    >
                      <Share2 />
                    </button>
                    <button
                      style={{
                        ...buttonStyles,
                        background: theme === THEME.LIGHT ? "#000000" : "#232329",
                        border: theme === THEME.LIGHT ? "3px solid #232329" : "3px solid #232329",
                        color: theme === THEME.LIGHT ? "#fff" : "#E3E3E8",
                        width: "105px",
                      }}
                      disabled={isSaving}
                      onClick={handleSave}
                    >
                      {isSaving ? "...Saving" : "Save Sketch"}
                    </button>
                    <button
                      style={{
                        ...buttonStyles,
                        background: theme === THEME.LIGHT ? "#fff" : "#232329",
                        border: theme === THEME.LIGHT ? "3px solid #232329" : "3px solid #232329",
                        color: theme === THEME.LIGHT ? "#232329" : "#E3E3E8",
                      }}
                      onClick={toggleTheme}
                    >
                      {theme === THEME.LIGHT ? <Moon /> : <Sun />}
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
