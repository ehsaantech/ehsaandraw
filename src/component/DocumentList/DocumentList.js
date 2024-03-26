import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { AddIcon, LogoutIcon } from "@/assets";
// import { useRouter } from "next/navigation";
import DocumentCard from "../Doc Card/DocumentCard";
// Styled components
const Wrapper = styled.div`
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: 1rem;
  white-space: nowrap;
`;

// const StyledAddIcon = styled(AddIcon)`
//   cursor: pointer;
// `;

const LogoutContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoutText = styled.h3`
  margin: 0 0.5rem;
`;

const DocumentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

// Component
const DocumentList = ({ values, handleDelete, handleEdit,id }) => {
 

//   const handleCreateMovieClick = () => {
//     router.push("/movies/create");
//   };

//   const handleNavigateToLogout = () => {
//     localStorage.setItem("token", "");
//     router.push("/login");
//   };

//   useEffect(() => {
//     const authToken = localStorage.getItem("token");
//     const getAllMovies = async () => {
//       const newMovies = await movieService.getAllMovies(
//         authToken!,
//         currentPage,
//         moviesPerPage
//       );

//       setMovies(newMovies.movies);
//       setCount(newMovies.count);
//     };
//     getAllMovies();
//   }, [currentPage, setMovies]);


  return (
    <Wrapper>
      <Header>
        {/* <div onClick={handleCreateMovieClick}>
          <Title>Ehsaan</Title>
          <StyledAddIcon onClick={handleCreateMovieClick} />
        </div>
        <LogoutContainer onClick={handleNavigateToLogout}>
          <LogoutText>Logout</LogoutText>
          <LogoutIcon onClick={handleNavigateToLogout} />
        </LogoutContainer> */}
      </Header>

      
      
        <DocumentContainer>
          {values?.map((item, index) => (
            <DocumentCard
            userName={item.userName1} 
            scenes={item.scenes1} 
            onDelete={() => handleDelete(item.id)} 
            onEdit={() => handleEdit(item.id, item.userName1, item.scenes1)} 
            />
          ))}
        </DocumentContainer>
         
      
      
      
    </Wrapper>
  );
};

export default DocumentList;
