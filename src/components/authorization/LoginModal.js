import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { MyContext } from '../../functions/context';

import axios from 'axios';
import axi from './../../functions/axiosf';

import isResultObjectOk from '../../functions/isResultObjectOk';

let margin = { marginTop: '18px' };

export default function LoginModal(props) {
  const context = React.useContext(MyContext);
  const [login, setLogin] = React.useState('');
  const [loginList, setLoginList] = React.useState([]);

  const [isStartWaiting, setIsStartWaiting] = React.useState(false);

  const [loginError, setLoginError] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [textError, setTextError] = React.useState('');
  const rootRef = React.useRef(null);

  const axiGetLoginList = (axiCancelToken) => {
    setIsStartWaiting(true);
    setLoginError('');

    axi('/cashier/getCashiersNamesList.php', '', {}, axiCancelToken).then(
      (result) => {
        console.log(result);
        if (
          isResultObjectOk(
            result,
            ['names'],
            'ошибка в получении списка',
            setLoginError
          )
        ) {
          setLoginList(result['names']);
        } else {
          setLoginList([]);
        }
        setIsStartWaiting(false);
      },
      (e) => {
        console.log(e);
        setIsStartWaiting(false);
        setLoginError('сервер не отвечает');
      }
    );
  };

  // const handleChangeLogin = (e) => {
  //   setLogin(e.target.value);
  // };

  React.useEffect(() => {
    const axiCancelToken = axios.CancelToken.source();
    axiGetLoginList(axiCancelToken);
    return () => {
      axiCancelToken.cancel();
    };
  }, []);

  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleClickSendForm = async () => {
    setIsWaiting(true);
    if (typeof context.axiLogInCashier === 'function') {
      let result = await context.axiLogInCashier(login, pass);
      setTextError(result);
    } else {
      setTextError('функция не найдена');
    }
    setIsWaiting(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClickSendForm();
    }
  };

  const handleChangeLoginList = (event) => {
    setLogin(event.target?.value);
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

          {/* <TextField
            required
            id="standard-required"
            label="Логин"
            type="text"
            variant="outlined"
            onChange={handleChangeLogin}
            value={login}
            onKeyDown={handleKeyDown}
            sx={margin}
          /> */}

          <FormControl sx={margin}>
            <InputLabel id="select-label">Логин *</InputLabel>
            <Select
              required
              labelId="select-label"
              id="select-required"
              value={login}
              label="Логин"
              onChange={handleChangeLoginList}
            >
              {loginList.length > 0
                ? loginList.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))
                : null}
            </Select>
            <FormHelperText sx={{ color: 'red !important' }}>
              {loginError}
            </FormHelperText>
          </FormControl>

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
            error={!!textError}
            helperText={textError}
          />
          <LoadingButton
            variant="contained"
            color="success"
            disabled={isWaiting || !login || !pass || isStartWaiting}
            loading={isWaiting || isStartWaiting}
            loadingPosition="end"
            endIcon={<LoginIcon />}
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
