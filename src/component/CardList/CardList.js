import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CardList = ({ values, handleDelete, handleEdit, id }) => {
  return (
    <Grid
      container
      spacing={3}
      style={{
        marginTop: "10px",
      }}
    >
      {values.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              width: "250px",
              height: "130px",
              backgroundColor: " #fafafa"
            }}
          >
            <h2 >{item.userName1}</h2>
            <Button
              onClick={() => handleDelete(item.id)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              onClick={() => handleEdit(item.id, item.userName1, item.scenes1)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
