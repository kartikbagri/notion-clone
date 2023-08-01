import { useState } from "react";
import "./App.css";
import Pages from "./components/Pages";
import CurrentPage from "./components/CurrentPage";

function App() {

  return (
    <div className="App">
      <Pages />
      <CurrentPage />
    </div>
  );
}

export default App;
