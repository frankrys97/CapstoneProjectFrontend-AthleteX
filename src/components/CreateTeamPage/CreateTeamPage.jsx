import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import NavbarHomePage from "../HomePage/NavbarHomePage";
import "./CreateTeamPage.scss";
import iconaScudetto from "../../assets/HomePage/Icona-scudetto.svg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import ColorPickerButton from "./ColorPickerButton";
import apiClient from "../../utils/axiosConfig";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const CreateTeamPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    creationDate: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    primaryColor: "#fd4742",
    secondaryColor: "#161832",
  });

  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countryNames = data.map((country) => country.name.common).sort();

        setCountries(countryNames);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleColorChange = (color, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: color,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };
    if (value.trim() !== "") {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.name) newErrors.name = "Il nome è obbligatorio";
    if (!formData.creationDate)
      newErrors.creationDate = "La data di creazione è obbligatoria";
    if (!formData.email) newErrors.email = "L'email è obbligatoria";
    if (!validateEmail(formData.email))
      newErrors.email =
        "L'email non è valida, deve essere nel formato 'nJ9oJ@example.com'";
    if (!formData.address) newErrors.address = "L'indirizzo è obbligatorio";
    if (!formData.country) newErrors.country = "Il paese è obbligatorio";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    console.log(formData);

    if (avatar) {
      data.append("avatar", avatar);
    }

    try {
      const response = await apiClient.post("/teams", data);
      console.log(response.data);
      setFormData({
        name: "",
        creationDate: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        primaryColor: "#fd4742",
        secondaryColor: "#161832",
      });
      setAvatar(null);
      handleNavigate(`/homepage`);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="create-team-page ">
      <NavbarHomePage />
      <Container fluid className="create-team-container">
        <Row>
          <Col className="col-fixed-height">
            <div className="d-flex flex-column align-items-center mt-4">
              <h4>Crea la tua squadra</h4>
              <p className="text-muted">
                Completa le informazioni sulla tua squadra, personalizza il logo
                e il colore.
              </p>
              <Row
                className="card-team-create bg-white p-4 w-100"
                style={{ borderTop: `5px solid ${formData.primaryColor}` }}
              >
                <Col md={4}>
                  <div className="d-flex flex-column align-items-center w-100" style={{ maxHeight: "400px", overflow: "auto"}} >
                    <div
                      className="bg-light rounded-circle p-3 border border-1 position-relative"
                      style={{ width: "150px", height: "150px" }}
                    >
                        <input
                        type="file"
                        onChange={handleAvatarChange}
                        style={{
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          left: 0,
                          top: 0,
                          cursor: "pointer",
                          zIndex: 999,
                        }}
                      />
                      <img
                        src={
                          avatar ? URL.createObjectURL(avatar) : iconaScudetto
                        }
                        alt="icona scudetto"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                      <div
                        className="position-absolute bottom-0 end-0 bg-light rounded-circle border border-3 border-white p-2"
                        style={{ cursor: "pointer" }}
                        >
                        <MdOutlineAddAPhoto
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column w-100 align-items-start mt-5 gap-2">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <p className="text-muted m-0">Colore primario</p>
                        <ColorPickerButton
                          color={formData.primaryColor}
                          onColorChange={(color) =>
                            handleColorChange(color, "primaryColor")
                          }
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center w-100">
                        <p className="text-muted m-0">Colore secondario</p>
                        <ColorPickerButton
                          color={formData.secondaryColor}
                          onColorChange={(color) =>
                            handleColorChange(color, "secondaryColor")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={1}>
                  <div className="vr h-100 d-none d-md-block"></div>
                  <hr className="d-md-none" />
                </Col>
                <Col md={7}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        isInvalid={!!errors.name}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Data di Creazione</Form.Label>
                      <Form.Control
                        isInvalid={!!errors.creationDate}
                        type="date"
                        name="creationDate"
                        value={formData.creationDate}
                        onChange={handleChange}
                        required
                        max={new Date().toISOString().split("T")[0]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.creationDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Telefono</Form.Label>
                      <PhoneInput
                        country={"it"}
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputClass="w-100"
                        enableSearch={true}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        isInvalid={!!errors.email}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Indirizzo</Form.Label>

                      <Form.Control
                        isInvalid={!!errors.address}
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Paese</Form.Label>
                      <Form.Control
                        as="select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.country}
                      >
                        <option value="">Seleziona un paese</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                        {/* <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback> */}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <hr className="hr-line" />
                  <div className="d-flex justify-content-center">
                    <button className="animated-button" onClick={handleSubmit}>
                      <svg
                        viewBox="0 0 24 24"
                        className="arr-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                      <span className="text">Crea squadra</span>
                      <span className="circle"></span>
                      <svg
                        viewBox="0 0 24 24"
                        className="arr-1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateTeamPage;
