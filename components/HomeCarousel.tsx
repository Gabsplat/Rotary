"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
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
    <section className="embla w-full" ref={emblaRef}>
      <div className="embla__container">
        {/* <HomeCarouselSlide
          titulo="Maratón 2024"
          descripcion="Gracias por participar en Corriendo por la Visión Futura. Tu apoyo este año permitió que más chicos de Mendoza tengan acceso a una mejor salud visual. ¡Juntos corrimos por un futuro más claro!"
          link="/maraton"
          urlImg="/maraton/hero.jpg"
        /> */}
        <HomeCarouselSlide
          titulo="Maratón 2026"
          descripcion="¡Vuelve el evento que nos une! Preparate para recorrer Mendoza y superar tus propios límites en una nueva edición solidaria."
          link="/maraton-2026"
          urlImg="/maraton-2026/carousel.jpeg"
        />
        {/* <HomeCarouselSlide
          titulo="Titulo 2"
          descripcion="Descripcion 2"
          urlImg="https://placehold.co/1920x1080"
        /> */}
      </div>
    </section>
  );
}

const HomeCarouselSlide = ({
  titulo,
  descripcion,
  urlImg,
  link,
}: {
  titulo: string;
  descripcion: string;
  urlImg: string;
  link?: string;
}) => {
  if (link) {
    return (
      <div className="embla__slide_home text-white bg-gradient-to-t md:bg-gradient-to-r from-blue-rotary to-transparent">
        <Container className="flex h-full items-end pb-12 md:items-center z-10">
          <div>
            <h2 className="font-sans font-semibold text-5xl mb-4">{titulo}</h2>
            <p className="md:max-w-[50%] text-lg font-normal">{descripcion}</p>
            <Link
              className="bg-white mt-4 inline-block text-blue-rotary px-4 sm:px-8 py-2 sm:py-3 font-semibold sm:font-bold hover:scale-105 transition-all duration-300"
              href={link}
            >
              VER MÁS <ExternalLink size={16} className="inline ml-2" />
            </Link>
          </div>
        </Container>
        <img
          src={urlImg}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover brightness-90 -z-10"
        />
      </div>
    );
  }

  return (
    <div
      className="embla__slide_home text-white"
      style={{
        backgroundImage: `url(${urlImg})`,
        backgroundSize: "cover",
      }}
    >
      <Container className="flex h-full items-center z-10">
        <div>
          <h2 className="font-sans text-5xl mb-4">{titulo}</h2>
          <p className="max-w-40">{descripcion}</p>
        </div>
      </Container>
      <img
        src={urlImg}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 -z-10"
      />
    </div>
  );
};
