import "./App.css";
import { Routes, Route } from "react-router-dom";
import { GamePage, LoginPage, RegisterPage } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:username/Noro's_Poker_Club" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
