import React from 'react';
import { Modal, Paper, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// generic modal component, just need to pass title and content of modal
const GenericModal = ({ open, onClose, title, content }) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
      
    >
      <Paper
      sx={{
        position: 'relative',
        // backgroundColor:
        padding: 1,
        width: 400,
        maxHeight:'80vh',
        overflowY:'auto'
      }} 
    >
        <IconButton 
            sx={{
                position: 'absolute',
                top: 1,
                right: 1,
            }} 
            onClick={onClose}
        >
           <CloseIcon/> 
        </IconButton>
        <Typography variant="h6" component="h2" sx={{textAlign:'center',pt:2}}>
          {title}
        </Typography>
        {content}
      </Paper>
    </Modal>
  );
};

export default GenericModal;