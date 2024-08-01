import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "../../style/HomePage/HomePage.scss";
import NavbarHomePage from "../HomePage/NavbarHomePage";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BsShieldLock } from "react-icons/bs";
import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { recognizeUser } from "../../redux/actions";

const JoinPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        teamId: ''
    })

    const handleNavigate = (path) => {
        navigate(path);
    };

    const fetchUser = async () => {
        try {
            const response = await apiClient.get(`http://localhost:3001/auth/me`);
            dispatch(recognizeUser(response.data));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchJoinToTeam = async () => {
        try {
            const response = await apiClient.patch(`http://localhost:3001/teams/me`, formData);
            console.log(response.data);
            fetchUser();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJoinToTeam();
        handleNavigate(`/teams/${formData.teamId}`);
        setFormData({
            teamId: ''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    return (
        <div className="homepage">
            <NavbarHomePage />
            <Container fluid className="main-content d-flex align-items-center justify-content-center text-secondary mt-2 ">
        <Row className="w-100 gap-3">
              <Col xs={12}>
                <div className='d-flex flex-column align-items-center mb-4 gap-3'>
                  <h3 className="text-center">Unisciti ad una squadra</h3>
                  <p>In questa sezione puoi unirti ad una squadra attraverso il codice segreto che ti è stato fornito!</p>
                </div>
              </Col>
              <Col md={6} className='mx-auto'>
                <Card className="text-center p-3 mx-auto border-0 text-secondary rounded-0 card-create" >
                  <Card.Body className='d-flex flex-column justify-content-start align-items-center gap-3'>
                  <BsShieldLock style={{ width: '4rem', height: '4rem' }} />
                  <Card.Title>Inserisci il codice di autenticazione</Card.Title>
                        <div>

                      
                        <Form onSubmit={handleSubmit}>
                        <Form.Label>Codice di autenticazione</Form.Label>
                        <Form.Group className="mb-3">
                                <Form.Control 
                                type="text" 
                                placeholder="Inserisci il codice"
                                value={formData.teamId}
                                name="teamId"
                                onChange={handleChange} />
                            </Form.Group>
                        </Form>
                        </div>
                    <Button variant="secondary" size='sm' className='px-3 py-2 btn-create border-0' onClick={handleSubmit} >Unisciti al team</Button>
                  </Card.Body>
                </Card>
                <p className="text-center mt-5"><IoIosInformationCircleOutline /> Per vivere al meglio l&apos;esperienza con AthleteX ti consigliamo di unirti ad una squadra al più presto!
                </p>
              </Col>
          </Row>
          </Container>
        </div>
    );
};

export default JoinPage;