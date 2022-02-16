import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import fetchMovie from './services/MovieAPI';

export default function App() {
  fetchMovie();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ MainPage } />
      </Switch>
    </BrowserRouter>
  );
}
