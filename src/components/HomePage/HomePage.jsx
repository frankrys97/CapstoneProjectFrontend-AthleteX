import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import NavbarHomePage from './NavbarHomePage';
import apiClient from '../../utils/axiosConfig';
import '../../style/HomePage/HomePage.scss';
import iconaScudetto from "../../assets/HomePage/Icona-scudetto.svg";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Homepage = () => {
  const user = useSelector((state) => state.authenticate.user);
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (user.userType === 'COACH') {
          const response = await apiClient.get('/teams');
          setTeams(response.data.content);
        } else if (user.userType === 'PLAYER' && user.team) {
          const response = await apiClient.get(`/teams/${user.team}`);
          setTeams([response.data]);
        }
      } catch (error) {
        console.error("Error fetching teams", error);
      }
    };

    fetchTeams();
  }, [user]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleTeamSettings = (teamId) => {
    console.log(`Naviga alle impostazioni per la squadra con ID: ${teamId}`);
  };

  const handleTeamDelete = (teamId) => {
    console.log(`Elimina squadra con ID: ${teamId}`);
  };

  return (
    <div className='homepage'>
      <NavbarHomePage />
          {user.userType === 'COACH' && teams && teams.length === 0 && (
      <Container fluid className="main-content d-flex align-items-center justify-content-center text-secondary mt-2 ">
        <Row className="w-100 gap-3">
              <Col xs={12}>
                <div className='d-flex flex-column align-items-center mb-4 gap-3'>
                  <h3 className="text-center">Non gestisci nessuna squadra ... ancora!</h3>
                  <p>Per utilizzare AthleteX, devi creare una squadra.</p>
                </div>
              </Col>
              <Col md={6} className='mx-auto'>
                <Card className="text-center p-3 mx-auto border-0 text-secondary rounded-0 card-create" onClick={() => handleNavigate('/team/create')}>
                  <Card.Body className='d-flex flex-column align-items-center gap-3'>
                    <img src={iconaScudetto} alt="icona scudetto" style={{ width: '4rem', height: '4rem' }} />     
                    <Card.Title>Gestisci la tua prima squadra</Card.Title>
                    <Card.Text>
                      Pianifica ed amministra la tua squadra a 360°
                    </Card.Text>
                    <Button variant="secondary" size='sm' className='px-3 py-2 btn-create border-0'>Creare una nuova squadra</Button>
                  </Card.Body>
                </Card>
                <p className="text-center mt-5"><IoIosInformationCircleOutline /> Per vivere al meglio l&apos;esperienza con AthleteX ti consigliamo di creare una squadra al più presto!
                </p>
              </Col>
          </Row>
          </Container>
          )}

          {user.userType === 'COACH' && teams && teams.length > 0 && (
            <Container className='mt-3'> 
            <Row className="w-100 h-100 gap-3 d-flex ">
                <div className='d-flex justify-content-between align-items-center'>
                <h3 className="text-start mt-2">Le mie squadre</h3>
                <Button>Crea una nuova squadra</Button>
                </div>
             
                <hr />

              {teams.map((team) => (
                <Col key={team.id} md={4}>
                  <Card className="mb-3 team-card shadow-sm border-0 d-flex flex-column">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between align-items-start">
                        <img src={team.avatar} alt={`${team.name} logo`} className="team-avatar" />
                        <Dropdown as={ButtonGroup}>
                          <Dropdown.Toggle variant="light" className="p-0 shadow-none">
                            <BsThreeDotsVertical />
                          </Dropdown.Toggle>

                          <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={() => handleTeamSettings(team.id)}>
                              Impostazioni
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleTeamDelete(team.id)} className="text-danger">
                              Elimina squadra
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Card.Title className="mt-3">{team.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            </Container>
          )}

          {user.userType === 'PLAYER' && !user.team && (
            <>
              <Col xs={12}>
                <h1 className="text-center mb-4">Non fai parte di nessuna squadra ... ancora!</h1>
              </Col>
              <Col>
                <Card className="text-center" onClick={() => handleNavigate('/team/join')} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <i className="fa fa-futbol-o" style={{ fontSize: '2rem' }}></i>
                    <Card.Title>Entra a far parte della tua prima squadra</Card.Title>
                    <Card.Text>
                      Per utilizzare AthleteX, devi entrare a far parte di una squadra.
                    </Card.Text>
                    <Button variant="primary">Unisciti ad una nuova squadra</Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        
    </div>
  );
};

export default Homepage;
