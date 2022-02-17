import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MovieProvider from './context/MovieProvider';
import MainPage from './pages/MainPage';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Details from './pages/Details';

export default function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ MainPage } />
          <Route path="/movies" exact component={ Movies } />
          <Route path="/series" exact component={ Series } />
          <Route path="/movies/:id" exact component={ Details } />
        </Switch>
      </BrowserRouter>
    </MovieProvider>
  );
}
