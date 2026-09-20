import { App, Avatar, Button, Card, Descriptions, Result, Space, Typography, theme } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../auth/useAuth";
import { useI18n } from "../i18n/useI18n";

const { Title } = Typography;

export default function ProfilePage() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { token } = theme.useToken();

  if (!user) {
    return (
      <Result
        status="warning"
        title={t("profile.notLoggedTitle")}
        subTitle={t("profile.notLoggedSub")}
        extra={
          <Space>
            <Button onClick={() => navigate("/login")} type="primary">
              {t("profile.goLogin")}
            </Button>
            <Button onClick={() => navigate("/register")}>
              {t("profile.goRegister")}
            </Button>
          </Space>
        }
      />
    );
  }

  const initials = (user.name || user.email).trim().slice(0, 2).toUpperCase();

  const onLogout = () => {
    logout();
    message.success(t("auth.logoutOk"));
    navigate("/");
  };

  return (
    <div>
      <BackButton />
      <PageHeader title={t("profile.title")} subtitle={t("profile.subtitle")} />
      <Space orientation="vertical" size={16} style={{ width: "100%", maxWidth: 560 }}>
        <Card>
          <Space align="center" size={16}>
            <Avatar size={64} style={{ backgroundColor: token.colorPrimary }}>
              {initials || <UserOutlined />}
            </Avatar>
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {user.name}
              </Title>
              <Typography.Text type="secondary">{user.email}</Typography.Text>
            </div>
          </Space>
        </Card>
        <Card title={t("profile.accountTitle")}>
          <Descriptions column={1} size="middle">
            <Descriptions.Item label={t("profile.name")}>{user.name}</Descriptions.Item>
            <Descriptions.Item label={t("profile.email")}>{user.email}</Descriptions.Item>
          </Descriptions>
          <Button danger icon={<LogoutOutlined />} style={{ marginTop: 16 }} onClick={onLogout}>
            {t("auth.signOut")}
          </Button>
        </Card>
      </Space>
    </div>
  );
}