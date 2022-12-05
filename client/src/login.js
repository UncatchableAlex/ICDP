import {Box, Stack, Button, TextField} from "@mui/material";
import {ReactComponent as Logo} from './hexes.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {HexagonOutlined, Person4Outlined} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import axios from "axios"

//axios.defaults.withCredentials = true;
export function LoginPage() {
    let [unState, unStateSet] = useState({helperText:"", val:"", color:"secondary"});
    let [pwState, pwStateSet] = useState({helperText:"", val:"", color:"secondary"});
    const handleChange = (e) => {
        const setter = e.target.id === "passwordTextField" ? pwStateSet : unStateSet;
        setter({helperText : "", val : e.target.value, color:"secondary"})
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
            variant= "outlined"
            helperText={pwState.helperText}
            color={pwState.color}
            margin="normal"
            sx={{width:"75%"}}
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            type="password"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={pwState.val}
            focused/>;

    const usernameTextField =
        <TextField
            id="usernameTextField"
            label="username"
            variant="outlined"
            helperText={unState.helperText}
            color={unState.color}
            margin="normal"
            sx={{width:"75%"}}
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={unState.val}
            focused/>;

    const submitLoginForm = () => {
        axios.post("/login", {}, {
            headers: {
                contentType: "application/json",
                authorization:unState.val+":"+pwState.val,
            },
            withCredentials: true,
            credentials: 'include', // Don't forget to specify this if you need cookies
        })
            .then(
                (res) => {
                    const mes = res.data.message;
                    console.log(mes)
                    if (res.data.accepted) {
                      //  window.location.replace("/")
                    } else {
                        console.log(mes);
                        if (mes === "user does not exist") {
                            unStateSet({helperText:mes, val:unState.val, color:"error"})
                        }
                        if (mes === "incorrect password") {
                            pwStateSet({helperText:mes, val:pwState.val, color:"error"})
                        }
                    }
                },
                (err) => {
                    console.log("caught an error");
                    console.log(err.headers);
                }
            )
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
                    <Button variant="outlined" startIcon={<HexagonOutlined />} onClick={submitLoginForm}>
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