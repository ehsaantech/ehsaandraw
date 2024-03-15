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

const SideNav = ({ values, handleDelete, handleEdit }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
      };
  return (
    <div>
    <IconButton onClick={toggleDrawer}>
    <MenuIcon />
  </IconButton>
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <ListItemText primary="Sketch Files" />
        </ListItem>
        {
          values.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12}>
                <DataCard 
                  userName={item.userName1} 
                  scenes={item.scenes1} 
                  onDelete={() => handleDelete(item.id)} 
                  onEdit={() => handleEdit(item.id, item.userName1, item.scenes1)} 
                />
              </Grid>
            </Grid>
          ))
        }
      </List>
    </Drawer>
    </div>
  );
}

export default SideNav;
