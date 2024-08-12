"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const images: string[] = [
  "/maraton/controles/foto1_fix.jpg",
  "/maraton/controles/foto2.jpg",
  "/maraton/controles/foto3.jpg",
  "/maraton/controles/foto4.jpg",
  "/maraton/controles/foto5.jpg",
  "/maraton/controles/foto6.jpg",
  "/maraton/controles/foto7.jpg",
  "/maraton/controles/foto8.jpg",
];

export default function QueHemosHechoCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [
      // @ts-ignore
      Autoplay({
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        delay: 5000,
      }),
    ]
  );

  return (
    <div className="embla w-full mt-10" ref={emblaRef}>
      <div className="embla__container_done">
        {images.map((urlImg, index) => (
          <CarouselSlide key={index} urlImg={urlImg} />
        ))}
      </div>
    </div>
  );
}

const CarouselSlide = ({ urlImg }: { urlImg: string }) => {
  return (
    <div className="embla__slide_done overflow-hidden">
      <img src={urlImg} alt="" className="object-cover" />
    </div>
  );
};
