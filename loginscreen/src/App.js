import './App.css';
import TextField from '@mui/material/TextField';
import {Box} from "@mui/material";
import logo from './hexes.svg';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Box sx={{top:"10%", height:"50%", position:"absolute"}}>
              <img src={logo} height="100%" width="100%"/>
          </Box>
          <Box component="form" sx={{height:"30%", width:"30%", bottom:"10%"}} position="absolute">
              <TextField id="outlined-basic" label="Username" color="secondary" sx={{marginBottom: "1em"}} focused/>
              <TextField id="outlined-basic" label="Password" color="secondary" focused/>
          </Box>
      </header>
    </div>
  );
}

export default App;
