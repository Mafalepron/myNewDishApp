export let stylesObj = {

  ListItemButton: {
    display: 'flex',
    minHeight: 50,
    minWidth: 77,
    justifyContent: open ? 'initial' : 'left',
    px: 2.5,
  },

  ListItemIcon: {
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
  },

  ListItemText: {
    opacity: open ? 1 : 0
  },

  MainBox: {
    flexGrow: 1, 
    p: 3
  },

  ContentBox: {
    flexGrow: 1, 
    bgcolor: 'background.paper', 
    display: 'flex',
    height: 224 
  },

  SendRemainsButton: {
    fontSize: '12px', 
    textTransform: 'lowercase', 
    borderRadius: '18px', 
    marginTop: '5px', 
    left: '85%', 
    width: '15%'
  },


};