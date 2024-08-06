import "./style/custom.scss";
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiClient from "./utils/axiosConfig";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import JoinPage from "./components/JoinPage/JoinPage";
import CreateTeamPage from "./components/CreateTeamPage/CreateTeamPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import TeamPage from "./components/TeamPage/TeamPage";
import MembersTeamPage from "./components/TeamPage/MembersTeamPage";
import AddPlayerPage from "./components/TeamPage/AddPlayerPage";
import CreatePlayerPage from "./components/TeamPage/CreatePlayerPage";
import SettingsPageTeam from "./components/TeamPage/SettingsPageTeam";
import InvitePage from "./components/TeamPage/InvitePage";
import CalendarPage from "./components/TeamPage/CalendarPage";import moment from 'moment';
import 'moment/locale/it'; // Importa il locale italiano

moment.locale('it'); // Imposta il locale globale su italiano

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
        <Route path="/team/:teamId" element={<TeamPage />} />
        <Route path="/members" element={<MembersTeamPage />} />
        <Route path="/team/:teamName/add-member" element={<AddPlayerPage />} />
        <Route path="/team/:teamName/add-member/new" element={<CreatePlayerPage />} />
        <Route path="/team/:teamName/settings" element={<SettingsPageTeam />} />
        <Route path="/team/add-member/invite" element={<InvitePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
         
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
