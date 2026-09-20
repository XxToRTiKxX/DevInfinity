import { Col, Row } from "antd";
import BackButton from "../components/BackButton";
import TeamCard from "../components/TeamCard";
import PageHeader from "../components/PageHeader";
import { teams } from "../data/demo";
import { useI18n } from "../i18n/useI18n";

export default function TeamsPage() {
  const { t } = useI18n();

  return (
    <div>
      <BackButton fallback="/" />
      <PageHeader title={t("teamsPage.title")} subtitle={t("teamsPage.subtitle")} />
      <Row gutter={[16, 16]} className="dev-grid">
        {teams.map((team, index) => (
          <Col xs={24} lg={12} xl={8} key={team.id}>
            <TeamCard team={team} delay={index * 70} />
          </Col>
        ))}
      </Row>
    </div>
  );
}