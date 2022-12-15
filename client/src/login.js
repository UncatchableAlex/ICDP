import {Box, Stack, Button, TextField, InputAdornment, IconButton, Icon} from "@mui/material";
import {ReactComponent as Logo} from './hexes.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css"
import {
    HexagonOutlined,
    Person4Outlined,
    KeyboardDoubleArrowLeftOutlined,
    PersonAddOutlined, VisibilityOutlined, VisibilityOffOutlined
} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";

import axios from "axios"

/*
TODO:
- Oauth
- cool animations
 */

//axios.defaults.withCredentials = true;
export function LoginPage() {
    const theme = useTheme();
    const initialState = {helperText: " ", val: "", color: "secondary"};
    let [unState, unStateSet] = useState(initialState);
    let [pwState, pwStateSet] = useState(initialState);
    let [emailState, emailStateSet] = useState(initialState);
    let [hideEmail, hideEmailSet] = useState(true);
    let  [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    useEffect(() => {
            unStateSet(initialState);
            pwStateSet(initialState);
            emailStateSet(initialState);
        },
        [hideEmail]);

    const handleChange = (e) => {
        const setters = {
            "passwordTextField" : pwStateSet,
            "usernameTextField" : unStateSet,
            "emailTextField" : emailStateSet
        }
        setters[e.target.id]({helperText: " ", val: e.target.value, color: "secondary"})
    }
    const handleKeyDown = (e) => {
        if (e.code === "Enter" && hideEmail) {
            postLogin();
        }
        if (e.code === "Enter" && !hideEmail) {
            postNewUser();
        }

    }
    const passwordTextField =
        <TextField
            id="passwordTextField"
            label="password"
            variant="outlined"
            helperText={pwState.helperText}
            color={pwState.color}
            margin="normal"
            sx={{width: "100%"}}
            style={{marginTop:"10px"}}
            autoComplete={hideEmail ? "password" : "new-password"}
            size="small"
            // password visibility borrowed from Jap Mul (https://stackoverflow.com/a/60391397)
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            type={showPassword ? "text" : "password"}
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
            sx={{width: "100%"}}
            style={{marginTop:"10px"}}
            autoComplete="username email"
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Icon color="secondary">
                            <HexagonOutlined />
                        </Icon>
                    </InputAdornment>
                )
            }}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={unState.val}
            focused/>;

    const emailTextField =
        <TextField
            id="emailTextField"
            label="email"
            variant="outlined"
            helperText={emailState.helperText}
            color={emailState.color}
            margin="normal"
            sx={{width: "100%"}}
            autoComplete="email"
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Icon color="secondary">
                            <HexagonOutlined />
                        </Icon>
                    </InputAdornment>
                )
            }}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={emailState.val}
            focused/>;

    const postLogin = () => {
        axios.post("/login", {}, {
            headers: {
                contentType: "application/json",
                authorization: unState.val + ":" + pwState.val,
            },
            // withCredentials: true,
            credentials: 'include', // enable cookies
        }).then((res) => {
                const mes = res.data.message;
                console.log(mes)
                if (res.data.accepted) {
                    window.location.replace("http://localhost:9000")
                } else {
                    console.log(mes);
                    if (mes === "user does not exist") {
                        unStateSet({helperText: mes, val: unState.val, color: "error"})
                    }
                    if (mes === "incorrect password") {
                        pwStateSet({helperText: mes, val: pwState.val, color: "error"})
                    }
                }
            },
            (err) => {
                console.log("caught an error");
                console.log(err.headers);
            }
        )
    };

    const postNewUser = () => {
        const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailState.val);
        const pwHasNums = pwState.val.match(/[0-9]/) != null
        const pwHasUpperCase = pwState.val.match(/[A-Z]/) != null
        const normalUserName = /^[A-Za-z0-9]+$/.test(unState.val)

        let hasProblems = false;
        if (!isEmail) {
            emailStateSet({helperText: " invalid email", val: emailState.val, color: "error"});
            hasProblems = true;
        }

        if (pwState.val.length < 8) {
            pwStateSet({helperText: " too short (8 characters min)", val: pwState.val, color: "error"});
            hasProblems = true;
        }
        else if (!pwHasNums) {
            pwStateSet({helperText: " needs numbers", val: pwState.val, color: "error"});
            hasProblems = true;
        }
        else if (!pwHasUpperCase) {
            pwStateSet({helperText: " needs upper case", val: pwState.val, color: "error"});
            hasProblems = true;
        }

        if (unState.val.length === 0) {
            unStateSet({helperText: " username is empty", val: unState.val, color: "error"});
            hasProblems = true;
        }
        if (!normalUserName) {
            unStateSet({helperText: " no weird characters", val: unState.val, color: "error"});
            hasProblems = true;
        }
        if (unState.val.length > 20) {
            unStateSet({helperText: "20 character limit", val: unState.val, color: "error"})
            hasProblems = true;
        }
        if (emailState.val.length > 50) {
            emailStateSet({helperText: "50 character limit", val: unState.val, color: "error"})
            hasProblems = true;
        }
        if (hasProblems) {
            return;
        }
        axios.post("/login/new-user", {
            email: emailState.val,
            username: unState.val,
            password: pwState.val
        }, {
            headers: {
                contentType: "application/json"
            }
        }).then(res => {
            if (!res.data.accepted) {
                if (res.data.message === "email already has account registered") {
                    emailStateSet({helperText: res.data.message, val: emailState.val, color: "error"});
                } else {
                    unStateSet({helperText: res.data.message, val: unState.val, color: "error"});
                }
            } else {
                window.location.replace("http://localhost:9000")
            }
        });
    }

    const loginButtons =
        <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" startIcon={<HexagonOutlined/>} onClick={postLogin}>
                Login
            </Button>
            <Button variant="outlined" startIcon={<Person4Outlined/>} onClick={() => hideEmailSet(false)}>
                New User
            </Button>
        </Stack>

    const newUserButtons =
        <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" startIcon={<KeyboardDoubleArrowLeftOutlined/>}
                    onClick={() => hideEmailSet(true)}>
                back
            </Button>
            <Button variant="outlined" startIcon={<PersonAddOutlined/>}
                    onClick={postNewUser}>
                register
            </Button>
        </Stack>


    return (
        <Box display="flex" justifyContent="center" alignItems="start" minHeight="100vh"
             sx={{bgcolor: 'background.default', color: 'text.primary'}}>
            <Stack direction="column" spacing={1} alignItems="center" marginTop="20vh">
                <Box minHeight="35vh" minWidth="35vh">
                    <Logo stroke={theme.palette.primary.main}/>
                </Box>
                {!hideEmail && emailTextField}
                {usernameTextField}
                {passwordTextField}
                {hideEmail ? loginButtons : newUserButtons}
            </Stack>
        </Box>

    );
}