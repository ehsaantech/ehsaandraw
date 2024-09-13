import React from "react";
import EhsaanDrawPicture from "../../assets/EhsaanDrawPicture.png";
import { Trash2 } from "lucide-react";

const CardList = ({ values, handleDelete, handleEdit, id }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", 
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
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
            transition: "transform 0.3s, box-shadow 0.3s", 
            maxWidth: "100%",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)"; 
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"; 
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
                  padding: "20px", 
                }}
              >
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
                  color: "#36454F",
                  fontWeight: "500", 
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
