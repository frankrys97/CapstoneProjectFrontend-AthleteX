import "./style/custom.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiClient from "./utils/axiosConfig";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import JoinPage from "./components/JoinPage/JoinPage";
import CreateTeamPage from "./components/CreateTeamPage/CreateTeamPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  console.log(apiClient); 

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/team/join" element={<JoinPage />} />
        <Route path="/team/create" element={<CreateTeamPage />} />
        <Route path="/account" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
