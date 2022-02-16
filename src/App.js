import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MovieProvider from './context/MovieProvider';
import MainPage from './pages/MainPage';
import Movies from './pages/Movies';

export default function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ MainPage } />
          <Route path="/movies" exact component={ Movies } />
        </Switch>
      </BrowserRouter>
    </MovieProvider>
  );
}
