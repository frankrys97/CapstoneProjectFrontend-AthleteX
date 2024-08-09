import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import TeamPageLayout from "./TeamPageLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ColorPickerButton from "../CreateTeamPage/ColorPickerButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import { MdOutlineAddAPhoto } from "react-icons/md";
import iconaScudetto from "../../assets/HomePage/Icona-scudetto.svg";
import "./TeamPage.scss";
import tinycolor from "tinycolor2";
import { setTeam } from "../../redux/actions";
import { Bounce, toast, ToastContainer } from "react-toastify";

const SettingsPageTeam = () => {
  const team = useSelector((state) => state.team.content);
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
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        creationDate: team.creationDate,
        phone: team.phone,
        email: team.email,
        address: team.address,
        country: team.country,
        primaryColor: team.primaryColor,
        secondaryColor: team.secondaryColor,
      });
      setAvatar(team.avatar);
    }
  }, [team]);

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

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

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
      setLoading(false);
      return;
    }

    setErrors({});

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (avatar && typeof avatar !== "string") {
      data.append("avatar", avatar);
    }

    try {
      const response = await apiClient.put(`/teams/${team.id}`, data);
      console.log(response.data);
      dispatch(setTeam(response.data));

      toast.success("Modifiche salvate con successo", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        setTimeout(() => {
          
          handleNavigate(`/team/${team.id}`);
        }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getTextColor = (backgroundColor) => {
    const color = tinycolor(backgroundColor);
    const luminance = color.getLuminance();
    return luminance > 0.5 ? "#161832" : "#ffffff";
  };

  const isDefaultAvatar =
    !team?.avatar || team?.avatar?.includes("https://ui-avatars.com/api/");

  return (
    <TeamPageLayout>
                  <ToastContainer />

      <Row className="w-100">
        <Col>
          <h5 style={{ fontStyle: "italic" }} className="text-muted">
            <Link
              style={{
                color: team ? `${team.secondaryColor}` : "#fd4742",
              }}
              to={`/team/${team.id}`}
              className="text-decoration-none"
            >
              {team.name}
            </Link>{" "}
            <span className="text-muted"> / Impostazioni</span>
          </h5>
        </Col>
      </Row>
      <Row className="mt-3 w-100">
        <Col>
          <h5 className="text-dark mb-0 ">Impostazioni</h5>
        </Col>
      </Row>
      <Row
        className="bg-white p-4 w-100 mt-3 rounded"
        style={{
          borderTop: `5px solid ${formData.primaryColor}`,
          maxWidth: "700px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Col md={4}>
          <div className="d-flex flex-column align-items-center w-100">
            <div
              className="bg-light rounded-circle p-3 border border-1 position-relative"
              style={{ width: "150px", height: "150px", cursor: "pointer" }}
            >
              <img
               src={
                avatar && typeof avatar !== "string"
                  ? URL.createObjectURL(avatar)
                  : isDefaultAvatar
                  ? iconaScudetto
                  : team.avatar
              }
                alt="icona scudetto"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <input
                type="file"
                onChange={handleAvatarChange}
                style={{
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  cursor: "pointer",
                }}
              />
              <div
                className="position-absolute bottom-0 end-0 bg-light rounded-circle border border-3 border-white p-2"
                style={{ cursor: "pointer" }}
              >
                <MdOutlineAddAPhoto style={{ width: "20px", height: "20px" }} />
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
          <div className="vr h-100"></div>
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
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                className="mt-3 px-3 py-2 rounded rounded-1 btn-add-member"
                style={{
                  backgroundColor: `${team.secondaryColor}`,
                  color: `${getTextColor(`${team.secondaryColor}`)}`,
                  borderColor: `${team.secondaryColor}`,
                  minWidth: "180px",
                  maxHeight: "42px",
                }}
                type="submit"
              >
              {loading ? <Spinner style={{ width: "20px", height: "20px" }} /> : "Salva modifiche"}

              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </TeamPageLayout>
  );
};

export default SettingsPageTeam;
