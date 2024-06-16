import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <h1>Game Board</h1>
        <h2>Turn off all the lights to win!</h2>
        <Board nrows={5} ncols={5} chanceLightStartsOn={20}/>
      </div>
  );
}

export default App;
