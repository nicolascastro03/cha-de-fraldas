import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
      primary:{
        main:'#F1CEC8',
        dark: ' #8B5E5A',
        light: '#FAE6E2',
      },
    },
    typography: {
      h3:{
        color:'#F1CEC8',     
      },
    },
});

export default theme;