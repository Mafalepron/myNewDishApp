import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

const AlertModal = (props) => {

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    if (typeof props.onClose === 'function'){
      setOpen(false);
      props.onClose(false);
    }else{
      console.log('функция props.onClose не найдена');
    }
  };



  return (

    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          {props.text ? props.text : 'выполнено успешно'}
        </Typography>
        <br />
        <div style={{display: 'flex'}}>
          <Button 
            variant="contained"
            style={{marginLeft: '170px', backgroundColor: '#088', fontSize: '12px', width: '150px'}}
            onClick={handleClose}            
          >{props.buttonText ? props.buttonText : 'OK'}</Button>
        </div>
      </Box>
    </Modal>
  );
};


export { AlertModal };