import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";

export default function BackButton({ fallback = "/" }: { fallback?: string }) {
  const { t } = useI18n();
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <Button type="link" icon={<ArrowLeftOutlined />} onClick={goBack} style={{ paddingLeft: 0, marginBottom: 8 }}>
      {t("back")}
    </Button>
  );
}