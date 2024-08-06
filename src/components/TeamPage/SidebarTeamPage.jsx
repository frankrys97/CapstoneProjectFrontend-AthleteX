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
      className="sidebar-team-page p-0"
      style={{ backgroundColor: team ? `${team.primaryColor}` : "#161832" }}
    >
      <div className="d-flex justify-content-start align-items-center flex-md-column gap-3 py-md-3 h-100 ">
        <div
          className={`sidebar-item-wrapper ${
            location.pathname === `/team/${team.id}` ? "active" : ""
          }`}
        >
          <Link to={`/team/${team.id}`} className="w-100 h-100 d-flex align-items-center justify-content-center">
            <img
              src={team.avatar ? team.avatar : iconaProfilo}
              alt="logo squadra"
              className="img-logo"
             
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
          <Link to="/calendar" className="w-100 h-100 d-flex align-items-center justify-content-center">
            <IoCalendarOutline
              className="fs-4"
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
            location.pathname === "/members" ? "active" : location.pathname === `/team/add-member/invite` ? "active" : location.pathname === `/team/${team.name}/add-member` ? "active" : ""
          }`}
        >
          <Link to="/members" className=" w-100 h-100 d-flex align-items-center justify-content-center">
            <IoPeopleOutline
              className="fs-4"
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
            location.pathname === `/team/${team.name}/settings` ? "active" : ""
          }`}
        >
          <Link to={`/team/${team.name}/settings`} className=" w-100 h-100 d-flex align-items-center justify-content-center">
            <IoSettingsOutline
              className="fs-4"
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
            className=" w-100 h-100 d-flex align-items-center justify-content-center"
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
