// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { MandlebrotContainer } from "./components/MandlebrotContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Web Assembly Mandelbrot Set Using Typescript</p>
        <a
          className="App-link"
          href="https://github.com/Dima11235813/wasm-mandelbrot-typescript"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Github Page
        </a>
      </header>
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">WebAssembly Mandelbrot Set</h1>
        </div>
        <MandlebrotContainer></MandlebrotContainer>
      </div>
    </div>
  );
}

export default App;
