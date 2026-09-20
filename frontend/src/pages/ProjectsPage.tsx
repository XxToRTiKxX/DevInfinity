import { Button, Col, Empty, Input, Row, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import PageHeader from "../components/PageHeader";
import BackButton from "../components/BackButton";
import { projects, ROLES, TECHNOLOGIES } from "../data/demo";
import { useI18n } from "../i18n/useI18n";

export default function ProjectsPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string | undefined>();
  const [tag, setTag] = useState<string | undefined>();

  const filtered = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return projects.filter((project) => {
      const words = [
        project.title,
        project.summary,
        ...project.tags,
        ...project.openRoles,
      ]
        .join(" ")
        .toLowerCase()
        .split(/\s+/);
      const stemMatch = (word: string, token: string) => {
        let common = 0;
        const max = Math.min(word.length, token.length);
        while (common < max && word[common] === token[common]) common++;
        return common >= 3 && Math.abs(word.length - token.length) <= 2;
      };
      const matchesToken = (token: string) => {
        if (token.length < 2) return words.some((word) => word === token);
        return words.some(
          (word) =>
            word === token ||
            (token.length >= 2 && word.includes(token)) ||
            (word.length >= 2 && token.includes(word)) ||
            stemMatch(word, token),
        );
      };
      const matchesQuery = tokens.length === 0 || tokens.every(matchesToken);
      const matchesRole = !role || project.openRoles.includes(role);
      const matchesTag = !tag || project.tags.includes(tag);
      return matchesQuery && matchesRole && matchesTag;
    });
  }, [query, role, tag]);

  const resetFilters = () => {
    setQuery("");
    setRole(undefined);
    setTag(undefined);
  };

  return (
    <div>
      <BackButton fallback="/" />
      <PageHeader title={t("projectsPage.title")} subtitle={t("projectsPage.subtitle")} />
      <Space wrap size={12} style={{ marginBottom: 24 }}>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder={t("projectsPage.search")}
          style={{ width: 280 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          allowClear
          placeholder={t("projectsPage.roleFilter")}
          style={{ width: 260 }}
          value={role}
          onChange={setRole}
          options={ROLES.map((r) => ({ value: r, label: r }))}
        />
        <Select
          allowClear
          placeholder={t("projectsPage.techFilter")}
          style={{ width: 220 }}
          value={tag}
          onChange={setTag}
          options={TECHNOLOGIES.map((x) => ({ value: x, label: x }))}
        />
      </Space>
      {filtered.length > 0 ? (
        <Row gutter={[16, 16]} className="dev-grid">
          {filtered.map((project, index) => (
            <Col xs={24} md={12} xl={8} key={project.id}>
              <ProjectCard project={project} delay={index * 70} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={t("projectsPage.empty")} style={{ marginTop: 48 }}>
          <Button onClick={resetFilters}>{t("projectsPage.reset")}</Button>
        </Empty>
      )}
    </div>
  );
}