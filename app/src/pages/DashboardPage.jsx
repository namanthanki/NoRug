import { Space, Typography } from "antd";
import { TokenSalesDashboard } from "../components/Dashboard";

const DashboardPage = () => {
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Typography.Title level={2}>Dashboard</Typography.Title>
        <TokenSalesDashboard />
      </Space>
    </div>
  );
};

export default DashboardPage;
