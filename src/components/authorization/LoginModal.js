import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { MyContext } from '../../functions/context';

let margin = {marginTop: '18px'};

export default function LoginModal(props) {
  const context = React.useContext(MyContext);
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [textError, setTextError] = React.useState('');
  const rootRef = React.useRef(null);


  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleClickSendForm = async () => {
    setIsWaiting(true);
    if (typeof context.axiLogInCashier === 'function'){
      let result = await context.axiLogInCashier(login, pass);
      setTextError(result);
    }else{
      setTextError('функция не найдена');
    }
    setIsWaiting(false);
  };

  const handleKeyDown = (e)=>{
    if (e.key === 'Enter'){
      handleClickSendForm();
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
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
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
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
          <TextField
            required
            id="standard-required"
            label="Логин"
            variant="outlined"
            onChange={handleChangeLogin}
            value={login}
            onKeyDown={handleKeyDown}
            sx={margin}
          />
          <TextField
            required
            id="standard-password-input"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={handleChangePass}
            value={pass}
            onKeyDown={handleKeyDown}
            sx={margin}
            error={textError}
            helperText={textError}
          />
          <LoadingButton 
            variant="contained"
            color="success"
            disabled={isWaiting || !login || !pass}
            loading={isWaiting}
            loadingPosition="end"
            endIcon={<LoginIcon/>}
            onClick={handleClickSendForm}
            sx={margin}
          >
              Войти
          </LoadingButton>
        </Box>
      </Modal>
    </Box>
  );
}