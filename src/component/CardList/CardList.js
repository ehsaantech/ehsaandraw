import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EhsaanDrawPicture from "../../assets/EhsaanDrawPicture.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CardList = ({ values, handleDelete, handleEdit, id }) => {
  return (
    <>
      <Grid
        container
        spacing={3}
        style={{
          marginTop: "10px",
        }}
      >
        {values.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              style={{
                width: "80%",
                height: "100%",
                borderRadius: "5px",
                borderColor: "rgba(255, 255, 255,255)",
                border: "0.2px solid lightgray",

              }}
            >
              <CardContent>
                <Button
                  onClick={() =>
                    handleEdit(item.id, item.userName1, item.scenes1)
                  }
                >
                  <img
                    src={EhsaanDrawPicture}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contained",
                      borderRadius: "2px",
                    }}
                    alt="No pict"
                  />
                </Button>

                <div
                  style={{
                    display: "flex",
                    // justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      color: "#36454F", fontWeight: "normal" }}
                  >
                    {item.userName1}
                  </Typography>
                  <Button
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                    onClick={() => handleDelete(item.id)}
                    startIcon={<DeleteIcon />}
                  ></Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardList;
