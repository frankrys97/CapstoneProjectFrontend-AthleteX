import { Col, Container, Row } from "react-bootstrap"
import NavbarHomePage from "../HomePage/NavbarHomePage"
import "./TeamPage.scss"
import SidebarTeamPage from "./SidebarTeamPage"

const TeamPage = () => {
    return (
        <div className="team-page" >
            <NavbarHomePage />
            <Container fluid>
                <Row>
            <SidebarTeamPage />



                    <Col md={11}>   
                    
                    prova
                    
                    
                                    </Col>

                </Row>
            </Container>


        </div>
    )
}

export default TeamPage