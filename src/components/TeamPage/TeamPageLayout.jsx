import { Container, Row, Col } from "react-bootstrap";
import NavbarHomePage from "../HomePage/NavbarHomePage";
import SidebarTeamPage from "./SidebarTeamPage";
import "./TeamPage.scss";
import PropTypes from 'prop-types';


const TeamPageLayout = ({ children }) => {
  return (
    <div className="team-page-layout">
      <NavbarHomePage />
      <Container fluid>
        <Row className="d-flex justify-content-between">
          <SidebarTeamPage />
          <Col
            md={11}
            className="p-3 flex-grow-1 d-flex flex-column align-items-center right-side-container"
          >
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );

};

TeamPageLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default TeamPageLayout;


