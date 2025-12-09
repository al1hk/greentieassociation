import React from 'react';
import Slider from 'react-slick';
import { EventDetails } from '@/app/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface EventSliderProps {
  events: EventDetails[];
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 right-6 z-10 cursor-pointer"
      onClick={onClick}
    >
      <ChevronRight size={32} className="text-white/50 hover:text-white transition-colors" />
    </div>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 left-6 z-10 cursor-pointer"
      onClick={onClick}
    >
      <ChevronLeft size={32} className="text-white/50 hover:text-white transition-colors" />
    </div>
  );
}

const EventSlider: React.FC<EventSliderProps> = ({ events }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {events.map((event, index) => (
          <div key={index} className="relative h-[450px] rounded-lg overflow-hidden">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-white text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-slate-300 text-sm">{event.date}</p>
              <p className="text-white mt-2 max-w-2xl">{event.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventSlider;