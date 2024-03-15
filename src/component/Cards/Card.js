import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DataCard = ({ userName, scenes, onDelete, onEdit }) => {
    return (
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {scenes}
          </Typography>
          <Button onClick={onDelete} startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button onClick={onEdit} startIcon={<EditIcon />}>
            Edit
          </Button>
        </CardContent>
      </Card>
    );
};

export default DataCard;