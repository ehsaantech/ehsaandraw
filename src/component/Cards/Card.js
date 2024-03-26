import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";


const DataCard = ({ userName, scenes, onDelete, onEdit,drawScreenImage }) => {


const StyledContainer = styled.div`
padding: 1rem 4rem; /* Responsive padding */

@media (min-width: 640px) {
  padding: 1rem 6rem; /* Adjust for small screens */
}

@media (min-width: 1024px) {
  padding: 3rem 8rem; /* Adjust for large screens */
  max-width: 10xl; /* Adjust for large screens */
}
`;

const StyledLink = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  height: 350px;
  width: 200px;
  flex-shrink: 0;
  // background: linear-gradient(0deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%), rgba(8, 41, 53, 0.55);
background: linear-gradient(0deg, rgba(173, 216, 230, 0.5) 0%, rgba(173, 216, 230, 0.5) 100%), rgba(8, 41, 53, 0.55);
  
  &:hover {
    border-color: #ccc;
    backdrop-filter: blur(100px);
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
  background-color: #ffff; /* Adjust as needed */
  
  /* Adjust aspect ratio if necessary */
  &.aspect-h-1 {
    height: 0;
    padding-top: 100%; /* Aspect ratio 1:1 */
  }

  &.aspect-w-1 {
    width: 0;
    padding-left: 100%; /* Aspect ratio 1:1 */
  }

  /* Additional styles for different aspect ratios */
  &.xl\:aspect-h-8 {
    @media (min-width: 1280px) {
      height: 0;
      padding-top: 12.5%; /* Aspect ratio 8:1 */
    }
  }

  &.xl\:aspect-w-7 {
    @media (min-width: 1280px) {
      width: 0;
      padding-left: 14.28%; /* Aspect ratio 1:7 */
    }
  }
`;


const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 6px; /* Adjust border radius as needed */
  transition: opacity 0.3s;

  /* Apply opacity change on hover */
  .group:hover & {
    opacity: 0.75;
  }
`;
const StyledLinks = styled.a`
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
const StyledParagraph = styled.p`
  margin-top: 0.25rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #000000
  ;
`;
    return (
<>
      <StyledContainer>
        <StyledLink>
        <StyledWrapper>
        <StyledImage
        
        />
        </StyledWrapper>

          <StyledLinks></StyledLinks>
          <StyledParagraph>{userName}</StyledParagraph>
              <Button onClick={onDelete} startIcon={<DeleteIcon />}>
            Delete
          </Button>
         <Button onClick={onEdit} startIcon={<EditIcon />}>
           Edit
         </Button>
        </StyledLink>

      </StyledContainer>
      </>
      // <Card variant="outlined" sx={{ marginBottom: 2 }}>
      //   <CardContent>
      //   <Typography variant="body2" color="text.secondary">
      //       {scenes}
      //     </Typography>
      //     <Typography variant="h5" component="div">
      //       {userName}
      //     </Typography>
          
      //     <Button onClick={onDelete} startIcon={<DeleteIcon />}>
      //       Delete
      //     </Button>
      //     <Button onClick={onEdit} startIcon={<EditIcon />}>
      //       Edit
      //     </Button>
      //   </CardContent>
      // </Card>
    );
};

export default DataCard;