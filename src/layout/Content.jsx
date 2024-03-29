import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';



import style from './Content.module.css';
import MenuStartRemains from './MenuStartRemains';
import MenuAcceptanceGoods from './MenuAcceptanceGoods';
import MenuReturnsGoods from './MenuReturnsGoods';
import MenuEndRemains from './MenuEndRemains';
import { ExitUserModal } from '../components/authorization/ExitUserModal';



import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MyContext } from '../functions/context';
import { stylesObj } from '../stylesObj/stylesObj';
import Dashboard from './Dashboard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const context = React.useContext(MyContext);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

//конец табменю


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '60px', 
  [theme.breakpoints.up('sm')]: {
    width: '60px',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Content() {
  const context = React.useContext(MyContext);
  //табы
  const [value, setValue] = React.useState(0);

  React.useEffect(()=>{
    if(+context.isOpenWorkDay === 0){
      setValue(1);
    }else{
      setValue(0);
    }
  },[context.isOpenWorkDay]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch(newValue){
      case 1:
        if(typeof context.axiGetRemains === 'function'){
          context.axiGetRemains();
        }
        break;
      case 4:
        if(typeof context.axiGetRemains === 'function'){
          context.axiGetRemains();
        }
        break;
    }
  };
  //конец табов


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className = {style.content}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <DensityMediumIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Буфет {context.point.name ? context.point.name : 'неизвестная точка'}  {context.point.address ? context.point.address : ''} 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          { open ? <ExitUserModal />
            : '' }
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className={style.nav}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
                
          >
            <Tab 
              key={0}
              label={
                <ListItemButton
                  key={0}
                  sx={stylesObj.ListItemButton}
                >
                  <ListItemIcon
                    sx={stylesObj.ListItemIcon}
                  >
                    <DashboardIcon 
                      color={value===0 ? 'secondary' : 'primary'}
                    /> 
                  </ListItemIcon>
                  {open &&
                  <ListItemText 
                    primary='статистика' 
                    sx={stylesObj.ListItemText} 
                  />
                  }
                </ListItemButton>
              } {...a11yProps(0)} > 
            </Tab>
            <Tab 
              key={1}
              disabled = {context.isOpenWorkDay}
              label={
                <ListItemButton
                  key={1}
                  sx={stylesObj.ListItemButton}
                >
                  <ListItemIcon
                    sx={stylesObj.ListItemIcon}
                  >
                    <AssignmentTurnedInIcon 
                      color={context.isOpenWorkDay ? 'disabled' : value===1 ? 'secondary' : 'primary'}
                    /> 
                  </ListItemIcon>
                  {open &&
                  <ListItemText 
                    primary='открыть смену' 
                    sx={stylesObj.ListItemText} 
                  />
                  }
                </ListItemButton>
              } {...a11yProps(1)} > 
            </Tab>
            <Tab 
              key={2}
              disabled = {!context.isOpenWorkDay}
              label={
                <ListItemButton
                  key={2}
                  sx={stylesObj.ListItemButton}
                >
                  <ListItemIcon
                    sx={stylesObj.ListItemIcon}
                  >
                    <AssignmentReturnedIcon 
                      color={!context.isOpenWorkDay ? 'disabled' : (value===2?'secondary':'primary')}/> 
                  </ListItemIcon>
                  {open &&
                  <ListItemText 
                    primary='принять товар' 
                    sx={stylesObj.ListItemText}
                  />
                  }
                </ListItemButton>
              } {...a11yProps(2)} >
            </Tab>       
            <Tab
              key={3}
              disabled = {!context.isOpenWorkDay}
              label={
                <ListItemButton
                  key={3}
                  sx={stylesObj.ListItemButton}
                >
                  <ListItemIcon
                    sx={stylesObj.ListItemIcon}
                  >
                    <AssignmentReturnIcon 
                      color={!context.isOpenWorkDay ? 'disabled' : (value===3 ? 'secondary' : 'primary')}/> 
                  </ListItemIcon>
                
                  {open &&
                  <ListItemText 
                    primary='вернуть товар' 
                    sx={stylesObj.ListItemText} 
                  />
                  }
                </ListItemButton>
              } {...a11yProps(3)} >
            </Tab>
            <Tab 
              key={4}
              disabled = {!context.isOpenWorkDay}
              label={
                <ListItemButton
                  key={4}
                  sx={stylesObj.ListItemButton}
                >
                  <ListItemIcon
                    sx={stylesObj.ListItemIcon}
                  >
                    <CancelIcon 
                      color={!context.isOpenWorkDay ? 'disabled' : (value===4?'secondary':'primary')}/> 
                  </ListItemIcon>
                
                  {open &&
                  <ListItemText 
                    primary='закрыть смену'  
                    sx={stylesObj.ListItemText} 
                  />
                  }
                </ListItemButton>
              } {...a11yProps(4)} >
            </Tab>
            
          </Tabs>
          <Divider />
        </List>
      </Drawer>
      <Box component="main" 
        className={style.main} 
        sx={stylesObj.MainBox}
      >
        <DrawerHeader />
        <Box
          sx={stylesObj.ContentBox}
        >
          
          <TabPanel className={style.table} value={value} index={0}>
            <Dashboard />
          </TabPanel>
          <TabPanel className={style.table} value={value} index={1}>
            {!context.isOpenWorkDay &&
            <MenuStartRemains />
            }
          </TabPanel>
          <TabPanel className={style.table} value={value} index={2}>
            {context.isOpenWorkDay &&
            <MenuAcceptanceGoods />
            }
          </TabPanel>
          <TabPanel className={style.table} value={value} index={3}>
            {context.isOpenWorkDay &&
            <MenuReturnsGoods />
            }
          </TabPanel>
          <TabPanel className={style.table} value={value} index={4}>
            {context.isOpenWorkDay &&
            <MenuEndRemains />
            }
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}