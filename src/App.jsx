import './App.css';
import KanjiConverter from './components/KanjiConverter';
import Container from '@mui/material/Container';
const styles = {
    paddingTop: "20px",    
};

function App() {
  return (
    <Container maxWidth="sm" style={styles}>
      <h1>Kanji Converter</h1>
      <KanjiConverter />   
    </Container> 
  );
}

export default App;
