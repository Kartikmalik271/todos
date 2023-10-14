import MainPage from "./pages/mainPage";
import {
  Paper,
  Typography,
  Box} from '@mui/material';

function App() {
  return (
    <div className="App" style={{fontFamily:'poppins'}}>
      <Paper
      elevation={3}
      style={{
        padding: '20px',
        background: 'linear-gradient(45deg, #E57373 30%, #FFA07A 90%)',
        color: 'white',
        minHeight:'100vh'
      }}
    >
      <Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', }}>
            Todos Application
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', }}>
            Manage your tasks with ease
          </Typography>
          </Box>
          <MainPage/>
          
      </Paper>
    </div>
  );
}

export default App;
