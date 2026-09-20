import { App, Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAuth } from "../auth/useAuth";
import { useI18n } from "../i18n/useI18n";

const { Title, Paragraph } = Typography;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export default function RegisterPage() {
  const { t } = useI18n();
  const { register } = useAuth();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = (values: RegisterFormValues) => {
    register({ name: values.name, email: values.email });
    message.success(t("register.demoOk"));
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <BackButton />
      <Card>
        <Title level={2} style={{ marginTop: 0 }}>
          {t("register.title")}
        </Title>
        <Paragraph type="secondary">{t("register.subtitle")}</Paragraph>
        <Form<RegisterFormValues> layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="name"
            label={t("register.name")}
            rules={[{ required: true, message: t("register.nameRequired") }]}
          >
            <Input prefix={<UserOutlined />} autoComplete="name" />
          </Form.Item>
          <Form.Item
            name="email"
            label={t("register.email")}
            rules={[
              { required: true, message: t("register.emailRequired") },
              { type: "email", message: t("register.emailInvalid") },
            ]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="name@example.com" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("register.password")}
            rules={[
              { required: true, message: t("register.passwordRequired") },
              { min: 6, message: t("register.passwordMin") },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label={t("register.confirm")}
            dependencies={["password"]}
            rules={[
              { required: true, message: t("register.confirmRequired") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("register.confirmMismatch")));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} autoComplete="new-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("register.submit")}
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text type="secondary">
          {t("register.hasAccount")}{" "}
          <Link to="/login">{t("register.loginLink")}</Link>
        </Typography.Text>
      </Card>
    </div>
  );
}