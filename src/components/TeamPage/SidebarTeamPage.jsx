import { useSelector } from "react-redux";
import "./TeamPage.scss";
import {
  IoCalendarOutline,
  IoPeopleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import iconaProfilo from "../../assets/HomePage/Icona-profilo.svg";
import tinycolor from "tinycolor2";
import { Col } from "react-bootstrap";

const SidebarTeamPage = () => {
  const team = useSelector((state) => state.team.content);
  const user = useSelector((state) => state.authenticate.user);
  const location = useLocation();

  const isDefaultAvatar =
    !user?.avatar || user?.avatar?.includes("https://ui-avatars.com/api/");

  const getTextColor = (backgroundColor) => {
    const color = tinycolor(backgroundColor);
    const luminance = color.getLuminance();
    return luminance > 0.5 ? "#161832" : "#ffffff";
  };

  return (
    <Col 
      md={1}
      className="sidebar-team-page"
      style={{ backgroundColor: team ? `${team.primaryColor}` : "#161832" }}
    >
      <div className="d-flex flex-column align-items-center gap-3 py-3">
        <div
          className={`sidebar-item-wrapper ${
            location.pathname === `/team/${team.name}` ? "active" : ""
          }`}
        >
          <Link to={`/team/${team.name}`} className="w-100 h-100 p-1">
            <img
              src={team.avatar ? team.avatar : iconaProfilo}
              alt="logo squadra"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
          </Link>
          <div
            className="popover-like"
            style={{
              backgroundColor: team ? `${team.primaryColor}` : "#161832",
            }}
          >
            <span
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            >
              Team
            </span>
          </div>
        </div>

        <div
          className={`sidebar-item-wrapper ${
            location.pathname === "/calendar" ? "active" : ""
          }`}
        >
          <Link to="/calendar" className="text-decoration-none w-100 h-100">
            <IoCalendarOutline
              className="w-100 h-100 p-2"
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            />
          </Link>
          <div
            className="popover-like"
            style={{
              backgroundColor: team ? `${team.primaryColor}` : "#161832",
            }}
          >
            <span
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            >
              Calendario
            </span>
          </div>
        </div>

        <div
          className={`sidebar-item-wrapper ${
            location.pathname === "/members" ? "active" : ""
          }`}
        >
          <Link to="/members" className="text-decoration-none w-100 h-100">
            <IoPeopleOutline
              className="w-100 h-100 p-2"
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            />
          </Link>
          <div
            className="popover-like"
            style={{
              backgroundColor: team ? `${team.primaryColor}` : "#161832",
            }}
          >
            <span
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            >
              Rosa
            </span>
          </div>
        </div>

        <div
          className={`sidebar-item-wrapper ${
            location.pathname === "/settingsTeam" ? "active" : ""
          }`}
        >
          <Link to="/settingsTeam" className="text-decoration-none w-100 h-100">
            <IoSettingsOutline
              className="w-100 h-100 p-2"
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            />
          </Link>
          <div
            className="popover-like"
            style={{
              backgroundColor: team ? `${team.primaryColor}` : "#161832",
            }}
          >
            <span
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            >
              Preferenze
            </span>
          </div>
        </div>

        <div
          className={`sidebar-item-wrapper ${
            location.pathname === "/account" ? "active" : ""
          }`}
        >
          <Link
            to="/account"
            className="w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <img
              src={isDefaultAvatar ? iconaProfilo : user.avatar}
              alt="Icona profilo"
              className="rounded-circle"
              style={{ width: "25px", height: "25px", objectFit: "cover" }}
            />
          </Link>
          <div
            className="popover-like"
            style={{
              backgroundColor: team ? `${team.primaryColor}` : "#161832",
            }}
          >
            <span
              style={{
                color: getTextColor(team ? `${team.primaryColor}` : "#161832"),
              }}
            >
              Account
            </span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SidebarTeamPage;
