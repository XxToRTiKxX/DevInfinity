import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useI18n } from "../i18n/useI18n";

export default function LangSwitch() {
  const { lang, setLang } = useI18n();

  return (
    <Select
      variant="borderless"
      value={lang}
      onChange={setLang}
      style={{ width: 84 }}
      prefix={<GlobalOutlined />}
      aria-label="Language"
      options={[
        { value: "ru", label: "RU" },
        { value: "en", label: "EN" },
      ]}
    />
  );
}