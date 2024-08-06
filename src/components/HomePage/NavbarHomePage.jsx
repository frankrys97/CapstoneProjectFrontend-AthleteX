import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa';
import logo from "../../assets/Esecutivi/Logo/svg/AthleteX - colore 4.svg";
import { AiOutlinePoweroff, AiOutlineUser } from 'react-icons/ai';
import apiClient from '../../utils/axiosConfig';
import { logout } from '../../redux/actions/index.js';
import iconaProfilo from "../../assets/HomePage/Icona-profilo.svg";
import "../../style/HomePage/HomePage.scss";
import { RiTeamLine } from 'react-icons/ri';


const NavbarHomePage = () => {
  const user = useSelector((state) => state.authenticate.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchLogout = async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      console.log(response.data);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    fetchLogout();
  };

  const isDefaultAvatar = !user?.avatar || user?.avatar?.includes('https://ui-avatars.com/api/');

  return (
    <Navbar bg="white">
      <Container className='d-flex align-items-center justify-content-between'>
        <Navbar.Brand as={NavLink} to={"/homepage"}>
          <img
            src={logo}
            height="20"
            alt="Logo"
          />
        </Navbar.Brand>
          <Nav>
            <Nav.Link href="#notifications" className="d-flex align-items-center justify-content-start">
              <FaRegBell style={{ fontSize: '1.5rem' }} />
            </Nav.Link>
            <div className="vr mx-2"></div>
            <NavDropdown
              title={
                <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%' }}>

                <img
                  src={isDefaultAvatar ? iconaProfilo : user.avatar}
                  alt="Icona profilo"
                 className='w-100 h-100 rounded-circle' 
                  
                  />                  
                  </div>
                  <p className='m-0 d-none d-md-block'>{user && `${user.name} ${user.surname}`}</p>
                </div>
              }
              id="user-nav-dropdown"
              align="end"
              className="no-caret d-flex align-items-center w-100"
            >
              <NavDropdown.Item as={NavLink} to="/account" >
                <AiOutlineUser className="me-2" />
                <span>Il mio account</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/homepage">
                <RiTeamLine className="me-2"  />
                <span>Le mie squadre</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <AiOutlinePoweroff className="me-2"  />
                <span>Logout</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarHomePage;
