import { App, Button, Card, Space, Tag, Typography } from "antd";
import { TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { Team } from "../types";
import { useI18n } from "../i18n/useI18n";
import { countLabel } from "../i18n/plurals";
import { RoleTag } from "./ProjectTags";

export default function TeamCard({ team, delay = 0 }: { team: Team; delay?: number }) {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { message } = App.useApp();

  const open = () => navigate(`/teams/${team.id}`);

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
          <Link to={`/teams/${team.id}`} onClick={(e) => e.stopPropagation()}>
            {team.name}
          </Link>
        }
      >
        <Space orientation="vertical" size={12} style={{ width: "100%" }}>
          <Typography.Text type="secondary">{team.description}</Typography.Text>
          <Typography.Text strong>
            {t("teamsPage.project")}: {team.projectTitle}
          </Typography.Text>
          <Space wrap size={[4, 4]}>
            <Typography.Text type="secondary">
              <TeamOutlined /> {countLabel(lang, team.members, "participant")}
            </Typography.Text>
            {team.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {t("teamsPage.openRoles")}{" "}
            </Typography.Text>
            {team.openRoles.map((role) => (
              <RoleTag key={role} role={role} />
            ))}
          </div>
          <Typography.Text type="secondary">
            {t("teamsPage.lookingForMore")}{" "}
            <Typography.Text strong>
              {countLabel(lang, team.openRoles.length, "person")}
            </Typography.Text>
          </Typography.Text>
          <div className="dev-card-actions">
            <Button
              type="primary"
              icon={<UsergroupAddOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                message.success(t("teamsPage.applied", { name: team.name }));
              }}
            >
              {t("teamsPage.apply")}
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}