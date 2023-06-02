import "./App.css";
import { Routes, Route } from "react-router-dom";
import { GamePage, LoginPage, RegisterPage, DoublerPage} from "./pages";
import UserContext from "./components/UserContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState([])
  return (
    <>
      
        <UserContext.Provider value={{ user, setUser}}>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/:username/Noro's_Poker_Club" element={<GamePage/>} />
              <Route path="/:username/Noro's_Poker_Club/DoublerPage" element={<DoublerPage/>} />
          </Routes>
        </UserContext.Provider>
    </>
  );
}

export default App;
