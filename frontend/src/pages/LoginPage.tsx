import { App, Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAuth } from "../auth/useAuth";
import { useI18n } from "../i18n/useI18n";

const { Title, Paragraph } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = (values: LoginFormValues) => {
    const name = values.email.split("@")[0] || "Пользователь";
    login({ name, email: values.email });
    message.success(t("login.demoOk"));
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <BackButton />
      <Card>
        <Title level={2} style={{ marginTop: 0 }}>
          {t("login.title")}
        </Title>
        <Paragraph type="secondary">{t("login.subtitle")}</Paragraph>
        <Form<LoginFormValues> layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="email"
            label={t("login.email")}
            rules={[
              { required: true, message: t("login.emailRequired") },
              { type: "email", message: t("login.emailInvalid") },
            ]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="name@example.com" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("login.password")}
            rules={[{ required: true, message: t("login.passwordRequired") }]}
          >
            <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("login.submit")}
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text type="secondary">
          {t("login.noAccount")}{" "}
          <Link to="/register">{t("login.signUpLink")}</Link>
        </Typography.Text>
      </Card>
    </div>
  );
}