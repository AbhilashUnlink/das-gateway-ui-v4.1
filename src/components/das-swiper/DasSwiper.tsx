import couselImage1 from '../../assets/authenticate-bg.jpg';
import './style.css';
import { t } from 'i18next';
import { Carousel } from 'antd';

const DasSwiper = () => {

    const crouselImages = [
        {
            heading: t('Simplifying Payments,'),
            mainTitle: t('Enable Growth'),
            description: t('Your all-in-one digital payment solutions provider, built to accelerate your business growth.'),
        },
        {
            heading: t('Solution Provider,'),
            mainTitle: t('Payment Methods'),
            description: t('Start accepting a wide variety of Payment Methods, choose from credit cards, e-wallets, over-the-counter payments and many more.'),
        },
        {
            heading: t('Fastening Payments,'),
            mainTitle: t('Empowering Growth'),
            description: t('Instantly accept online payments on your website or collect payments using our no code solutions.'),
        },
    ];

    return (
        <div
            className="das-swiper"
            style={{
                backgroundImage: `url(${couselImage1})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="swipe-content">
                <Carousel autoplay={{ dotDuration: true }} arrows dotPosition="bottom" autoplaySpeed={5000}>
                    {crouselImages?.map((item, index) => {
                        return (
                            <div className="swiper-captions" key={index}>
                                <h3>{item.heading}</h3>
                                <h2>{item.mainTitle}</h2>
                                <p>{item.description}</p>
                            </div>
                        );
                    })}
                </Carousel>

            </div>
        </div>
    );
};

export default DasSwiper;
