import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Stack from '@mui/material/Stack';
import { MyContext } from '../../functions/context';


export default function LoginModal(props) {
  const context = React.useContext(MyContext);
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');
  const rootRef = React.useRef(null);


  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleClickSendForm = () => {
    if (typeof context.axiLogInCashier === 'function'){
      context.axiLogInCashier(login, pass);
    }else{
      alert('функция не найдена');
    }
  };

  const handleKeyDown = (e)=>{
    if (e.key === 'Enter'){
      handleClickSendForm();
    }
  };

  return (
    <Box
      sx={{
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        '@media all and (-ms-high-contrast: none)': {
          display: 'none',
        },
      }}
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: 'relative',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
          <Typography id="server-modal-title" variant="h6" component="h2">
            Добро пожаловать!
          </Typography>
          <Typography id="server-modal-title" variant="h8" component="h5">
            Введите логин и пароль, чтобы войти в систему
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            <TextField
              required
              id="standard-required"
              label="Логин"
              variant="standard"
              onChange={handleChangeLogin}
              value={login}
              onKeyDown={handleKeyDown}
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              id="standard-password-input"
              label="Пароль"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={handleChangePass}
              value={pass}
              onKeyDown={handleKeyDown}
            />
            <Stack direction="row" spacing={2} sx={{marginLeft: '270px', marginTop: '10px'}}>
              <Button variant="contained" 
                endIcon={<CheckBoxIcon />} 
                sx={{fontSize: '12px', textTransform: 'lowercase', borderRadius: '8px'}}
                onClick={handleClickSendForm}
                
              >
                Подтвердить
              </Button>
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}