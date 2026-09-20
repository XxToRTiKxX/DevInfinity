import { Card, Col, Row, Space, Tag, Typography, theme } from "antd";
import {
  BulbOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import BackButton from "../components/BackButton";
import PageHeader from "../components/PageHeader";
import { useI18n } from "../i18n/useI18n";

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  const { t } = useI18n();
  const { token } = theme.useToken();

  return (
    <div>
      <BackButton fallback="/" />
      <PageHeader title={t("about.title")} subtitle={t("about.subtitle")} />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Space orientation="vertical" size={16} style={{ width: "100%" }}>
            <Card>
              <Title level={4}>{t("about.whyTitle")}</Title>
              <Paragraph style={{ fontSize: 15 }}>{t("about.whyText")}</Paragraph>
            </Card>
            <Card>
              <Title level={4}>{t("about.keyTitle")}</Title>
              <Space orientation="vertical" size={12} style={{ width: "100%" }}>
                <Space>
                  <BulbOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
                  <Text>{t("about.feature1")}</Text>
                </Space>
                <Space>
                  <Tag color="blue">tags</Tag>
                  <Text>{t("about.feature2")}</Text>
                </Space>
                <Space>
                  <TeamOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
                  <Text>{t("about.feature3")}</Text>
                </Space>
                <Space>
                  <SafetyCertificateOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
                  <Text>{t("about.feature4")}</Text>
                </Space>
              </Space>
            </Card>
          </Space>
        </Col>
        <Col xs={24} lg={10}>
          <Card style={{ background: token.colorSuccessBg, borderColor: token.colorSuccessBorder }}>
            <Title level={4}>{t("about.plansTitle")}</Title>
            <Paragraph>{t("about.plansText")}</Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}