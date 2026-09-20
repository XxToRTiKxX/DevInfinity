import { Tag } from "antd";
import { useI18n } from "../i18n/useI18n";
import type { ProjectStatus } from "../types";

const ROLE_COLORS: Record<string, string> = {
  Frontend: "blue",
  Backend: "geekblue",
  Fullstack: "purple",
  "UI/UX-дизайнер": "magenta",
  Аналитик: "gold",
  "QA-инженер": "cyan",
  DevOps: "volcano",
  "Project Manager": "green",
};

export function RoleTag({ role }: { role: string }) {
  return <Tag color={ROLE_COLORS[role] ?? "default"}>{role}</Tag>;
}

const STATUS_COLORS: Record<ProjectStatus, string> = {
  recruiting: "success",
  forming: "processing",
  started: "default",
};

export function ProjectStatusTag({ status }: { status: ProjectStatus }) {
  const { t } = useI18n();
  const labels: Record<ProjectStatus, string> = {
    recruiting: t("status.recruiting"),
    forming: t("status.forming"),
    started: t("status.started"),
  };
  return <Tag color={STATUS_COLORS[status]}>{labels[status]}</Tag>;
}