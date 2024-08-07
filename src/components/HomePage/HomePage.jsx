import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';
import NavbarHomePage from './NavbarHomePage';
import apiClient from '../../utils/axiosConfig';
import '../../style/HomePage/HomePage.scss';
import iconaScudetto from "../../assets/HomePage/Icona-scudetto.svg";
import iconaMaglia from "../../assets/HomePage/Icona-maglia.svg";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlineLocalPostOffice } from 'react-icons/md';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiSoccerBallThin } from 'react-icons/pi';
import { cancelTeamOfPlayer, fetchTeamEvents, getComponentsOfTeam, setTeam } from '../../redux/actions';

const Homepage = () => {
  const user = useSelector((state) => state.authenticate.user);
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (team) => {
    setSelectedTeam(team);
    setShow(true);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        if (user.userType === 'COACH') {
          const response = await apiClient.get('/teams');
          setLoading(false);

          setTeams(response.data.content);
        } else if (user.userType === 'PLAYER' && user.team) {
          const response = await apiClient.get(`/teams/${user.team.id}`);

          setLoading(false);
          setTeams([response.data]);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching teams", error);
      }
    };

    fetchTeams();
  }, [user, refresh, dispatch]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleTeamSettings = (teamId) => {
    console.log(`Naviga alle impostazioni per la squadra con ID: ${teamId}`);
  };

  const deleteTeamFetch = async () => {
    try {
      const response = await apiClient.delete(`/teams/${selectedTeam.id}`);
      console.log(response.data);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const leaveTeamFetch = async () => {
    try {
      const response = await apiClient.patch(`/teams/me/leave`);
      console.log(response.data);
      dispatch(cancelTeamOfPlayer());
    } catch (error) {
      console.error(error);
    }
  };

  const handleTeamDelete = () => {
    if (selectedTeam) {
      console.log(`Elimina squadra con ID: ${selectedTeam.id}`);
      deleteTeamFetch();
      handleClose(); 
    }
  };

  const handleTeamLeave = () => {
    if (selectedTeam) {
      console.log(`Lascia squadra con ID: ${selectedTeam.id}`);
      leaveTeamFetch();
      handleClose(); 
    }
  };

  const handleTeamPage = async (teamId) => {
    try {
      const team = await apiClient.get(`/teams/${teamId}`);
      dispatch(setTeam(team.data));
      dispatch(getComponentsOfTeam(teamId));
      dispatch(fetchTeamEvents(teamId));
      navigate(`/team/${teamId}`);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className='homepage'>
      <NavbarHomePage />
      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100">
<div className="honeycomb">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
        </div>
      )}
          { !loading &&  user.userType === 'COACH' && teams && teams.length === 0 && (
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
                    <Button variant="secondary" size='sm' className='px-3 py-2 btn-create border-0' onClick={() => handleNavigate('/team/create')}>Creare una nuova squadra</Button>
                  </Card.Body>
                </Card>
                <p className="text-center mt-5"><IoIosInformationCircleOutline /> Per vivere al meglio l&apos;esperienza con AthleteX ti consigliamo di creare una squadra al più presto!
                </p>
              </Col>
          </Row>
          </Container>
          )}

      { !loading && user.userType === 'COACH' && teams && teams.length > 0 && (
        <Container className='mt-5 main-content-profile-coach-teams'> 
          <Row className="w-100 h-100 g-3 d-flex justify-content-start gy-5">
            <Col xs={12} >
              <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                <h3 className="text-start mt-2">Le mie squadre</h3>
                <Button variant="secondary" size='sm' className='px-3 py-2 border-0 btn-create d-none d-md-block' onClick={() => handleNavigate('/team/create')}>Crea una nuova squadra</Button>
              </div>

              <hr />
            </Col>

            {teams.map((team) => {
              const formattedDate = new Date(team.creationDate).toLocaleDateString('it-IT');
              const isDefaultAvatar = !team?.avatar || team?.avatar?.includes('https://ui-avatars.com/api/');


              return (
                <Col key={team.id} xs={12} sm={6} md={4} className="d-flex">
                  <Card className="mb-3 team-card shadow-sm border-0 d-flex flex-column equal-height w-100 h-100 ">
                    <Card.Body className="d-flex flex-column justify-content-start">
                      <div className="team-avatar">

                      <img src={isDefaultAvatar ? iconaScudetto : team.avatar} alt={`${team.name} logo`} style={{width: '100%', height: '100%', objectFit: 'contain' }} className={` ${!isDefaultAvatar ? 'default-avatar' : ''}`} />
                      </div>
                      <div className=' d-flex justify-content-end align-items-center gap-2 align-self-end'>
                        <MdOutlineLocalPostOffice className='fs-4' as={NavLink} to={"/team/message"} style={{cursor: 'pointer'}}/>
                        <Dropdown as={ButtonGroup} >
                          <Dropdown.Toggle variant="transparent" className="py-1 px-2 border-1 dropstyle">
                            <BsThreeDots className="fs-4" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={() => handleTeamSettings(team.id)}>
                              Impostazioni
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleShow(team)} className="text-danger">
                              Elimina squadra
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div onClick={() => handleTeamPage(team.id, team.name)} className="text-decoration-none w-100 text-secondary" style={{ cursor: 'pointer' }}> 
                        <Card.Title className="mt-3 text-nowrap overflow-auto">{team.name}</Card.Title>
                        <Card.Text className='text-muted d-flex align-items-center gap-2'> <IoCalendarOutline />
                          <span>{formattedDate}</span>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
            <Button variant="secondary" size='sm' className='px-3 py-2 border-0 btn-create d-block d-md-none mb-2' onClick={() => handleNavigate('/team/create')}>Crea una nuova squadra</Button>
          </Row>
          
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminazione squadra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTeam ? `Sei sicuro di voler eliminare la squadra: ${selectedTeam.name}?` : 'Seleziona una squadra per eliminarla.'}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" size='sm' onClick={handleClose}>
                Chiudi
              </Button>
              <Button variant="primary" size='sm' onClick={handleTeamDelete}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}

      { !loading && user.userType === 'PLAYER' && !user.team && (
       <Container fluid className="main-content d-flex align-items-center justify-content-center text-secondary ">
       <Row className="w-100 gap-3">
             <Col xs={12}>
               <div className='d-flex flex-column align-items-center mb-4'>
                 <h3 className="text-center">Non fai parte di nessuna squadra ... ancora!</h3>
                 <p>Per utilizzare AthleteX, devi unirti ad una squadra.</p>
               </div>
             </Col>
             <Col md={6} className='mx-auto'>
               <Card className="text-center p-3 mx-auto border-0 text-secondary rounded-0 card-create">
                 <Card.Body className='d-flex flex-column align-items-center gap-3'>
                   <img src={iconaMaglia} alt="Icona Maglia" style={{ width: '4rem', height: '4rem' }} />     
                   <Card.Title>Unisciti alla tua nuova squadra</Card.Title>
                   <Card.Text>
                     Pianifica ed amministra la tua squadra a 360°
                   </Card.Text>
                   <Button variant="secondary" size='sm' className='px-3 py-2 btn-create border-0 mt-2' onClick={() => handleNavigate('/team/join')}>Unisciti alla squadra</Button>
                 </Card.Body>
               </Card>
               <p className="text-center mt-3"><IoIosInformationCircleOutline /> Per vivere al meglio l&apos;esperienza con AthleteX ti consigliamo di unirti ad una squadra al più presto!
               </p>
             </Col>
         </Row>
         </Container>
      )}

      {!loading && user.userType === 'PLAYER' && user.team && (
         <Container className='mt-3'> 
         <Row className="w-100 h-100 g-3 d-flex justify-content-start gy-5">
           <Col xs={12} className='mx-auto' >
             <div className='d-flex justify-content-center align-items-center'>
               <h3 className="text-start mt-2">La mia squadra</h3>
             </div>

           </Col>
             <hr className='m-1' />

           {teams.map((team) => {
             return (
              <Col md={6} key={team.id} className='mx-auto'>
               <Card className="text-center p-3 mx-auto border-0 text-secondary rounded-0 card-create position-relative">
                 <Card.Body className='d-flex flex-column align-items-center gap-3'>
                   <img src={team.avatar} alt="Logo squadra" style={{ width: '4rem', height: '5rem' }} />    
                   <div className=' d-flex justify-content-end align-items-center gap-2 position-absolute' style={{top: '10px', right: '10px'}}>
                        <MdOutlineLocalPostOffice className='fs-4' as={NavLink} to={"/team/message"} style={{cursor: 'pointer'}}/>
                        <Dropdown as={ButtonGroup} >
                          <Dropdown.Toggle variant="transparent" className="py-1 px-2 border-1 dropstyle">
                            <BsThreeDots className="fs-4" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={() => handleShow(team)} className="text-danger">
                              Lascia la squadra
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div> 
                   <Card.Title className='d-flex align-items-center gap-1 mt-2'> <PiSoccerBallThin  />
<span>{team.name}</span>                   </Card.Title>
                   <Card.Text>
                     Non perderti nessun aggionamento!
                   </Card.Text>
                   <Button variant="secondary" size='sm' className='px-3 py-2 btn-create border-0 mt-2' onClick={() => handleNavigate('/team/' + team.id)}>Vai alla squadra</Button>
                 </Card.Body>
               </Card>
               <p className="text-center mt-5"><IoIosInformationCircleOutline /> Grazie ad AthleteX, sarai in grado di far parte di una squadra in modo smart e non perderti più alcuna informazione!
               </p>
             </Col>
             );
           })}
         </Row>
         
         <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>Eliminazione squadra</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             {selectedTeam ? `Sei sicuro di voler lasciare la squadra: ${selectedTeam.name}?` : 'Seleziona una squadra per lascire.'}
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" size='sm' onClick={handleClose}>
               Chiudi
             </Button>
             <Button variant="primary" size='sm' onClick={handleTeamLeave}>
               Abbandona
             </Button>
           </Modal.Footer>
         </Modal>
       </Container>
      )}
    </div>
  );
};

export default Homepage;
