import React, { useContext } from "react";
import EhsaanDrawPicture from "../../assets/EhsaanDrawPicture.png";
import { Trash2 } from "lucide-react";
import { ThemeContext } from "../../ThemeContext"; 

const CardList = ({ values, handleDelete, handleEdit,scenes, id }) => {
  const { theme } = useContext(ThemeContext); 

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown Date";
    const { seconds, nanoseconds } = timestamp;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000); 
    return date.toLocaleDateString();
  };

  const lightThemeStyles = {
    color: "#36454F",
  };

  const darkThemeStyles = {
    color: "#E3E3E8",
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {values?.map((item) => (
          <div
            key={item.id}
            style={{
              ...((theme === "dark") ? darkThemeStyles : lightThemeStyles), 
              borderRadius: "8px",
              border: theme === "dark" ? "2px solid #000":"2px solid #fff",
              overflow: "hidden",
              boxShadow: theme === "dark" ? "0 8px 12px #000" : "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              maxWidth: "100%",
              width: "100%",
            }}
            
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 8px 16px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div style={{ width: "100%", padding: "8px" }}>
              <button
                onClick={() =>
                  handleEdit(item?.id, item?.userName1, item?.scenes1)
                }
                style={{
                  width: "100%",
                  padding: 0,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <div style={{ padding: "20px" }}>
                <div
                    style={{
                      width: "49%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "4px",
                      display: "block",
                    }}
                  >
                    {/* <ExcaliDrawCard key={item.id} sceneData={item.scenes1} /> */}
                  </div>
                  <img
                    src={EhsaanDrawPicture}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "4px",
                      display: "block",
                      
                    }}
                    alt="No pict"
                  />
                </div>
              </button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: theme === "dark" ? "#E3E3E8" : "#36454F", 
                    fontWeight: "500",
                    padding: "5px",
                    fontFamily: "Cascadia, sans-serif",
                  }}
                >
                  {item?.userName1}
                </p>

                <button
                  onClick={() => handleDelete(item?.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    marginRight: "10px",
                    padding: "10px",
                  }}
                >
                  <Trash2 color={theme === "dark" ? "#E3E3E8" : "#000000"} />
                </button>
              </div>
              <p
                style={{
                  margin: 0,
                  color: theme === "dark" ? "#888888" : "#888",
                  fontSize: "14px",
                  padding: "5px",
                  fontFamily: "Cascadia, sans-serif",
                }}
              >
                <strong>Created At:</strong> {formatTimestamp(item?.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {values.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: theme === "dark" ? "#E3E3E8" : "#000000",
              fontSize: "30px",
            }}
          >
            No document created so far.
          </p>
        </div>
      )}
    </>
  );
};

export default CardList;
