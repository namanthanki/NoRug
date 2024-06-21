import { Row, Col } from "antd";
import TokenSaleCard from "./TokenSaleCard";

const TokenSalesDashboard = () => {
  const tokenSales = [
    {
      name: "Project Alpha",
      description: "Revolutionary DeFi platform",
      totalRaised: "400,000",
      tokenPrice: "0.0025",
      progress: 100,
      target: "400000",
      currency: "USDT",
      imageSrc: "https://picsum.photos/seed/alpha/400/200",
    },
    {
      name: "Beta Chain",
      description: "Next-gen blockchain solution",
      totalRaised: "250,000",
      tokenPrice: "0.005",
      progress: 62.5,
      target: "400000",
      currency: "USDT",
      imageSrc: "https://picsum.photos/seed/beta/400/200",
    },
    {
      name: "Gamma Protocol",
      description: "Decentralized oracle network",
      totalRaised: "180,000",
      tokenPrice: "0.0018",
      progress: 45,
      target: "400000",
      currency: "USDT",
      imageSrc: "https://picsum.photos/seed/gamma/400/200",
    },
    {
      name: "Delta Finance",
      description: "Cross-chain lending platform",
      totalRaised: "320,000",
      tokenPrice: "0.003",
      progress: 80,
      target: "400000",
      currency: "USDT",
      imageSrc: "https://picsum.photos/seed/delta/400/200",
    },
  ];

  return (
    <>
      <Row gutter={[24, 24]}>
        {tokenSales.map((sale, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <TokenSaleCard {...sale} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TokenSalesDashboard;
