import { App, Avatar, Button, Dropdown, Space, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useI18n } from "../i18n/useI18n";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { message } = App.useApp();

  if (!user) {
    return (
      <Space size={4} wrap>
        <Button onClick={() => navigate("/login")}>{t("auth.signIn")}</Button>
        <Button type="primary" onClick={() => navigate("/register")}>
          {t("auth.signUp")}
        </Button>
      </Space>
    );
  }

  const initials = (user.name || user.email).trim().slice(0, 2).toUpperCase();

  const menuItems: MenuProps["items"] = [
    { key: "profile", label: t("auth.profile") },
    { type: "divider" },
    { key: "logout", label: t("auth.signOut"), danger: true },
  ];

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "profile") {
      navigate("/profile");
    } else if (key === "logout") {
      logout();
      message.success(t("auth.logoutOk"));
      navigate("/");
    }
  };

  return (
    <Dropdown menu={{ items: menuItems, onClick: onMenuClick }} trigger={["click"]} placement="bottomRight">
      <Avatar
        style={{ backgroundColor: token.colorPrimary, cursor: "pointer", flexShrink: 0 }}
        alt={user.name || user.email}
      >
        {initials || <UserOutlined />}
      </Avatar>
    </Dropdown>
  );
}