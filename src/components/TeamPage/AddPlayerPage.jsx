import { Card, Col, Row } from "react-bootstrap";
import TeamPageLayout from "./TeamPageLayout";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const AddPlayerPage = () => {
  const team = useSelector((state) => state.team.content);
  return (
    <TeamPageLayout>
      <Row className="w-100">
        <Col>
          <h5 style={{ fontStyle: "italic" }} className="text-muted">
          <Link
              style={{
                color: team ? `${team.secondaryColor}` : "#fd4742",
              }} to={`/team/${team.id}`}
              className="text-decoration-none"
            >
              {team.name} </Link>{" "}
            {" "}
            <span
              style={{ color: team ? `${team.secondaryColor}` : "#fd4742" }}
            >
              <Link
              style={{
                color: team ? `${team.secondaryColor}` : "#fd4742",
              }} to={`/members`}
              className="text-decoration-none"
            >
              / Membri 
              </Link>
            </span>{" "}
            / Aggiungi membri
          </h5>
        </Col>
      </Row>
      <Row className="mt-3 w-100">
        <Col>
          <h5 className="text-dark mb-0">Aggiungi un membro</h5>
        </Col>
      </Row>

      <Row className="mt-3 w-100">
        <Col>
          <div
            style={{
              minHeight: "400px",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #f0f0f2",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
            }}
            className="d-flex flex-column justify-content-center align-items-center flex-md-row align-items-md-center gap-3 p-3 p-md-0"
          >
            <Card
              className="h-100 card-add-member text-center text-decoration-none"
              as={NavLink}
              to={`/team/${team.name}/add-member/new`}
            >
              <Card.Img
                variant="top"
                src="https://d2wktyvb51exf7.cloudfront.net/1.16.9/adf0d7347cd54ccf7150.svg"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/9",
                  objectFit: "contain",
                }}
              />
              <Card.Body className="mt-2">
                <Card.Title>Aggiungi un membro</Card.Title>
                <Card.Text>
                  Puoi aggiungere i tuoi membri manualmente uno ad uno, anche
                  senza la registrazione!
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              className="h-100 card-add-member text-center text-decoration-none"
              as={NavLink}
              to={"/team/add-member/invite"}
            >
              <Card.Img
                variant="top"
                src="https://d2wktyvb51exf7.cloudfront.net/1.16.9/dac1b05619c95db6340e.svg"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/9",
                  objectFit: "contain",
                }}
              />
              <Card.Body className="mt-2">
                <Card.Title>Invita un membro</Card.Title>
                <Card.Text>
                  Condividi l&apos;id della squadra ed invita i tuoi membri
                  nella nostra app!
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </TeamPageLayout>
  );
};

export default AddPlayerPage;
