import { Divider, Space } from "antd";
import { HeroSection, UpcomingPoolsCarousel } from "../components/Landing";

const LandingPage = () => {
  return (
    <div>
      <Space
        direction="vertical"
        size="large"
        style={{
          width: "100%",
        }}
      >
        <HeroSection />
        <Divider />
        <UpcomingPoolsCarousel />
      </Space>
    </div>
  );
};

export default LandingPage;
