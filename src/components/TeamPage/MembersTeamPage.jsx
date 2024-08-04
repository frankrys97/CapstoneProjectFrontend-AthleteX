import { Button, Col, Container, Row } from 'react-bootstrap';
import { Table } from 'antd';
import NavbarHomePage from '../HomePage/NavbarHomePage';
import SidebarTeamPage from './SidebarTeamPage';
import { useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import tinycolor from 'tinycolor2';

const columns = [
  {
    title: 'Foto',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text) => <img src={text} alt="Foto" className="rounded-circle" width="40" height="40" />,
    width: 60,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Cognome',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'Data di nascita',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 200,
    render: (text) => <span href={`mailto:${text}`}>{text}</span>,
  },
  {
    title: 'Posizione',
    dataIndex: 'position',
    key: 'position',
    render: (text) => text ? text : 'N/A',
  },
  {
    title: 'Numero di maglia',
    dataIndex: 'jerseyNumber',
    key: 'jerseyNumber',
    render: (text) => text !== 0 ? text : 'N/A',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Altezza',
    dataIndex: 'height',
    key: 'height',
    render: (text) => text !== 0 ? `${text} cm` : 'N/A',
  },
  {
    title: 'Peso',
    dataIndex: 'weight',
    key: 'weight',
    render: (text) => text !== 0 ? `${text} kg` : 'N/A',
  },
  {
    title: 'Azione',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">Azione</a>,
  },
];

const MembersTeamPage = () => {
  const team = useSelector((state) => state.team.content);
  const players = useSelector((state) => state.team.players.players);

  const getTextColor = (backgroundColor) => {
    const color = tinycolor(backgroundColor);
    const luminance = color.getLuminance();
    return luminance > 0.5 ? "#161832" : "#ffffff";
  };

  return (
    <div className="members-team-page">
      <NavbarHomePage />
      <Container fluid className="p-0" >
        <Row className="w-100">
            <Col md={1}>
            
     <SidebarTeamPage />
            </Col>
          <Col md={11} className="p-4">
            <Row>
              <Col>
                <h5 style={{ fontStyle: 'italic' }} className="text-muted">
                  <span
                    style={{
                      color: team ? `${team.secondaryColor}` : '#fd4742',
                    }}
                  >
                    {team.name}
                  </span>{' '}
                  / Rosa
                </h5>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <div className="d-flex flex-column justify-content-between align-items-start gap-3 flex-sm-row align-items-sm-end">
                  <h5 className="text-dark mb-0">Membri</h5>

                  <div>
                    <Button
                      style={{
                        backgroundColor: team
                          ? `${team.secondaryColor}`
                          : '#fd4742',

                        color: getTextColor(team ? `${team.secondaryColor}` : '#fd4742'),

                      }}
                      className="d-flex align-items-center gap-2 border border-0 rounded rounded-2 px-3 py-2 btn-add-member"
                    >
                      <AiOutlineUserAdd className="fs-4" />
                      <span>Aggiungi un membro</span>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="p-2">
              <Col style={{ minHeight: '60vh', maxHeight: '60vh', backgroundColor: 'white', overflowY: 'auto' }} className="mt-4 rounded rounded-2 border border-1 p-4">
                <div className="d-flex flex-column align-items-start justify-content-between flex-md-row align-items-md-center gap-3">
                  <h5>{players.length === 1 ? '1 Membro' : `${players.length} Membri`}</h5>
                  <div>
                    <Button
                      variant="link"
                      className="d-flex align-items-center gap-2 border border-1 rounded rounded-2 px-3 py-2 text-decoration-none"
                      style={{ color: team ? `${team.secondaryColor}` : '#fd4742' }}
                    >
                      <IoSettingsOutline />
                      <span>Impostazioni</span>
                    </Button>
                  </div>
                </div>
                <div className='mt-3'>

                <Table
                  columns={columns}
                  dataSource={players}
                  scroll={{ x: 1300 }}
                  pagination={{ pageSize: 10 }}
                  rowKey="key"
                  size='small'
                />
                </div>
               
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MembersTeamPage;
