import { useRef, useState } from "react";
import { Col, Container, Row, Form, Button, ListGroup, InputGroup, Spinner, Modal, Alert } from "react-bootstrap";
import NavbarHomePage from "../HomePage/NavbarHomePage";
import './ProfilePage.scss';
import iconaProfilo from "../../assets/HomePage/Icona-profilo.svg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FcDeleteDatabase, FcUpload } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { logout, recognizeUser } from "../../redux/actions";
import { IoCloudUploadOutline } from "react-icons/io5";
const ProfilePage = () => {
    const user = useSelector((state) => state.authenticate.user);
    const [activeSection, setActiveSection] = useState("profile");
    const [formData, setFormData] = useState({
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [showModalInput, setShowModalInput] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null); 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setSelectedFile(e.dataTransfer.files[0]);
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(e.dataTransfer.files[0]);
            fileInputRef.current.files = dataTransfer.files;
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleShowModalInput = () => {
        setShowModalInput(true);
    }

    const handleCloseModalInput = () => {
        setShowModalInput(false);
        setSelectedFile(null);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        const newErrors = { ...errors };

        // Validazione per nome e cognome
        if (name === 'name' || name === 'surname') {
            if (value.length < 3 || value.length > 50) {
                newErrors[name] = `Il ${name === 'name' ? 'nome' : 'cognome'} deve avere tra 3 e 50 caratteri.`;
            } else {
                delete newErrors[name];
            }
        }

        // Validazione per email
        if (name === 'email') {
            if (!validateEmail(value)) {
                newErrors.email = 'Email non valida.';
            } else {
                delete newErrors.email;
            }
        }

        if (name === 'password' && value === '') {
            delete newErrors.password;
        }
        // Validazione per nuova password
        if (name === 'password') {
            if (!validatePassword(value)) {
                newErrors.password = 'La nuova password deve contenere almeno 8 caratteri, una lettera maiuscola, un numero e un carattere speciale.';
            } else  {
                delete newErrors.password;
            }
        }

        // Validazione per conferma password
        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                newErrors.confirmPassword = 'Le password non coincidono.';
            } else {
                delete newErrors.confirmPassword;
            }
        }

        if (name === 'oldPassword' && value === '') {
            newErrors.oldPassword = 'La vecchia password è richiesta.';
        } else {
            delete newErrors.oldPassword;
        }
    
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = { ...errors };
    
        // Se la password è cambiata, controlla la conferma della password
        if (formData.password || formData.confirmPassword) {
            if (!formData.oldPassword) {
                newErrors.oldPassword = 'La vecchia password è richiesta.';
            } else {
                delete newErrors.oldPassword;
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Le password non coincidono.';
            } else {
                delete newErrors.confirmPassword;
            }
        }
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const endpoint = user.userType === 'COACH' ? '/coaches/me' : '/players/me';
                const response = await apiClient.put(endpoint, formData);
                setIsLoading(false);
                console.log(response.data);
                dispatch(recognizeUser(response.data));
                setFormData({
                    ...formData,
                    oldPassword: "",
                    password: "",
                    confirmPassword: "",
                })
            } catch (error) {
                // Verifica il tipo di errore e imposta un messaggio specifico
                if (error.response && error.response.data) {
                    if (error.response.data.message === "Wrong old password") {
                        setErrors({ ...errors, oldPassword: 'La vecchia password è errata.' });
                    } else {
                        console.log("Errore:", error.response.data.message);
                    }
                } else {
                    console.log("Errore sconosciuto:", error);
                }
            }
            finally {
                setIsLoading(false);
            }
        }
    };

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        try {
            const endpoint = user.userType === 'COACH' ? '/coaches/me' : '/players/me';
            const response = await apiClient.delete(endpoint);
            console.log(response.data);
            setIsLoading(false);
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.log("Errore:", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    const isDefaultAvatar = !user?.avatar || user?.avatar?.includes('https://ui-avatars.com/api/');

    const handleClickInput = () => {
        fileInputRef.current.click();
    }

    const handleUploadAvatar = async (e) => {
        e.preventDefault();
        
        // Verifica se è stato selezionato un file
        if (!selectedFile) {
            // Imposta un errore per l'avatar
            setErrors({ ...errors, avatar: "Caricare un file per poter modificare" });
            setTimeout(() => {
                setErrors({ avatar: "" });
            }, 3000);
    
            return;
        }
    
        setLoadingAvatar(true);
        const data = new FormData();
        data.append('avatar', selectedFile);
    
        try {
            const endpoint = user.userType === 'COACH' ? '/coaches/me/avatar' : '/players/me/avatar';
            const response = await apiClient.patch(endpoint, data);
            console.log(response.data);
            dispatch(recognizeUser(response.data));
            setSelectedFile(null);
            setErrors({ ...errors, avatar: "" });
            handleCloseModalInput();
        } catch (error) {
            console.log("Errore:", error);
            // Gestione degli errori
        } finally {
            setLoadingAvatar(false);}
    };
    
    

    return (
        <div className="profile-page">
            <NavbarHomePage />
            <Container>
                <Row>
                    <h4 className="mt-5">Il mio account</h4>
                </Row>

                <Row>
                    <Col md={3}>
                        <div className="left-column-profile-page">
                            <div className="d-flex flex-column align-items-center">
                                <div className="bg-light rounded-circle p-3 border border-1 position-relative mt-3" style={{ width: '120px', height: '120px', cursor: 'pointer' }} onClick={handleShowModalInput}>
                                    <img src={isDefaultAvatar ? iconaProfilo : user.avatar} alt="icona profilo" style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }} />
                                    <div className="position-absolute bottom-0 end-0 bg-light rounded-circle border border-3 border-white p-1" style={{ cursor: 'pointer' }}>
                                        <MdOutlineAddAPhoto style={{ width: '25px', height: '20px', cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <h5 className="mt-2">{user.name} {user.surname}</h5>
                            </div>
                            <ListGroup className="w-100 rounded rounded-0">
                                <ListGroup.Item 
                                    action 
                                    onClick={() => setActiveSection("profile")}
                                    active={activeSection === "profile"}
                                    className="link-profile"
                                >
                                    Profilo
                                </ListGroup.Item>
                                <ListGroup.Item 
                                    action 
                                    onClick={() => setActiveSection("delete")}
                                    active={activeSection === "delete"}
                                    className="link-profile"
                                >
                                    Cancella il tuo account
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <Modal show={showModalInput} onHide={handleCloseModalInput}>
                        {errors.avatar && <Alert variant="danger" className="m-3 p-3">{errors.avatar}</Alert>}
                <Modal.Header closeButton>
                    <Modal.Title>Carica immagine del profilo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="drag-drop-area"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{
                            border: '2px dashed #ccc',
                            borderRadius: '10px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={handleClickInput}
                    >
                        <IoCloudUploadOutline className="fs-2" />

                        <p>Trascina qui la tua immagine o clicca per selezionarla.</p>
                        <Form.Control type="file" onChange={handleFileChange} accept="image/*" ref={fileInputRef} style={{ display: 'none' }} />
                        {selectedFile && <div className="mt-3"> <FcUpload className="fs-3" />
                            {selectedFile.name}</div>}
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center">
                    <Button variant="secondary" size="sm" className="btn-create px-4 py-2 rounded rounded-1" onClick={handleCloseModalInput}>
                        Annulla
                    </Button>
                    <div style={{ width: '104px', height: '39px' }}>
  <Button variant="primary" size="sm" className="w-100 h-100" onClick={handleUploadAvatar}>
    {loadingAvatar ? (
      <Spinner animation="border" size="sm" />
    ) : (
      "Convalida"
    )}
  </Button>
</div>
                </Modal.Footer>
            </Modal>
                    </Col>

                    <Col md={9} >
                        <div className="right-column-profile-page">
                            {activeSection === "profile" && (
                                <div className="d-flex flex-column align-items-start w-100 p-4 gap-4">
                                    <h5>Il mio profilo</h5>
                                    <Form className="w-100 d-flex flex-column align-items-start" onSubmit={handleSubmit}>
                                        <Form.Group controlId="name" className="mb-3 d-flex flex-column justify-content-start align-items-start flex-md-row align-items-md-center gap-3 form-group-profile-page">
                                            <Form.Label className="text-muted form-label-profile-page position-relative">Nome *</Form.Label>
                                            <Form.Control
                                            className="form-control-profile-page"
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </Form.Group>
                                        <Form.Group controlId="surname" className="mb-3 d-flex flex-column justify-content-start align-items-start flex-md-row align-items-md-center gap-3 form-group-profile-page">
                                            <Form.Label className="text-muted form-label-profile-page">Cognome *</Form.Label>
                                            <Form.Control
                                            className="form-control-profile-page"
                                                required
                                                type="text"
                                                name="surname"
                                                value={formData.surname}
                                                onChange={handleInputChange}
                                            />
                                            {errors.surname && <div className="text-danger">{errors.surname}</div>}
                                        </Form.Group>
                                        <Form.Group controlId="username" className="mb-3 d-flex flex-column justify-content-start align-items-start flex-md-row align-items-md-center gap-3 form-group-profile-page">
                                            <Form.Label className="text-muted form-label-profile-page">Username *</Form.Label>
                                            <Form.Control
                                            className="form-control-profile-page"
                                                required
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            />
                                            {errors.username && <div className="text-danger">{errors.username}</div>}
                                        </Form.Group>
                                        <Form.Group controlId="email" className="mb-3 d-flex flex-column justify-content-start align-items-start flex-md-row align-items-md-center gap-3 form-group-profile-page">
                                            <Form.Label className="text-muted form-label-profile-page">Email *</Form.Label>
                                            <Form.Control
                                            className="form-control-profile-page"
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </Form.Group>
                                        <Form.Group controlId="oldPassword" className="mb-3 d-flex flex-column justify-content-start align-items-start flex-md-row align-items-md-center gap-3 form-group-profile-page">
    <Form.Label className="text-muted form-label-profile-page">Vecchia Password </Form.Label>
    <InputGroup className="input-group-profile-page">
        <Form.Control
            
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
        />
        <Button variant="link" className="p-0 position-absolute" style={{ right: "5%", top: "20%", zIndex:999 }} onClick={() => setShowOldPassword(!showOldPassword)}>
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
        </Button>
    </InputGroup>
    {errors.oldPassword && <div className="text-danger">{errors.oldPassword}</div>}
</Form.Group>

<Form.Group controlId="password" className="mb-3 d-flex flex-column justify-content-start align-items-start flex-md-row align-items-md-center gap-3 form-group-profile-page">
    <Form.Label className="text-muted form-label-profile-page">Nuova Password </Form.Label>
    <div className="d-flex flex-column align-items-start w-100 input-group-profile-page">
    <InputGroup>
        <Form.Control
            
            type={showpassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-100"
        />
        <Button variant="link" className="p-0 position-absolute" style={{ right: "5%", top:  "20%", zIndex:999 }} onClick={() => setShowpassword(!showpassword)}>
            {showpassword ? <FaEyeSlash /> : <FaEye />}
        </Button>
    </InputGroup>
    {errors.password && formData.password !== "" && <p className="text-danger" style={{fontSize: '12px'}}>{errors.password}</p>}
    </div>
</Form.Group>

<Form.Group controlId="confirmPassword" className="mb-3 d-flex flex-column justify-content-start align-items-start flex-md-row align-items-md-center gap-3 form-group-profile-page">
    <Form.Label className="text-muted form-label-profile-page">Conferma Nuova Password </Form.Label>
    <div className="d-flex flex-column align-items-start w-100 input-group-profile-page">

    <InputGroup>
        <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-100"
        />
        <Button variant="link" className="p-0 position-absolute" style={{ right: "5%", top: "20%", zIndex:999 }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </Button>
    </InputGroup>
    {errors.confirmPassword  && formData.confirmPassword !== "" && <p className="text-danger" style={{fontSize: '12px'}}>{errors.confirmPassword}</p>}
    </div>
</Form.Group>

                                        <Button variant="secondary" type="submit" className="btn-create px-4 py-2 rounded rounded-1">
                                            {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : "Salva"}
                                        </Button>
                                    </Form>
                                </div>
                            )}
                            {activeSection === "delete" && (
                                <div className="d-flex flex-column align-items-center w-100 p-4 gap-4">
                                    <FcDeleteDatabase style={{ width: '100px', height: '100px' }} />
                                    <h5 className="text-center">In questa sezione potrai eliminare il tuo account</h5>
                                    <div className="d-flex align-items-center gap-2">
                                        <IoIosInformationCircleOutline />
                                        <p className="m-0">Ti informiamo che eliminare l&apos;account comporterà la cancellazione di tutti i tuoi dati</p>
                                    </div>
                                    <Button variant="secondary" className="btn-create px-4 py-2 rounded rounded-1 border-0" onClick={handleShowModal}>
                                        {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : "Elimina"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminazione account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
            <p>Stai per eliminare il tuo account, tutti i tuoi dati saranno eliminati, sicuro di voler procedere?</p>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" size="sm" className="btn-create px-4 py-2 rounded rounded-1" onClick={handleCloseModal} >
            Annulla
          </Button>
          <Button variant="primary" size="sm" className="px-4 py-2 rounded rounded-1" onClick={handleDeleteAccount} >
            {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : "Elimina"}
          </Button>
        </Modal.Footer>
      </Modal>
            </Container>
        </div>
    );
};

export default ProfilePage;
