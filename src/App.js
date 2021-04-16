import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MainPanelPage from './MatrixCalculator/MainPanel';
import MatrixAddition from './MatrixCalculator/Addition';
import MatrixMultiplication from './MatrixCalculator/Multiplication';
import MatrixTranspose from './MatrixCalculator/Transpose';
import MatrixDeterminant from './MatrixCalculator/Determinant';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <MainPanelPage/>
          </Route>

          <Route path='/addition'>
            <MatrixAddition/>
          </Route>
          
          <Route path='/multiplication'>
            <MatrixMultiplication/>
          </Route>

          <Route path='/transpose'>
            <MatrixTranspose/>
          </Route>

          <Route path='/determinant'>
            <MatrixDeterminant/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
