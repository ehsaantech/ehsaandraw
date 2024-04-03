import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import DataCard from '../Cards/Card';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EhsaanDrawScreen from '../EhsaanDraw/EhsaanDraw';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const Container = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
  gap: '5px',
  padding: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
 
});

const CardList = ({ values, handleDelete, handleEdit,id }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
      };
  return (
    <div>

<Container>
{values.map((item, index) => (
    <Grid container spacing={2} key={index} >
      
        <DataCard
         scenes={item.scenes1}
          userName={item.userName1}
          onDelete={() => handleDelete(item.id)}
          onEdit={() => handleEdit(item.id, item.userName1, item.scenes1)}
        />
                     
    </Grid>
  ))}
    </Container>
   
    </div>
  );
}

export default CardList;
