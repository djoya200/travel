import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Title from './components/Title'
import Nav from './components/Nav'
import Home from './components/Home'
import ListOfDestinations from './components/ListOfDestinations'
import AddNewDestination from './components/AddNewDestination'
import PlacesBeen from './components/PlacesBeen';

function App() {
  return (
    <Router>
      <div className="App">
        <Title />
        <Nav />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/newDestination" component={AddNewDestination} />
          <Route path="/futureDestinations" component={ListOfDestinations} />
          <Route path="/placesbeen" component={PlacesBeen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
