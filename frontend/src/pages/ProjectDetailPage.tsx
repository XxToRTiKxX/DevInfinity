import { Alert, Button, Card, Col, Descriptions, Result, Row, Space, Tag, Typography, App } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import BackButton from "../components/BackButton";
import { ProjectStatusTag, RoleTag } from "../components/ProjectTags";
import { projects } from "../data/demo";
import { useI18n } from "../i18n/useI18n";
import { countLabel } from "../i18n/plurals";

const { Title, Paragraph } = Typography;

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { t, lang } = useI18n();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Result
        status="404"
        title={t("detail.notFoundTitle")}
        subTitle={t("detail.notFoundSub")}
        extra={
          <Button type="primary" onClick={() => navigate("/projects")}>
            {t("detail.back")}
          </Button>
        }
      />
    );
  }

  const apply = () => {
    message.success(t("card.applied", { title: project.title }));
  };

  return (
    <div>
      <BackButton fallback="/projects" />
      <PageHeader title={project.title} />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            <Space orientation="vertical" size={16} style={{ width: "100%" }}>
              <div>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <Paragraph style={{ fontSize: 16 }}>{project.description}</Paragraph>
              <Space wrap>
                <ProjectStatusTag status={project.status} />
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Space orientation="vertical" size={16} style={{ width: "100%" }}>
            <Card title={t("detail.info")}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label={t("detail.author")}>{project.author}</Descriptions.Item>
                <Descriptions.Item label={t("detail.teamSize")}>
                  {countLabel(lang, project.teamSize, "participant")}
                </Descriptions.Item>
                <Descriptions.Item label={t("detail.posted")}>
                  {project.postedAt}
                </Descriptions.Item>
                <Descriptions.Item label={t("detail.statusField")}>
                  <ProjectStatusTag status={project.status} />
                </Descriptions.Item>
                <Descriptions.Item
                  label={`${t("detail.roles")}: ${countLabel(lang, project.openRoles.length, "role")}`}
                >
                  {project.openRoles.map((role) => (
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
                <Alert
                  type="info"
                  showIcon
                  title={t("demo.title")}
                  description={t("demo.desc")}
                />
                <Button
                  type="primary"
                  size="large"
                  icon={<UsergroupAddOutlined />}
                  block
                  onClick={apply}
                >
                  {t("card.apply")}
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}