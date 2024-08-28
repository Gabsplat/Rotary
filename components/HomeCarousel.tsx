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
        <HomeCarouselSlide
          titulo="Maratón 2024"
          descripcion="Sumate a Corriendo por la Visión Futura. Tu participación este año permitirá que más chicos de Mendoza tengan acceso a una mejor salud visual. ¡Corramos juntos por un futuro más claro!"
          link="/maraton"
          urlImg="/maraton/hero.jpg"
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
      <Link href={link} className="embla__slide_home text-white">
        <Container className="flex h-full items-end pb-12 md:items-center z-10">
          <div>
            <h2 className="font-sans text-5xl mb-4">{titulo}</h2>
            <p className="md:max-w-[40%] text-lg font-normal">{descripcion}</p>
            <Link
              className="bg-blue-rotary mt-4 inline-block text-white px-3 sm:px-8 py-1 sm:py-2 font-semibold sm:font-bold"
              href="/maraton"
            >
              INSCRIBITE ACÁ <ExternalLink size={16} className="inline ml-2" />
            </Link>
          </div>
        </Container>
        <img
          src={urlImg}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50 -z-10"
        />
      </Link>
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
