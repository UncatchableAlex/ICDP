import TextField from '@mui/material/TextField';
import {Box, Stack, Button} from "@mui/material";
import {ReactComponent as Logo} from './hexes.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {HexagonOutlined, Person4Outlined} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import axios from "axios"


//const buffer = require("buffer")
//const pbkdf2 = require("pbkdf2")

export function LoginPage() {
    let [unVal, unSet] = useState("")
    let [pwVal, pwSet] = useState("")
    const handleChange = (e) => {
        const setter = e.target.id === "passwordTextField" ? pwSet : unSet;
        setter(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            submitLoginForm();
        }
    }
    const passwordTextField =
        <TextField
            id="passwordTextField"
            label="password"
            variant="outlined"
            color="secondary"
            margin="normal"
            sx={{width:"75%"}}
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            type="password"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={pwVal}
            focused/>

    const usernameTextField =
        <TextField
            id="usernameTextField"
            label="username"
            variant="outlined"
            color="secondary"
            margin="normal"
            sx={{width:"75%"}}
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={unVal}
            focused/>

    const submitLoginForm = () => {
        const json = {
                username: unVal,
                password: pwVal
            }
        axios.post("http://localhost:9000/test", json)
            .then(() => console.log("received"))
    };


    const theme = useTheme();
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{bgcolor: 'background.default', color:'text.primary'}}>
            <Stack direction="column" spacing={2} alignItems="center">
                <Logo stroke={theme.palette.primary.main}/>
                {usernameTextField}
                {passwordTextField}
                <Box height="1em"/>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button variant="outlined" startIcon={<HexagonOutlined />}>
                        Login
                    </Button>
                    <Button variant="outlined" startIcon={<Person4Outlined />}>
                        New User
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}