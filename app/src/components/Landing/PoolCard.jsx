import { Card, Typography, Button, Divider, Space, Tag } from "antd";
import { DollarCircleOutlined, PictureOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PoolCard = () => {
  return (
    <Card style={{ borderRadius: 10 }}>
      <div style={{ textAlign: "center" }}>
        <PictureOutlined style={{ fontSize: 48, marginBottom: 16 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
        <Tag color="red">LIVE</Tag>
        <Tag color="blue">REFUNDABLE</Tag>
      </div>
      <Title level={3}>NAME</Title>
      <Text style={{ display: "block", marginBottom: 16 }}>
        Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      </Text>
      <Card style={{ backgroundColor: "#f5f5f5", borderRadius: 10, textAlign: "center" }}>
        <Space direction="vertical">
          <DollarCircleOutlined style={{ fontSize: 32 }} />
          <Title style={{ margin: 0 }} level={4}>
            4,00,000 USDT
          </Title>
          <Text type="secondary">Targeted Raise</Text>
        </Space>
      </Card>
      <Divider />
      <Text type="secondary">Token Price</Text>
      <Title style={{ margin: 0 }} level={5}>
        0.0159 USDT
      </Title>
      <Divider />
      <Text type="secondary">From</Text>
      <Title style={{ margin: 0 }} level={5}>
        31 MAY 2024, 11AM UTC
      </Title>
      <Text type="secondary">To</Text>
      <Title style={{ margin: 0 }} level={5}>
        12 JUNE 2024, 1PM UTC
      </Title>
      <Button type="primary" block style={{ marginTop: 16 }}>
        Participate
      </Button>
    </Card>
  );
};

export default PoolCard;
