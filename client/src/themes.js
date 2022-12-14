import * as React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {Box, IconButton} from "@mui/material";
import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
console.log(ColorModeContext)

const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#ff6ea4',
            },
            secondary: {
                main: '#3f51b5',
            },
            contrast: {
                main: '#82ff6e',
            },
            error: {
                main: 'rgb(255,0,0)'
            },
        }
    }
);


const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#82ff6e',
                light: '#f7e376',
            },
            secondary: {
                main: '#ffd26e',
            },
            error: {
                main: 'rgb(255,0,0)'
            },
            text: {
                primary: '#f9f9f9',
                secondary: '#FD9F00FF',
            },
        }
    }
);

export function ToggleTheme(props) {
    // inspired by code from https://mui.com/material-ui/customization/dark-mode/#ToggleColorMode.js
    const [currMode, setMode] = React.useState("dark");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                // calculate the next mode given the previous mode:
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light'
                    console.log(newMode);
                    return newMode;
                });
            },
        }),
        [],
    );
    const theme = React.useMemo(
        () => currMode === "dark" ? darkTheme : lightTheme,
        [currMode],
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {props.child}
                <ToggleThemeButton/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

function ToggleThemeButton() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Box bottom="3%" right="3%" position="absolute" sx={{bgcolor: 'background.default', color:'text.primary'}}>
            <IconButton aria-label="toggletheme" onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "light" ? <DarkModeOutlined/> : <LightModeOutlined/>}
            </IconButton>
        </Box>
    );
}