import React from "react"
import { Navigation } from "./Navigation"
import { Header } from "./Header"
import { Popular } from "./Popular"
import { Trailers } from "./Trailers"
import { TopRated } from "./TopRated"
import { Trending } from "./Trending"
import { Footer } from "./Footer"
function App() {
  return (
    <>
      <Navigation/>
      <Header/>
      <Popular/> 
      <Trailers/> 
      <TopRated/>
      <Trending />
      <Footer />
    </>
  )
}

export default App
