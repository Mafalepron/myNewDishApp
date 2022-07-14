import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { MyContext } from '../../functions/context';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ExitUserModal = (props) => {
  const context = React.useContext(MyContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickExit = () => {
    if (typeof context.userExit === 'function'){
      context.userExit();
      setOpen(false);
    }else{
      alert('функция не найдена');
    }
  };


  return (
    <div>
      <ListItemButton
        key='add User'
        sx={{
          minHeight: 48,
          px: 2.5,
        }}
        onClick={handleOpen}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
          }}
        >
          <LogoutIcon />
        </ListItemIcon>
                &nbsp;
        <h4>выйти</h4>
      </ListItemButton>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Вы уверены, что хотите выйти?
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            не забудьте закрыть смену в конце дня
          </Typography>
          <br />
          <div style={{display: 'flex'}}>
            <Button
              variant="contained" 
              type='success' 
              style={{backgroundColor: 'green', width: '150px', fontSize: '12px'}}
              onClick={handleClose}            
            >Остаться</Button>
            <Button 
              variant="contained"
              style={{marginLeft: '170px', backgroundColor: 'red', fontSize: '12px', width: '150px'}}
              onClick={handleClickExit}            
            >Выйти</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};


export { ExitUserModal };