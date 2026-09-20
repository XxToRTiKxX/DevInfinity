import { Layout, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";

const { Footer } = Layout;

export default function AppFooter() {
  const { t } = useI18n();

  return (
    <Footer style={{ textAlign: "center", marginTop: 48 }}>
      <Space orientation="vertical" size={4}>
        <Typography.Text strong>DevInfinity</Typography.Text>
        <Typography.Text type="secondary">{t("footer.line")}</Typography.Text>
        <Typography.Text type="secondary">
          <Link to="/about">{t("nav.about")}</Link>
          {" · "}
          <Link to="/projects">{t("nav.projects")}</Link>
          {" · "}
          <Link to="/teams">{t("nav.teams")}</Link>
        </Typography.Text>
      </Space>
    </Footer>
  );
}