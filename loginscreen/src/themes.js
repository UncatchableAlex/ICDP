import * as React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {Box, IconButton, useMediaQuery} from "@mui/material";
import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
console.log(ColorModeContext)

const lightTheme = createTheme( {
            palette: {
                mode: 'light',
                primary: {
                    main: '#ff6ea4',
                },
                secondary: {
                    main: '#3f51b5',
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
            text: {
                primary: '#f9f9f9',
                secondary: 'rgba(255,255,253,0.7)',
            },
        }
    }
);

export function ToggleTheme(props) {
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
        [currMode],
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

export function ToggleThemeButton() {
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