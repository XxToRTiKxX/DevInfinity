import { Typography, Divider } from "antd";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <>
      <Typography.Title level={2} style={{ marginTop: 0 }}>
        {title}
      </Typography.Title>
      {subtitle && (
        <Typography.Paragraph type="secondary" style={{ fontSize: 16 }}>
          {subtitle}
        </Typography.Paragraph>
      )}
      <Divider />
    </>
  );
}