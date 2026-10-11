import { App as AntApp, ConfigProvider, theme } from "antd";
import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./theme/ThemeProvider";
import { useTheme } from "./theme/useTheme";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { useI18n } from "./i18n/useI18n";
import { AuthProvider } from "./auth/AuthProvider";

function AppEffects() {
  const { mode } = useTheme();
  const { token } = theme.useToken();

  useEffect(() => {
    const { colorBgLayout, colorBgContainer, colorText } = token;
    document.documentElement.style.colorScheme = mode;
    document.body.style.backgroundColor = colorBgLayout;
    document.body.style.color = colorText;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", colorBgContainer);
  }, [token, mode]);

  return null;
}

function ConfiguredApp() {
  const { mode } = useTheme();
  const { lang } = useI18n();

  return (
    <ConfigProvider
      locale={lang === "ru" ? ruRU : enUS}
      theme={{
        algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
        },
      }}
    >
      <AppEffects />
      <AntApp>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ConfiguredApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}