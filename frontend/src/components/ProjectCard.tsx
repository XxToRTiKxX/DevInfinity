import { App, Button, Card, Space, Tag, Typography } from "antd";
import { TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { useI18n } from "../i18n/useI18n";
import { countLabel } from "../i18n/plurals";
import { RoleTag, ProjectStatusTag } from "./ProjectTags";

export default function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { message } = App.useApp();

  const open = () => navigate(`/projects/${project.id}`);

  return (
    <div
      className="dev-card-wrap"
      role="button"
      tabIndex={0}
      style={{ animationDelay: `${delay}ms` }}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <Card
        hoverable
        title={
          <Link to={`/projects/${project.id}`} onClick={(e) => e.stopPropagation()}>
            {project.title}
          </Link>
        }
      >
        <Space orientation="vertical" size={12} style={{ width: "100%" }}>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            {project.summary}
          </Typography.Paragraph>
          <div>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <Space wrap size={[4, 4]}>
            <ProjectStatusTag status={project.status} />
            <Typography.Text type="secondary">
              <TeamOutlined /> {countLabel(lang, project.teamSize, "participant")}
            </Typography.Text>
          </Space>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {t("card.lookingFor")}{" "}
            </Typography.Text>
            {project.openRoles.map((role) => (
              <RoleTag key={role} role={role} />
            ))}
          </div>
          <div className="dev-card-actions">
            <Button
              type="primary"
              icon={<UsergroupAddOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                message.success(t("card.applied", { title: project.title }));
              }}
            >
              {t("card.apply")}
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}