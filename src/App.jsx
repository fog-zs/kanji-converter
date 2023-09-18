// import './App.css';
import KanjiConverter from './components/KanjiConverter';
import Container from '@mui/material/Container';
import { Typography, ThemeProvider, createTheme, Box, Grid, Button, CssBaseline } from '@mui/material';
import { useState } from 'react';
// const styles = {
//   paddingTop: "20px",
// };

// Light用のテーマ
const lightTheme = createTheme();

// Dark用のテーマ
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(true);
  // ダークモード切り替え
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={4} mb={4}>
          <Typography variant="h4" align="center">漢字转换</Typography>
        </Box>
        <KanjiConverter /><br />
        <Grid item xs={12} align="center">
          <Button onClick={toggleDarkMode}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Button>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
