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
    fontSize: '15%',
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
    display: 'flex',
    fontSize: '14px', 
    textTransform: 'lowercase', 
    borderRadius: '8px', 
    marginTop: '16px', 
    height: 40,
    width: '15%',
    minWidth: '200px',
    alignSelf: 'flex-end',
    marginRight: '20%',
    '@media screen and (max-width: 400px)': {
      height: 30,
      marginLeft: '-50px'
    },
  },

  TableCellMinPadding: {
    paddingTop: '8px',
    paddingBottom: '8px', 
  },
};