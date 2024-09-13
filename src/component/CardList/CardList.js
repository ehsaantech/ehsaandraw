import React from "react";
import EhsaanDrawPicture from "../../assets/EhsaanDrawPicture.png";
import { Trash2 } from "lucide-react";

const CardList = ({ values, handleDelete, handleEdit, id }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // Default to 1 column for small screens
        gap: "20px",
        padding: "20px",
      }}
    >
      {values.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Enhanced shadow for depth
            transition: "transform 0.3s, box-shadow 0.3s", // Smooth hover effects
            maxWidth: "100%",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)"; // Lift effect on hover
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"; // Reset effect on mouse leave
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "8px",
            }}
          >
            <button
              onClick={() => handleEdit(item.id, item.userName1, item.scenes1)}
              style={{
                width: "100%",
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  padding: "20px", // Padding applied to the container
                }}
              >
                <img
                  src={EhsaanDrawPicture}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover", // Cover ensures the image covers the entire container area
                    borderRadius: "4px",
                    display: "block", // Removes any default spacing from images
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
                  color: "#36454F",
                  fontWeight: "500", // Slightly bolder text for better readability
                  fontSize: "18px",
                  padding: "5px",
                }}
              >
                {item.userName1}
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginRight: "10px",
                  padding: "10px",
                }}
              >
                <Trash2 color="#000000" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        @media (min-width: 768px) {
          div[style] {
            grid-template-columns: repeat(
              3,
              1fr
            ); /* 3 cards on medium (iPad) screens */
          }
        }
        @media (min-width: 1024px) {
          div[style] {
            grid-template-columns: repeat(
              4,
              1fr
            ); /* 4 cards on large (desktop) screens */
          }
        }
      `}</style>
    </div>
  );
};

export default CardList;
