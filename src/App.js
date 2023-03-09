
import './App.scss';
import Add from './components/Add';
import Container from './components/Container';
import Header from './components/Header';
import RouterPath from './components/RouterPath';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Add/>
      <Container/>
    </div>
  )
}

export default App;
