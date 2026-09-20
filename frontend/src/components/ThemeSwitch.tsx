import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "../theme/useTheme";
import { useI18n } from "../i18n/useI18n";

export default function ThemeSwitch() {
  const { mode, toggle } = useTheme();
  const { t } = useI18n();
  const label = mode === "dark" ? t("theme.toLight") : t("theme.toDark");

  return (
    <Button
      type="text"
      icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
      title={label}
      aria-label={label}
      onClick={toggle}
    />
  );
}