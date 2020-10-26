import React from 'react';
import { Container } from "@material-ui/core";
import { AppHeader } from "./shared/AppHeader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { MemoryGame } from './game/MemoryGame';
import { Home } from './home/Home';
import { NoMatch404 } from './shared/NotFound404';
import { Result } from './game/result/Result';

function App() {
  return (
    <Router>
      <AppHeader></AppHeader>
      <Container fixed className="padding-t-15 container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game/result/:gameId">
            <Result />
          </Route>
          <Route path="/game">
            <MemoryGame />
          </Route>
          <Route path="*">
            <NoMatch404 />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
