import { Button, Card, Col, Row, Space, Statistic, Steps, Typography, theme } from "antd";
import {
  ArrowRightOutlined,
  BulbOutlined,
  RocketOutlined,
  StarOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { projects, teams } from "../data/demo";
import { useI18n } from "../i18n/useI18n";

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { token } = theme.useToken();
  const featured = projects.slice(0, 3);

  const stats = [
    { title: t("home.statProjects"), value: projects.length, icon: <StarOutlined /> },
    { title: t("home.statTeams"), value: teams.length, icon: <TeamOutlined /> },
    {
      title: t("home.statRoles"),
      value: teams.reduce((sum, team) => sum + team.openRoles.length, 0),
      icon: <UsergroupAddOutlined />,
    },
    { title: t("home.statMembers"), value: teams.reduce((sum, team) => sum + team.members, 0), icon: <TeamOutlined /> },
  ];

  return (
    <Space orientation="vertical" size={40} style={{ width: "100%" }}>
      <Row gutter={[24, 24]} align="middle" style={{ minHeight: 320 }}>
        <Col xs={24} md={12}>
          <Space orientation="vertical" size={20}>
            <Title style={{ margin: 0 }}>{t("home.heroTitle")}</Title>
            <Paragraph style={{ fontSize: 16 }}>{t("home.heroSubtitle")}</Paragraph>
            <Space wrap>
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate("/projects")}
              >
                {t("home.browseProjects")}
              </Button>
              <Button size="large" icon={<TeamOutlined />} onClick={() => navigate("/teams")}>
                {t("home.teamsAndRoles")}
              </Button>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ textAlign: "center", background: token.colorFillAlter }}>
            <RocketOutlined style={{ fontSize: 72, color: token.colorPrimary }} />
            <Title level={3}>{t("home.heroCardTitle")}</Title>
            <Paragraph type="secondary">{t("home.heroCardText")}</Paragraph>
          </Card>
        </Col>
      </Row>

      <Card style={{ background: token.colorFillAlter, border: "none" }}>
        <Row gutter={[24, 24]}>
          {stats.map((stat) => (
            <Col xs={12} md={6} key={stat.title}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                styles={{ content: { color: token.colorPrimary } }}
              />
            </Col>
          ))}
        </Row>
      </Card>

      <div>
        <Title level={3}>{t("home.how")}</Title>
        <Steps
          orientation="horizontal"
          responsive
          items={[
            {
              title: t("home.step1Title"),
              content: t("home.step1Desc"),
              icon: <BulbOutlined />,
            },
            {
              title: t("home.step2Title"),
              content: t("home.step2Desc"),
              icon: <TeamOutlined />,
            },
            {
              title: t("home.step3Title"),
              content: t("home.step3Desc"),
              icon: <RocketOutlined />,
            },
          ]}
        />
      </div>

      <div>
        <Title level={3}>{t("home.recent")}</Title>
        <Row gutter={[16, 16]} className="dev-grid" style={{ marginTop: 16 }}>
          {featured.map((project, index) => (
            <Col xs={24} md={8} key={project.id}>
              <ProjectCard project={project} delay={index * 70} />
            </Col>
          ))}
        </Row>
      </div>

      <Card style={{ textAlign: "center", background: token.colorPrimaryBg }}>
        <Title level={4}>{t("home.nextTitle")}</Title>
        <Paragraph>
          <Text>{t("home.nextText")}</Text>
        </Paragraph>
        <Space wrap style={{ justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate("/projects")}
          >
            {t("home.browseProjects")}
          </Button>
          <Button size="large" icon={<TeamOutlined />} onClick={() => navigate("/teams")}>
            {t("home.nextTeamsBtn")}
          </Button>
        </Space>
      </Card>
    </Space>
  );
}