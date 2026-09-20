import { Alert, App, Avatar, Button, Card, Col, Descriptions, Result, Row, Space, Tag, Typography, theme } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import BackButton from "../components/BackButton";
import { RoleTag } from "../components/ProjectTags";
import { teams } from "../data/demo";
import { useI18n } from "../i18n/useI18n";
import { countLabel } from "../i18n/plurals";

const { Title, Paragraph } = Typography;

export default function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { t, lang } = useI18n();
  const { token } = theme.useToken();
  const team = teams.find((x) => x.id === id);

  if (!team) {
    return (
      <Result
        status="404"
        title={t("teamsPage.notFoundTitle")}
        subTitle={t("teamsPage.notFoundSub")}
        extra={
          <Button type="primary" onClick={() => navigate("/teams")}>
            {t("teamsPage.back")}
          </Button>
        }
      />
    );
  }

  const apply = () => {
    message.success(t("teamsPage.applied", { name: team.name }));
  };

  return (
    <div>
      <BackButton fallback="/teams" />
      <PageHeader title={team.name} />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            <Space orientation="vertical" size={16} style={{ width: "100%" }}>
              <div>
                {team.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <Paragraph style={{ fontSize: 16 }}>{team.description}</Paragraph>
            </Space>
          </Card>
          <Card title={t("teamsPage.membersTitle")} style={{ marginTop: 16 }}>
            <Space orientation="vertical" size={12} style={{ width: "100%" }}>
              {team.memberNames.map((name) => (
                <Space key={name} size={12} align="center">
                  <Avatar style={{ backgroundColor: token.colorPrimary, flexShrink: 0 }}>
                    {name.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Typography.Text>{name}</Typography.Text>
                </Space>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Space orientation="vertical" size={16} style={{ width: "100%" }}>
            <Card title={t("detail.info")}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label={t("teamsPage.project")}>
                  {team.projectTitle}
                </Descriptions.Item>
                <Descriptions.Item label={t("detail.teamSize")}>
                  {countLabel(lang, team.members, "participant")}
                </Descriptions.Item>
                <Descriptions.Item label={t("teamsPage.lookingForMore")}>
                  {countLabel(lang, team.openRoles.length, "person")}
                </Descriptions.Item>
                <Descriptions.Item
                  label={`${t("teamsPage.openRoles")} ${countLabel(lang, team.openRoles.length, "role")}`}
                >
                  {team.openRoles.map((role) => (
                    <RoleTag key={role} role={role} />
                  ))}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card>
              <Space orientation="vertical" size={12} style={{ width: "100%" }}>
                <Title level={5} style={{ margin: 0 }}>
                  {t("detail.joinTitle")}
                </Title>
                <Alert type="info" showIcon title={t("demo.title")} description={t("demo.desc")} />
                <Button
                  type="primary"
                  size="large"
                  icon={<UsergroupAddOutlined />}
                  block
                  onClick={apply}
                >
                  {t("teamsPage.apply")}
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}