import { createTheme } from "@mui/material/styles";

// Color palette
const primaryColor = "#006633";
const secondaryColor = "#FFFFFF";
const tertiaryColor = "#36C46C";
const quarternaryColor = "#B6B6B6";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    success: {
      main: tertiaryColor,
    },
    grey: {
      300: quarternaryColor,
    },
  },

  //Fonts
  typography: {
    fontFamily: '"Tahoma", sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Tahoma", sans-serif',
      color: primaryColor,
    },
    h2: {
      fontWeight: 700,
      fontFamily: '"Tahoma", sans-serif',
      color: primaryColor,
    },
    h3: {
      fontFamily: '"Tahoma", sans-serif',
      color: primaryColor,
    },
    h4: {
      fontFamily: '"Tahoma", sans-serif',
      color: tertiaryColor,
    },
    h5: {
      fontFamily: '"Tahoma", sans-serif',
      color: tertiaryColor,
    },
    h6: {
      fontFamily: '"Tahoma", sans-serif',
      color: tertiaryColor,
    },
    body1: {
      fontFamily: '"Tahoma", sans-serif',
    },
    body2: {
      fontFamily: '"Tahoma", sans-serif',
    },
    subtitle1: {
      fontFamily: '"Calibri", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Calibri", sans-serif',
    },
    button: {
      fontFamily: '"Tahoma", sans-serif',
    },
    caption: {
      fontFamily: '"Calibri", sans-serif',
    },
    overline: {
      fontFamily: '"Calibri", sans-serif',
    },
  },

  //This makes most shapes round
  shape: {
    borderRadius: 12,
  },
  components: {
    //Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    //Textfield
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    //Card
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    // Add here any other components we want to round
  },
});

export default theme;