import { Layout, Menu, Drawer, Button, FloatButton, Grid, Space, theme } from "antd";
import { MenuOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppFooter from "../components/AppFooter";
import ThemeSwitch from "../components/ThemeSwitch";
import LangSwitch from "../components/LangSwitch";
import UserMenu from "../components/UserMenu";
import { useI18n } from "../i18n/useI18n";

const { Header, Content } = Layout;

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();
  const { t } = useI18n();
  const isMobile = !screens.md;
  const isXs = !!screens.xs;
  const [drawerOpen, setDrawerOpen] = useState(false);

const navItems = useMemo(
    () => [
      { key: "/", label: t("nav.home") },
      { key: "/projects", label: t("nav.projects") },
      { key: "/teams", label: t("nav.teams") },
      { key: "/about", label: t("nav.about") },
    ],
    [t],
  );

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith("/projects")) return "/projects";
    if (location.pathname.startsWith("/teams")) return "/teams";
    if (location.pathname.startsWith("/about")) return "/about";
    return "/";
  }, [location.pathname]);

  const onNavigate = (key: string) => {
    navigate(key);
    setDrawerOpen(false);
  };

  const rightControls = (
    <Space size={4} align="center" wrap style={{ width: "100%", justifyContent: "flex-end" }}>
      <ThemeSwitch />
      <LangSwitch />
      <UserMenu />
    </Space>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
          background: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Button
          type="text"
          icon={<ThunderboltOutlined />}
          onClick={() => onNavigate("/")}
          style={{ height: 48, fontWeight: 700, fontSize: 18, color: token.colorText, flexShrink: 0 }}
        >
          {!isXs && "DevInfinity"}
        </Button>

        {isMobile ? (
          <>
            <Button
              aria-label="Меню"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
              style={{ marginLeft: "auto" }}
            />
            <Drawer
              title="DevInfinity"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              placement="right"
              size={260}
            >
              <Menu
                mode="vertical"
                selectedKeys={[selectedKey]}
                items={navItems}
                onClick={({ key }) => onNavigate(key)}
              />
              <div style={{ borderTop: `1px solid ${token.colorBorderSecondary}`, paddingTop: 16, marginTop: 16 }}>
                {rightControls}
              </div>
            </Drawer>
          </>
        ) : (
          <>
            <Menu
              mode="horizontal"
              style={{ flex: 1, minWidth: 0, background: "transparent", borderBottom: "none" }}
              selectedKeys={[selectedKey]}
              items={navItems}
              onClick={({ key }) => onNavigate(key)}
            />
            <Space size={4} align="center">
              <ThemeSwitch />
              <LangSwitch />
              <UserMenu />
            </Space>
          </>
        )}
      </Header>
      <Content style={{ padding: "24px", maxWidth: 1200, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Content>
      <FloatButton.BackTop tooltip={t("backToTop")} />
      <AppFooter />
    </Layout>
  );
}