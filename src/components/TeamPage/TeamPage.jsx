import { Col, Container, Row } from "react-bootstrap"
import NavbarHomePage from "../HomePage/NavbarHomePage"
import "./TeamPage.scss"
import SidebarTeamPage from "./SidebarTeamPage"

const TeamPage = () => {
    return (
        <div className="team-page" >
            <NavbarHomePage />
            <SidebarTeamPage />
            <Container fluid>
                <Row className="w-100">



                    <Col className="right-side-team-page p-4">   
                    
                    prova
                    
                    
                                    </Col>

                </Row>
            </Container>


        </div>
    )
}

export default TeamPage