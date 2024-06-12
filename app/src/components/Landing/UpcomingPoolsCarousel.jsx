import { Carousel, Row, Space } from "antd";
import PoolCard from "./PoolCard";

const UpcomingPoolsCarousel = () => {
  const pools = [
    {
      name: "NAME",
      isLive: true,
      isRefundable: true,
      targetedRaise: "4,00,000 USDT",
      tokenPrice: "0.0151 USDT",
      startDate: "31 MAY 2024, 11AM UTC",
      endDate: "12 JUNE 2024, 4PM UTC",
    },
    {
      name: "NAME",
      isLive: true,
      isRefundable: true,
      targetedRaise: "4,00,000 USDT",
      tokenPrice: "0.0151 USDT",
      startDate: "31 MAY 2024, 11AM UTC",
      endDate: "12 JUNE 2024, 4PM UTC",
    },
    {
      name: "NAME",
      isLive: false,
      isRefundable: false,
      targetedRaise: "4,00,000 USDT",
      tokenPrice: "0.0151 USDT",
      startDate: "31 MAY 2024, 11AM UTC",
      endDate: "12 JUNE 2024, 4PM UTC",
    },
  ];

  return (
    <Carousel
      autoplay
      arrows
      dots={false}
      slidesToShow={3}
      slidesToScroll={1}
      responsive={[
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {pools.map((pool, index) => (
        <div key={index}>
          <PoolCard
            name={pool.name}
            isLive={pool.isLive}
            isRefundable={pool.isRefundable}
            targetedRaise={pool.targetedRaise}
            tokenPrice={pool.tokenPrice}
            startDate={pool.startDate}
            endDate={pool.endDate}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default UpcomingPoolsCarousel;
