import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function HeroSlider() {
    const staticSlides = [
        {
            name: 'Mera Pass Tum Ho',
            image: '/images/Mere_Paas_Tum_Ho.png',
        },
        {
            name: 'Money Heist',
            image: '/images/Money_Heist.png',
        },
        {
            name: 'Punjab Nahi Jaungi',
            image: '/images/Punjab_Nahi_Jaungi.jpg',
        },
        {
            name: 'The Crown',
            image: '/images/The_Crown.jpg',
        },
        {
            name: 'The King Eternal Monarch',
            image: '/images/The_King_Eternal_Monarch.webp',
        },
    ];

    return (
        <div className="w-full h-[85vh]">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                modules={[Autoplay]}
                className="w-full h-full"
            >
                {staticSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full ">
                            <img
                                src={slide.image}
                                alt={slide.name}
                                className="w-full h-full object-fill opacity-70"
                            />
                            <div className="absolute bottom-8 left-10 bg-black/60 px-2 py-1 rounded text-5xl text-yellow-400 font-bold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                                {slide.name}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
