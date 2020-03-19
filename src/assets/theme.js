import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    props: {
      MuiTextField: {
        variant: "outlined"
      },
      MuiCheckbox: {
          color: "primary"
      }, 
      MuiRadio: {
          color: "primary"
      },
      MuiSwitch: {
          color: "primary"
      },
      MuiList: {
          dense: true
      },
      MuiTable: {
          size: "small"
      }
    },
    typography: {
        fontsize: 12
    }
  });
  