import TextField from '@mui/material/TextField';
import {Box, Stack, Button} from "@mui/material";
import {ReactComponent as Logo} from './hexes.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {HexagonOutlined, Person4Outlined} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";


function UsernameTextField() {
    return (
        <TextField
            id="usernameTextField"
            label="username"
            variant="filled"
            color="secondary"
            margin="normal"
            sx={{width:"75%"}}
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            focused/>
    );
}

function PasswordTextField() {
    return (
        <TextField
            id="passwordTextField"
            label="password"
            variant="filled"
            color="secondary"
            margin="normal"
            sx={{width:"75%"}}
            size="small"
            inputProps={{style: {fontSize: 20, textAlign: "center"}}}
            type="password"
            focused/>
    );
}
export function LoginPage() {
    const theme = useTheme();
    setInterval(() => {console.log(theme.palette.mode)}, 100);
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{bgcolor: 'background.default', color:'text.primary'}}>
            <Stack direction="column" spacing={2} alignItems="center">
                <Logo stroke={theme.palette.primary.main}/>
                <UsernameTextField />
                <PasswordTextField/>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button variant="outlined" endIcon={<HexagonOutlined />}>
                        Login
                    </Button>
                    <Button variant="outlined" endIcon={<Person4Outlined />}>
                        New User
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}