import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Styled components
const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

const CardContentWrapper = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px; /* Adjust as needed */
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const StyledBookCard = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  gap: 0.75rem;
  padding: 0.5rem;
  // border: 1px solid;
  border-radius: 6px;
  overflow: hidden;
  border-color: #ccc;
  transition: border-color 0.3s ease;
  margin-top: 0.25rem;
  height: 290px;
  flex-shrink: 0;
  width: 200px; 

  background: linear-gradient(0deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%), rgba(8, 41, 53, 0.55);
`;

export const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
  background-color: #eee;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.3s ease;

  ${StyledBookCard}:hover & {
    opacity: 0.75;
  }
`;

export const TitleLink = styled.div`
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  font-family: Montserrat;
`;

export const YearText = styled.p`
  margin-top: 0.25rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: #fff;
`;


export const EditButton = styled.button`
  width: 110%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;
// Component
const DataCard = ({ userName, onDelete, onEdit }) => {
  return (
    <StyledCard>
      <ImageContainer />
      <CardContentWrapper>
        <Typography variant="h5" component="div">
          {userName}
        </Typography>
        <ButtonWrapper>
          <Button onClick={onDelete} startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button onClick={onEdit} startIcon={<EditIcon />}>
            Edit
          </Button>
        </ButtonWrapper>
      </CardContentWrapper>
    </StyledCard>
  );
};

export default DataCard;
