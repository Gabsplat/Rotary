import Container from "@/components/Container";
import { HomeCarousel } from "@/components/HomeCarousel";
import {
  Calendar,
  Earth,
  HeartHandshake,
  LucideIcon,
  LucideProps,
  Shovel,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10">
      <HomeCarousel />
      <QueEsRotary />
      <ContribucionesCatchy />
      <QuienesSomos />
    </main>
  );
}

function ContribucionesCatchy() {
  return (
    <Container
      wrapper="section"
      className="flex flex-col sm:flex-row w-full gap-16 sm:gap-4 justify-around py-10 sm:py-14"
    >
      <ContribucionCard
        numero={1.4}
        titulo="millones"
        icono={Earth}
        colorIcono="green"
        descripcion="de socios en todo el mundo"
      />
      <ContribucionCard
        numero={1.4}
        titulo="millones"
        icono={Shovel}
        colorIcono="#5E18B8"
        descripcion="de horas de trabajo voluntario anualmente"
      />
      <ContribucionCard
        numero={333}
        titulo="millones USD"
        icono={HeartHandshake}
        colorIcono="#F9C53F"
        descripcion="destinados a iniciativas de servicio en el mundo (en 2020-21)"
      />
    </Container>
  );
}

function ContribucionCard({
  numero,
  titulo,
  icono: Icon,
  colorIcono,
  descripcion,
}: {
  numero: number;
  titulo: string;
  icono: LucideIcon;
  colorIcono?: string;
  descripcion: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <div className="text-right">
          <span className="text-4xl font-bold">{numero}</span>
          <span className="text-xl block font-medium leading-4">{titulo}</span>
        </div>
        <Icon size={58} color={colorIcono || "black"} />
      </div>
      <span className="text-[#424242] font-medium text-center max-w-72">
        {descripcion}
      </span>
    </div>
  );
}

function QueEsRotary() {
  return (
    <Container
      wrapper="section"
      className="flex flex-col-reverse md:flex-row items-center gap-4 sm:gap-10 md:gap-28 mt-20"
    >
      <div className="flex-1 flex flex-col">
        <h2 className="font-open text-3xl sm:text-4xl font-medium text-blue-rotary mt-3 mb-4 sm:mt-0">
          Qué es Rotary
        </h2>
        <p className="text-lg mb-2">
          La vida es breve y es esencial reflexionar sobre cómo queremos
          vivirla. Podemos enfocarnos únicamente en nuestros objetivos
          personales o, sin descuidar lo propio, trabajar para dejar un mundo
          mejor.{" "}
          <b>Rotary ofrece un camino para vivir de manera significativa</b>,
          centrándose en lo que realmente importa y encontrando formas de
          enriquecer el mundo. Además, valora las amistades y nos impulsa a dar
          lo mejor de nosotros mismos. A menudo, dedicamos tiempo a metas
          insignificantes, pero al final de la vida, lo que realmente importa es
          cómo hemos contribuido a mejorar la condición humana. Todos{" "}
          <b>
            tenemos algo que ofrecer para cambiar la vida de los demás y dejar
            una huella en el mundo
          </b>
          . Rotary nos empodera para dejar una marca tangible y duradera.
        </p>
        <Link
          className="bg-blue-rotary self-end text-white px-8 sm:px-12 py-2 font-bold block text-center w-full sm:w-fit mt-10 sm:mt-6 md:mt-0"
          target="_blank"
          href="https://www.eventbrite.com.ar/e/maraton-rotaria-10-edicion-tickets-965235624737?aff=oddtdtcreator"
        >
          SABER MÁS
        </Link>
      </div>
      <img
        src="/servicio_1.jpg"
        alt=""
        className="hidden w-full sm:block md:w-1/2"
      />
    </Container>
  );
}

function QuienesSomos() {
  return (
    <Container className="mb-10">
      <h2 className="text-4xl text-blue-rotary">Quienes somos</h2>
      <p className="mt-6 text-lg">
        El Rotary Club Mendoza Sur, parte del Distrito 4851 de Rotary
        International,{" "}
        <b>fue fundado en 1968 y realiza reuniones semanales los martes</b>.{" "}
        <b>Durante más de 55 años</b>, ha llevado a cabo numerosas actividades
        para mejorar la convivencia social, incluyendo{" "}
        <b>
          donaciones, edición de libros, becas, y apadrinamiento de escuelas y
          hogares de ancianos, creación de bosquecillos rotarios
        </b>
        . También ha entregado banderas argentinas y botiquines de primeros
        auxilios a escuelas primarias, y ha dictado un curso gratuito de
        mediación escolar en las escuelas públicas de nivel medio de la ciudad
        de Mendoza. Actualmente,{" "}
        <b>
          el club tiene proyectos para mejorar la visión de niños de escasos
          recursos y realizar donaciones y plantaciones en escuelas y espacios
          públicos del Gran Mendoza
        </b>
        . Una de las actividades más destacadas del Club es la Maratón Rotaria
        “Corriendo por la Visión Futura”, que celebrará su décima edición el
        póximo 15 de septiembre.
      </p>
    </Container>
  );
}
