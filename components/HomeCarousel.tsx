"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Container from "./Container";

export function HomeCarousel() {
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
    <div className="embla w-full bg-blue-400" ref={emblaRef}>
      <div className="embla__container">
        <HomeCarouselSlide
          titulo="Titulo 1"
          descripcion="Descripcion 1"
          urlImg="https://placehold.co/1920x1080"
        />
        <HomeCarouselSlide
          titulo="Titulo 2"
          descripcion="Descripcion 2"
          urlImg="https://placehold.co/1920x1080"
        />
        <HomeCarouselSlide
          titulo="Titulo 3"
          descripcion="Descripcion 3"
          urlImg="https://placehold.co/1920x1080"
        />
      </div>
    </div>
  );
}

const HomeCarouselSlide = ({
  titulo,
  descripcion,
  urlImg,
}: {
  titulo: string;
  descripcion: string;
  urlImg: string;
}) => {
  return (
    <div
      className="embla__slide_home"
      style={{
        backgroundImage: `url(${urlImg})`,
        backgroundSize: "cover",
      }}
    >
      <Container className="flex h-full items-center">
        <div>
          <h2 className="font-sans text-5xl mb-4">{titulo}</h2>
          <p>{descripcion}</p>
        </div>
      </Container>
    </div>
  );
};
