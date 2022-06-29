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
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

import { MenuOne } from './MenuOne/MenuOne';
import { MenuTwo } from './MenuTwo/MenuTwo';
import { MenuThree } from './MenuThree/MenuThree';
import { MenuFour } from './MenuFour/MenuFour';
import { AddUserModal } from '../components/authorization/addUserModal'


// начало табменю

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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
  width: `calc(${theme.spacing(16)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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
    //табы
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
    <Box sx={{ display: 'flex' }}>
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
            <AirplanemodeActiveIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DishApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        { open ? <AddUserModal />
                : '' }
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <Tabs
                orientation="vertical"
                // value={value}
                onChange={handleChange}
                
            >
                <Tab label={
                    <ListItemButton
                    key='Статус'
                    // sx={{
                    //     minHeight: 48,
                    //     justifyContent: open ? 'initial' : 'center',
                    //     px: 2.5,
                    // }}
                >
                        <ListItemIcon
                            sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'left',
                            }}
                        >
                            <CheckCircleOutlineIcon /> 
                        </ListItemIcon>
                        <ListItemText primary='MenuOne' sx={{ opacity: open ? 1 : 0, marginRight: "-50px"}} />
                    </ListItemButton>
                    } {...a11yProps(0)} >
                    
                </Tab>
                <Tab label={
                    <ListItemButton
                    key='БАП'
                    sx={{
                      display: 'flex',
                        minHeight: 50,
                        minWidth: 77,
                        justifyContent: open ? 'initial' : 'left',
                        px: 2.5,
                    }}
                    >
                        <ListItemIcon
                            sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            }}
                        >
                            <TrackChangesIcon /> 
                        </ListItemIcon>
                        <ListItemText primary='MenuTwo' sx={{ opacity: open ? 1 : 0, marginRight: "-50px" }} />
                    </ListItemButton>
                } {...a11yProps(0)} >
                    
                </Tab>           
                <Tab label={<ListItemButton
                key='Add user'
                sx={{
                    minHeight: 50,
                    minWidth: 77,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        }}
                    >
                        <AssignmentIcon /> 
                    </ListItemIcon>
                    <ListItemText primary='MenuThree' sx={{ opacity: open ? 1 : 0, marginRight: "-70px" }} />
                </ListItemButton>} {...a11yProps(0)} >
                </Tab>
                </Tabs>
            <Divider />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
{/* табы */}
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                    >
                    <TabPanel value={value} index={0}>
                        <MenuOne />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MenuTwo />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <MenuThree />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <MenuFour />
                    </TabPanel>
                    </Box>
{/* табы */}
      </Box>
    </Box>
  );
}