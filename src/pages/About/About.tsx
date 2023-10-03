import React from 'react';
import Text from 'components/Text';
import styles from './About.module.scss';

const About: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['about-container']}>
      <Text view="title" weight="bold">
        Welcome to Lalasia - Your Ideal Home Oasis!
      </Text>

      <Text view="p-20" color="secondary">
        At Lalasia, we specialize in offering a diverse range of home products and solutions to help you create your
        dream living space. Our store is your go-to destination for all things home, providing high-quality, affordable
        options in various categories, each carefully designed to enhance your living environment.
      </Text>
      <div className={styles['about__categories-descriptions']}>
        <div>
          <Text view="p-20" weight="bold">
            Furniture:
          </Text>

          <Text view="p-20" color="secondary">
            Discover a wide array of stylish and functional furniture pieces that blend seamlessly with any decor,
            catering to different tastes and preferences.
          </Text>
        </div>

        <div>
          <Text view="p-20" weight="bold">
            Storage & Organisation Solutions:
          </Text>

          <Text view="p-20" color="secondary">
            Optimize your living spaces with our clever storage and organization solutions, making it easier to keep
            your home neat and tidy.
          </Text>
        </div>
        <div>
          <Text view="p-20" weight="bold">
            Lighting, Lamps & Shades:
          </Text>

          <Text view="p-20" color="secondary">
            Illuminate your space with our curated selection of lighting options, including lamps and shades that add
            warmth and ambiance to your home.
          </Text>
        </div>

        <div>
          {' '}
          <Text view="p-20" weight="bold">
            Beds & Mattresses:
          </Text>
          <Text view="p-20" color="secondary">
            Experience unparalleled comfort and relaxation with our range of beds and mattresses, designed to ensure a
            good night&apos;s sleep and enhance your well-being.
          </Text>
        </div>

        <div>
          <Text view="p-20" weight="bold">
            Outdoor Products:
          </Text>

          <Text view="p-20" color="secondary">
            Transform your outdoor spaces into inviting retreats with our outdoor products, perfect for relaxation and
            entertainment in the great outdoors.
          </Text>
        </div>

        <div>
          {' '}
          <Text view="p-20" weight="bold">
            Kitchenware & Tableware:
          </Text>
          <Text view="p-20" color="secondary">
            Elevate your dining experience with our elegant kitchenware and tableware collections, showcasing both style
            and functionality.
          </Text>
        </div>

        <div>
          <Text view="p-20" weight="bold">
            Kitchen Cabinets & Appliances:
          </Text>

          <Text view="p-20" color="secondary">
            Revamp your kitchen with our modern and efficient kitchen cabinets and appliances, tailored to meet your
            culinary needs and aesthetic preferences.
          </Text>
        </div>
        <div>
          <Text view="p-20" weight="bold">
            Plants, Pots & Hydroponics:
          </Text>

          <Text view="p-20" color="secondary">
            Bring nature into your home with our selection of plants, pots, and hydroponic solutions, adding a touch of
            greenery to your living space.
          </Text>
        </div>
        <div>
          <Text view="p-20" weight="bold">
            Home Electronics:
          </Text>

          <Text view="p-20" color="secondary">
            Stay up-to-date with the latest in home electronics, featuring cutting-edge technology that enhances your
            daily life and home entertainment.
          </Text>
        </div>
        <div>
          <Text view="p-20" weight="bold">
            Home Improvement:
          </Text>

          <Text view="p-20" color="secondary">
            Embark on home improvement projects with our range of products designed to enhance the functionality and
            aesthetics of your living spaces.
          </Text>
        </div>
        <Text view="p-20" color="secondary">
          At Lalasia, we strive to provide exceptional customer service, ensuring that your shopping experience is
          enjoyable and hassle-free. We invite you to explore our diverse offerings, find inspiration, and transform
          your home into a haven of comfort and style. Welcome to the Lalasia family!
        </Text>
        <div className={'horizontal-line'}></div>
      </div>
    </div>
  );
};

export default React.memo(About);
