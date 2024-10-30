import React from "react";
import { Navigation } from "./Navigation";
import { Header } from "./Header";
import { Popular } from "./Popular";
import { Trailers } from "./Trailers";
import { TopRated } from "./TopRated";
import { Trending } from "./Trending";
import { Footer } from "./Footer";
import { MovieDetails } from "./MovieDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Actors } from "./Actors";
function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Popular />
              <Trailers />
              <TopRated />
              <Trending />
            </>
          }
        />
        <Route
          path="/:type/:id"
          element={
            <>
              <MovieDetails />
              <Actors />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
