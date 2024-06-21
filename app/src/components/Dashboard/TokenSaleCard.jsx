import { Card, Typography, Progress, Space, Tag, Button } from "antd";
import { DollarCircleOutlined, RocketOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text, Title } = Typography;

const TokenSaleCard = ({ name, description, totalRaised, tokenPrice, progress, target, currency, imageSrc }) => (
  <Card
    hoverable
    cover={<img alt={name} src={imageSrc} style={{ height: 200, objectFit: "cover" }} />}
    actions={[
      <Button type="link" key="view">
        View Details
      </Button>,
      <Button type="primary" icon={<RocketOutlined />} key="participate">
        Participate
      </Button>,
    ]}
  >
    <Meta
      title={
        <Title level={4} style={{ color: "#1890ff" }}>
          {name}
        </Title>
      }
      description={description}
    />
    <Space direction="vertical" style={{ width: "100%", marginTop: 16 }}>
      <Text strong>Total Raised</Text>
      <Title level={3} style={{ color: "#52c41a" }}>
        <DollarCircleOutlined /> {totalRaised} {currency}
      </Title>
      <Text>
        Token Price:{" "}
        <Tag color="blue">
          {tokenPrice} {currency}
        </Tag>
      </Text>
      <Progress percent={progress} status="active" strokeColor={{ from: "#108ee9", to: "#87d068" }} />
      <Text type="secondary">
        {totalRaised} / {target} {currency}
      </Text>
    </Space>
  </Card>
);

export default TokenSaleCard;
