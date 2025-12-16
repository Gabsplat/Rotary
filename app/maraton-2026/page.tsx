"use client";

import Container from "@/components/Container";
import {
  Calendar,
  Clock,
  ExternalLink,
  LandPlot,
  MapPin,
  Medal,
  Timer,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20 min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-rotary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-orange-rotary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-pink-rotary/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10 py-8 md:py-12">
        <HeroMaraton />
        <InfoCards />
        <CountdownSection />
      </Container>
    </main>
  );
}

function HeroMaraton() {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Left Content */}
      <section className="w-full lg:w-1/2 order-2 lg:order-1">
        {/* Edition Badge */}
        <div className="inline-flex items-baseline gap-3 mb-6">
          <img
            src="/maraton-2026/logo.svg"
            alt="Maratón Rotaria 2026"
            className="h-28 object-contain"
          />
        </div>
        {/* <div className="inline-flex items-baseline gap-3 mb-6">
          <div className="relative">
            <span className="text-7xl sm:text-8xl lg:text-9xl font-black text-blue-rotary leading-none">
              11
            </span>
            <span className="absolute -top-2 -right-8 text-2xl sm:text-3xl font-bold text-orange-rotary">
              va
            </span>
          </div>
        </div>


        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-rotary leading-tight mb-2">
          MARATÓN
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-rotary leading-tight mb-8">
          ROTARIA
        </h2> */}

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 font-medium mb-10 max-w-md">
          Corriendo por la{" "}
          <span className="text-blue-rotary font-bold">Visión Futura</span>
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#"
            target="_blank"
            className="group relative overflow-hidden bg-gradient-to-r from-orange-rotary to-orange-500 px-10 py-5 text-white font-bold text-xl shadow-lg shadow-orange-rotary/30 hover:shadow-xl hover:shadow-orange-rotary/40 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              SACA TU ENTRADA
              <ExternalLink
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-rotary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Quick Info Pills */}
        <div className="flex flex-wrap gap-3 mt-8">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm border border-slate-100">
            <Calendar size={18} className="text-blue-rotary" />
            <span className="text-md font-semibold text-slate-700">
              12 Abril 2026
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm border border-slate-100">
            <MapPin size={18} className="text-orange-rotary" />
            <span className="text-md font-semibold text-slate-700">
              Parque San Martín
            </span>
          </div>
        </div>
      </section>

      {/* Right Image */}
      <aside className="w-full lg:flex-1 order-1 lg:order-2">
        <div className="relative">
          {/* Main Image */}
          <div className="relative overflow-hidden shadow-2xl shadow-blue-rotary/20">
            <img
              src="/maraton-2026/carousel.jpeg"
              alt="Maratón Rotaria 2026"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-rotary/40 via-transparent to-transparent" />

            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-rotary to-blue-600 flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Unite a
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      +1000 corredores
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-green-rotary">
                  <span className="w-2 h-2 bg-green-rotary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">
                    Inscripciones abiertas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-rotary/10 rounded-full blur-xl" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-rotary/10 rounded-full blur-xl" />
        </div>
      </aside>
    </section>
  );
}

function InfoCards() {
  const cards = [
    {
      icon: LandPlot,
      label: "LARGADA",
      value: "Parque General San Martín",
      sublabel: "Mendoza, Argentina",
      gradient: "from-blue-rotary to-blue-600",
      delay: "0ms",
    },
    {
      icon: Calendar,
      label: "FECHA",
      value: "12 de Abril de 2026",
      sublabel: "¡Anotá la fecha!",
      gradient: "from-orange-rotary to-orange-500",
      delay: "100ms",
    },
    {
      icon: Medal,
      label: "CATEGORÍAS",
      value: "2.6KM y 10KM",
      sublabel: "Participativa y Competitiva",
      gradient: "from-pink-rotary to-pink-500",
      delay: "200ms",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-24">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          style={{ animationDelay: card.delay }}
        >
          {/* Icon */}
          <div
            className={`w-14 h-14 bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <card.icon size={28} className="text-white" />
          </div>

          {/* Content */}
          <span className="text-sm font-bold text-slate-400 tracking-wider">
            {card.label}
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-1 mb-1">
            {card.value}
          </h3>
          <p className="text-sm text-slate-500">{card.sublabel}</p>

          {/* Decorative corner */}
          <div
            className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-5`}
          />
        </div>
      ))}
    </section>
  );
}

function CountdownSection() {
  return (
    <section className="mt-16 lg:mt-24 text-center">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <Timer size={24} className="text-blue-rotary" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* Categories Detail */}
      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
        Elegí tu <span className="text-blue-rotary">categoría</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Participativa */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-rotary to-blue-700 p-8 text-white shadow-xl shadow-blue-rotary/20">
          <div className="relative z-10">
            <span className="text-sm font-medium opacity-80">Categoría</span>
            <h4 className="text-3xl font-black mt-1 mb-2">PARTICIPATIVA</h4>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-5xl font-black">2.6</span>
              <span className="text-2xl font-bold">KM</span>
            </div>
            <p className="text-sm opacity-80 mt-4">
              Ideal para toda la familia
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
        </div>

        {/* Competitiva */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-rotary to-orange-600 p-8 text-white shadow-xl shadow-orange-rotary/20">
          <div className="relative z-10">
            <span className="text-sm font-medium opacity-80">Categoría</span>
            <h4 className="text-3xl font-black mt-1 mb-2">COMPETITIVA</h4>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-5xl font-black">10</span>
              <span className="text-2xl font-bold">KM</span>
            </div>
            <p className="text-sm opacity-80 mt-4">
              Para corredores experimentados
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 max-w-3xl mx-auto bg-white/60 backdrop-blur-sm p-8 border border-slate-100 shadow-lg">
        <h4 className="text-xl font-bold text-blue-rotary mb-4">
          🎯 Nuestra Misión
        </h4>
        <p className="text-slate-600 leading-relaxed">
          Con tu participación ayudamos a mejorar la{" "}
          <strong className="text-blue-rotary">
            salud visual de niños en edad escolar
          </strong>{" "}
          de bajos recursos en Mendoza. En las últimas 10 ediciones hemos
          entregado{" "}
          <strong className="text-orange-rotary">más de 300 anteojos</strong> a
          estudiantes que lo necesitaban.
        </p>
      </div>
    </section>
  );
}
