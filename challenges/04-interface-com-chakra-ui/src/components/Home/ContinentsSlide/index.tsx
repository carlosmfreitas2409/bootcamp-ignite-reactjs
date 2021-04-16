import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { api } from '../../../services/api';

import { SlideItemDetails } from "./SlideItem";

SwiperCore.use([Navigation, Pagination]);

interface Continent {
  id: number;
  name: string;
  curiosity: string;
  carouselImg: string;
}

export function ContinentsSlide() {
  const [continents, setContinents] = useState<Continent[]>([]);

  useEffect(() => {
    api.get('/continents')
      .then(result => setContinents(result.data))
  }, []);

  return (
    <Box as="section" my={["6", "12"]}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination
      >
        {continents.map(continent => (
          <SwiperSlide key={continent.id}>
            <SlideItemDetails
              id={continent.id}
              name={continent.name}
              curiosity={continent.curiosity}
              imageSrc={continent.carouselImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}