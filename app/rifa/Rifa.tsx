"use client";

import Container from "@/components/Container";
import { Eyebrow } from "@/components/ui";
import type { EstadoPublico } from "@/lib/rifa";
import { Check, Copy, Dices, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Boleto from "./Boleto";
import Confeti from "./Confeti";

const CLAVE_RESERVA = "rifa-reserva";
const MAX_COMPROBANTE = 4 * 1024 * 1024;
const SEGUNDOS_RESERVA = 15 * 60;

type Vendedor = { id: number; nombre: string };

type ConfigPublica = {
  nombre: string;
  precio: number;
  premio: string;
  sorteo: string;
  activa: boolean;
};

type Reserva = {
  token: string;
  numero: number;
  venceEn: string | null;
  alias: string;
  titular: string;
  precio: number;
};

type Paso =
  | { tipo: "datos"; numero: number }
  | { tipo: "pago"; reserva: Reserva }
  | { tipo: "enviado"; numero: number };

const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

async function pedir(url: string, init?: RequestInit) {
  const respuesta = await fetch(url, init);
  const cuerpo = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok)
    throw new Error(cuerpo.error || "No pudimos procesar el pedido.");
  return cuerpo;
}

export default function Rifa({
  config,
  numerosIniciales,
  vendedores,
  vendedorInicial,
}: {
  config: ConfigPublica;
  numerosIniciales: EstadoPublico[];
  vendedores: Vendedor[];
  vendedorInicial?: number;
}) {
  const [numeros, setNumeros] = useState(numerosIniciales);
  const [elegido, setElegido] = useState<number | null>(null);
  const [asomado, setAsomado] = useState<number | null>(null);
  const [ruleta, setRuleta] = useState<number | null>(null);
  const [paso, setPaso] = useState<Paso | null>(null);
  const [reservaGuardada, setReservaGuardada] = useState<Reserva | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const temporizadores = useRef<ReturnType<typeof setTimeout>[]>([]);

  const actualizar = useCallback(async () => {
    try {
      setNumeros((await pedir("/api/rifa/estado")).numeros);
    } catch {
      // Se reintenta en el próximo ciclo.
    }
  }, []);

  useEffect(() => {
    const intervalo = setInterval(actualizar, 10_000);
    return () => clearInterval(intervalo);
  }, [actualizar]);

  useEffect(() => {
    const pendientes = temporizadores.current;
    return () => pendientes.forEach(clearTimeout);
  }, []);

  // Retoma una reserva en curso si el comprador recargó o cerró la página.
  useEffect(() => {
    const token = localStorage.getItem(CLAVE_RESERVA);
    if (!token) return;
    pedir(`/api/rifa/reserva?token=${encodeURIComponent(token)}`)
      .then(({ reserva }) => {
        if (reserva?.estado === "reservada")
          setReservaGuardada({ token, ...reserva });
        else localStorage.removeItem(CLAVE_RESERVA);
      })
      .catch(() => {});
  }, []);

  // Si otra persona se lleva el número mientras lo mirabas, se suelta.
  useEffect(() => {
    if (elegido !== null && numeros[elegido - 1] !== "disponible")
      setElegido(null);
  }, [numeros, elegido]);

  const girando = ruleta !== null;
  const libres = numeros.filter((estado) => estado === "disponible").length;
  const tomados = numeros.length - libres;
  const precio = config.precio > 0 ? pesos.format(config.precio) : undefined;
  const vendedor = vendedores.find((v) => v.id === vendedorInicial);

  // Recorre números libres cada vez más lento hasta frenar en uno.
  function tentarSuerte() {
    const candidatos = numeros.flatMap((estado, i) =>
      estado === "disponible" ? [i + 1] : []
    );
    if (candidatos.length === 0 || girando) return;
    const alAzar = () =>
      candidatos[Math.floor(Math.random() * candidatos.length)];
    const ganador = alAzar();
    setBusqueda("");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setElegido(ganador);
      return;
    }
    setElegido(null);
    const PASOS = 20;
    let demora = 0;
    for (let k = 0; k < PASOS; k++) {
      demora += 45 + k * k * 0.9;
      temporizadores.current.push(
        setTimeout(() => setRuleta(k === PASOS - 1 ? ganador : alAzar()), demora)
      );
    }
    temporizadores.current.push(
      setTimeout(() => {
        setRuleta(null);
        setElegido(ganador);
      }, demora + 450)
    );
  }

  function buscar(valor: string) {
    const limpio = valor.replace(/\D/g, "").slice(0, 3);
    setBusqueda(limpio);
    const numero = Number(limpio);
    if (numero >= 1 && numero <= numeros.length && numeros[numero - 1] === "disponible")
      setElegido(numero);
  }

  const elegir = useCallback((numero: number) => {
    setBusqueda("");
    setElegido((actual) => (actual === numero ? null : numero));
  }, []);

  function cerrar() {
    setPaso(null);
    actualizar();
  }

  const buscado = Number(busqueda);
  const estadoBuscado = busqueda ? numeros[buscado - 1] : undefined;
  const enBoleto = ruleta ?? asomado ?? elegido;

  return (
    <>
      <section className="rifa-escenario relative text-white">
        <div className="rifa-estrellas" />
        <Container className="relative pt-10 pb-28 lg:pt-16 lg:pb-32">
          {!config.activa && (
            <p className="mb-8 rounded-2xl border border-gold-rotary/60 bg-gold-rotary/15 px-5 py-4 text-sm font-semibold text-gold-rotary">
              Modo de prueba: la rifa todavía no está habilitada. Las reservas
              que se hagan ahora no son válidas.
            </p>
          )}
          {reservaGuardada && !paso && (
            <button
              onClick={() => setPaso({ tipo: "pago", reserva: reservaGuardada })}
              className="mb-8 w-full rounded-2xl bg-gold-rotary px-5 py-4 text-left text-sm font-bold text-ink transition-colors hover:bg-white"
            >
              Tenés el número {reservaGuardada.numero} reservado. Tocá acá para
              enviar el comprobante.
            </button>
          )}

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Eyebrow dark>Rifa solidaria</Eyebrow>
                <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[0.98] tracking-tight text-balance">
                  {config.nombre}
                </h1>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                  Cien números, un ganador.{" "}
                  <span className="font-display italic text-gold-rotary">
                    ¿Cuál es el tuyo?
                  </span>
                </p>
                {vendedor && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                    <span className="h-2 w-2 rounded-full bg-gold-rotary" />
                    Te lo ofrece {vendedor.nombre}
                  </p>
                )}
                <Boleto
                  numero={enBoleto}
                  premio={config.premio}
                  precio={precio}
                  className="mx-auto mt-8 w-full max-w-[15rem] sm:mt-10 sm:max-w-[19rem] lg:mx-0"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="font-display text-5xl tracking-tight tabular-nums text-gold-rotary">
                      {libres}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-white/60">
                      {libres === 1 ? "número libre" : "números libres"}
                    </span>
                  </div>
                  <span className="pb-1 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                    {tomados} de {numeros.length} tomados
                  </span>
                </div>
                <div
                  className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={numeros.length}
                  aria-valuenow={tomados}
                >
                  <div
                    className="rifa-progreso h-full rounded-full"
                    style={{ width: `${(tomados / numeros.length) * 100}%` }}
                  />
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={tentarSuerte}
                    disabled={girando || libres === 0}
                    className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-gold-rotary px-6 py-3.5 text-sm font-bold tracking-wide text-ink transition-colors hover:bg-white disabled:opacity-60"
                  >
                    <Dices
                      size={20}
                      className={`transition-transform duration-500 group-hover:rotate-180 ${
                        girando ? "animate-spin" : ""
                      }`}
                    />
                    {girando ? "Girando…" : "Que decida la suerte"}
                  </button>
                  <label className="relative flex-1">
                    <span className="sr-only">Buscar un número</span>
                    <Search
                      size={18}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50"
                    />
                    <input
                      value={busqueda}
                      onChange={(evento) => buscar(evento.target.value)}
                      inputMode="numeric"
                      placeholder="¿Tenés un número favorito?"
                      className="w-full rounded-full border border-white/20 bg-transparent py-3.5 pl-12 pr-5 text-sm font-semibold text-white outline-none placeholder:font-normal placeholder:text-white/40 focus:border-gold-rotary"
                    />
                  </label>
                </div>
                <p className="mt-3 min-h-[1.25rem] text-sm text-white/60" aria-live="polite">
                  {estadoBuscado === "disponible" && `El ${buscado} está libre. Es tuyo si lo querés.`}
                  {estadoBuscado === "reservado" && `El ${buscado} está reservado por otra persona.`}
                  {estadoBuscado === "vendido" && `El ${buscado} ya se vendió. Probá con otro.`}
                  {busqueda && !estadoBuscado && `Los números van del 1 al ${numeros.length}.`}
                </p>

                <div
                  className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-2.5"
                  onPointerLeave={() => setAsomado(null)}
                >
                  {numeros.map((estado, i) => (
                    <Bolilla
                      key={`${i}-${estado}`}
                      numero={i + 1}
                      estado={estado}
                      elegida={elegido === i + 1}
                      encendida={ruleta === i + 1}
                      bloqueada={girando}
                      onElegir={elegir}
                      onAsomar={setAsomado}
                    />
                  ))}
                </div>

                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-white/60">
                  <Leyenda className="border border-white/25" texto="Libre" />
                  <Leyenda className="border border-dashed border-gold-rotary/70" texto="Reservado" />
                  <Leyenda className="bg-white/10" texto="Vendido" />
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="overflow-hidden bg-gold-rotary py-3 text-ink" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-[0.22em]">
          {[0, 1].map((copia) => (
            <span key={copia} className="flex gap-10">
              {[
                `Quedan ${libres} números`,
                config.premio && `Premio: ${config.premio}`,
                precio && `${precio} el número`,
                config.sorteo && `Sorteo: ${config.sorteo}`,
                "A beneficio del Rotary Club Mendoza Sur",
              ]
                .filter(Boolean)
                .flatMap((texto) => [texto, "✦"])
                .map((texto, i) => (
                  <span key={i}>{texto}</span>
                ))}
            </span>
          ))}
        </div>
      </div>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Cómo se juega</Eyebrow>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight text-balance">
              Tres pasos y el número es{" "}
              <span className="italic text-blue-rotary">tuyo.</span>
            </h2>
            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {config.premio && <Dato etiqueta="Premio" valor={config.premio} />}
              {precio && <Dato etiqueta="Valor del número" valor={precio} />}
              {config.sorteo && <Dato etiqueta="Sorteo" valor={config.sorteo} />}
            </dl>
          </div>
          <ol className="grid gap-4 lg:col-span-6 lg:col-start-7">
            <PasoJuego
              n={1}
              titulo="Elegí tu número"
              texto="Tocá el que más te guste, buscá tu favorito o dejá que la suerte elija por vos."
            />
            <PasoJuego
              n={2}
              titulo="Reservalo y transferí"
              texto="Queda guardado a tu nombre durante 15 minutos mientras hacés la transferencia."
            />
            <PasoJuego
              n={3}
              titulo="Enviá el comprobante"
              texto="Un socio del club verifica que el pago ingresó y el número queda definitivamente a tu nombre."
            />
          </ol>
        </Container>
      </section>

      {elegido !== null && !paso && !girando && (
        <div className="rifa-barra fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
          <div className="mx-auto flex max-w-xl items-center gap-4 rounded-full bg-white py-2.5 pl-2.5 pr-3 shadow-2xl shadow-ink/40 ring-1 ring-ink/10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-rotary font-display text-xl tabular-nums text-ink">
              {elegido}
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold leading-tight text-ink">
              El {elegido} está libre
              {precio && <span className="block font-normal text-ink/60">{precio}</span>}
            </span>
            <button
              onClick={() => setPaso({ tipo: "datos", numero: elegido })}
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-blue-rotary"
            >
              Lo quiero
            </button>
            <button
              onClick={() => setElegido(null)}
              aria-label="Soltar el número"
              className="rounded-full p-2 text-ink/50 hover:bg-ink/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {paso && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/80 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="rifa-hoja relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-paper p-6 text-ink sm:rounded-[2rem] sm:p-8">
            <button
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-ink/60 hover:bg-ink/10"
            >
              <X size={20} />
            </button>
            {paso.tipo === "datos" && (
              <FormularioDatos
                numero={paso.numero}
                vendedores={vendedores}
                vendedorInicial={vendedorInicial}
                onReservado={(reserva) => {
                  localStorage.setItem(CLAVE_RESERVA, reserva.token);
                  setReservaGuardada(reserva);
                  setElegido(null);
                  setPaso({ tipo: "pago", reserva });
                  actualizar();
                }}
              />
            )}
            {paso.tipo === "pago" && (
              <Pago
                reserva={paso.reserva}
                onEnviado={() => {
                  localStorage.removeItem(CLAVE_RESERVA);
                  setReservaGuardada(null);
                  setPaso({ tipo: "enviado", numero: paso.reserva.numero });
                  actualizar();
                }}
              />
            )}
            {paso.tipo === "enviado" && (
              <Enviado
                numero={paso.numero}
                config={config}
                precio={precio}
                onCerrar={cerrar}
              />
            )}
          </div>
          {paso.tipo === "enviado" && <Confeti />}
        </div>
      )}
    </>
  );
}

const Bolilla = React.memo(function Bolilla({
  numero,
  estado,
  elegida,
  encendida,
  bloqueada,
  onElegir,
  onAsomar,
}: {
  numero: number;
  estado: EstadoPublico;
  elegida: boolean;
  encendida: boolean;
  bloqueada: boolean;
  onElegir: (numero: number) => void;
  onAsomar: (numero: number | null) => void;
}) {
  const libre = estado === "disponible";
  const aspecto = encendida
    ? "scale-110 bg-gold-rotary text-ink shadow-lg shadow-gold-rotary/50"
    : elegida
    ? "bolilla-elegida bg-gold-rotary text-ink"
    : libre
    ? "border border-white/25 text-white"
    : estado === "reservado"
    ? "border border-dashed border-gold-rotary/70 text-gold-rotary/70"
    : "bg-white/10 text-white/25 line-through";

  return (
    <button
      disabled={!libre || bloqueada}
      onClick={() => onElegir(numero)}
      onPointerEnter={(evento) => {
        if (libre && evento.pointerType === "mouse") onAsomar(numero);
      }}
      aria-label={`Número ${numero}, ${estado}`}
      aria-pressed={elegida}
      style={{ "--i": numero } as React.CSSProperties}
      className={`bolilla aspect-square rounded-2xl text-sm font-bold tabular-nums sm:text-base ${aspecto}`}
    >
      {numero}
    </button>
  );
});

const botonPrimario =
  "inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-colors hover:bg-blue-rotary disabled:opacity-50";
const campo =
  "mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-blue-rotary";
const etiqueta = "block text-xs font-bold uppercase tracking-[0.18em] text-ink/60";

function Leyenda({ className, texto }: { className: string; texto: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded ${className}`} />
      {texto}
    </li>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt className="text-xs font-bold uppercase tracking-[0.22em] text-ink/50">
        {etiqueta}
      </dt>
      <dd className="text-right font-display text-xl sm:text-2xl tracking-tight">
        {valor}
      </dd>
    </div>
  );
}

function PasoJuego({
  n,
  titulo,
  texto,
}: {
  n: number;
  titulo: string;
  texto: string;
}) {
  return (
    <li className="group flex gap-5 rounded-3xl bg-white p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink font-display text-2xl text-gold-rotary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
        {n}
      </span>
      <div>
        <h3 className="font-display text-2xl tracking-tight">{titulo}</h3>
        <p className="mt-2 leading-relaxed text-ink/70">{texto}</p>
      </div>
    </li>
  );
}

function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
      {children}
    </p>
  );
}

function Medalla({ numero }: { numero: number }) {
  return (
    <span className="flex h-16 w-16 shrink-0 -rotate-6 items-center justify-center rounded-2xl bg-gold-rotary font-display text-3xl tabular-nums shadow-lg shadow-gold-rotary/40">
      {numero}
    </span>
  );
}

function FormularioDatos({
  numero,
  vendedores,
  vendedorInicial,
  onReservado,
}: {
  numero: number;
  vendedores: Vendedor[];
  vendedorInicial?: number;
  onReservado: (reserva: Reserva) => void;
}) {
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    setEnviando(true);
    setError("");
    try {
      const reserva = await pedir("/api/rifa/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero,
          nombre: datos.get("nombre"),
          telefono: datos.get("telefono"),
          vendedorId: datos.get("vendedor"),
        }),
      });
      onReservado(reserva);
    } catch (e) {
      setError((e as Error).message);
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-5">
      <div className="flex items-center gap-4 pr-10">
        <Medalla numero={numero} />
        <div>
          <h3 className="font-display text-3xl leading-none tracking-tight">
            ¡Buena elección!
          </h3>
          <p className="mt-2 text-sm text-ink/70">
            Completá tus datos y lo guardamos 15 minutos a tu nombre.
          </p>
        </div>
      </div>
      <label className={etiqueta}>
        Nombre y apellido
        <input name="nombre" required minLength={3} maxLength={80} autoComplete="name" className={campo} />
      </label>
      <label className={etiqueta}>
        Teléfono
        <input name="telefono" required type="tel" maxLength={30} autoComplete="tel" placeholder="261 555 5555" className={campo} />
      </label>
      <label className={etiqueta}>
        ¿Quién te lo vendió?
        <select name="vendedor" required defaultValue={vendedorInicial ?? ""} className={campo}>
          <option value="" disabled>
            Elegí un vendedor
          </option>
          {vendedores.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nombre}
            </option>
          ))}
        </select>
      </label>
      {error && <Aviso>{error}</Aviso>}
      <button disabled={enviando} className={botonPrimario}>
        {enviando ? "Reservando…" : `Reservar el ${numero}`}
      </button>
    </form>
  );
}

function useRestante(venceEn: string | null) {
  const [ahora, setAhora] = useState(() => Date.now());
  useEffect(() => {
    const intervalo = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(intervalo);
  }, []);
  if (!venceEn) return 0;
  return Math.max(0, Math.floor((new Date(venceEn).getTime() - ahora) / 1000));
}

// Las fotos de celular suelen superar el límite; se achican antes de subir.
async function achicarImagen(archivo: File): Promise<File> {
  if (!archivo.type.startsWith("image/") || archivo.size < 1.5 * 1024 * 1024)
    return archivo;
  try {
    const imagen = await createImageBitmap(archivo);
    const escala = Math.min(1, 1800 / Math.max(imagen.width, imagen.height));
    const lienzo = document.createElement("canvas");
    lienzo.width = Math.round(imagen.width * escala);
    lienzo.height = Math.round(imagen.height * escala);
    lienzo.getContext("2d")!.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
    const blob = await new Promise<Blob | null>((resolver) =>
      lienzo.toBlob(resolver, "image/jpeg", 0.82)
    );
    return blob ? new File([blob], "comprobante.jpg", { type: "image/jpeg" }) : archivo;
  } catch {
    return archivo;
  }
}

const RADIO = 30;
const PERIMETRO = 2 * Math.PI * RADIO;

function Reloj({ restante }: { restante: number }) {
  const minutos = String(Math.floor(restante / 60)).padStart(2, "0");
  const segundos = String(restante % 60).padStart(2, "0");
  const apurado = restante < 120;
  return (
    <div className="relative h-[4.5rem] w-[4.5rem] shrink-0" role="timer">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle cx="36" cy="36" r={RADIO} fill="none" strokeWidth="6" className="stroke-ink/10" />
        <circle
          cx="36"
          cy="36"
          r={RADIO}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={PERIMETRO}
          strokeDashoffset={PERIMETRO * (1 - restante / SEGUNDOS_RESERVA)}
          className={`rifa-anillo ${apurado ? "stroke-red-600" : "stroke-blue-rotary"}`}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums ${
          apurado ? "text-red-700" : ""
        }`}
      >
        {minutos}:{segundos}
      </span>
    </div>
  );
}

function Pago({
  reserva,
  onEnviado,
}: {
  reserva: Reserva;
  onEnviado: () => void;
}) {
  const restante = useRestante(reserva.venceEn);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [archivo, setArchivo] = useState("");

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const original = new FormData(evento.currentTarget).get("comprobante");
    if (!(original instanceof File) || original.size === 0) return;
    setEnviando(true);
    setError("");
    try {
      const listo = await achicarImagen(original);
      if (listo.size > MAX_COMPROBANTE)
        throw new Error("El comprobante supera los 4 MB.");
      const cuerpo = new FormData();
      cuerpo.set("token", reserva.token);
      cuerpo.set("comprobante", listo);
      await pedir("/api/rifa/comprobante", { method: "POST", body: cuerpo });
      onEnviado();
    } catch (e) {
      setError((e as Error).message);
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-5">
      <div className="flex items-center gap-4 pr-10">
        <Medalla numero={reserva.numero} />
        <h3 className="flex-1 font-display text-3xl leading-none tracking-tight">
          Es casi tuyo
        </h3>
        {restante > 0 && <Reloj restante={restante} />}
      </div>
      <p className="text-sm text-ink/70">
        Transferí y enviá el comprobante antes de que se acabe el tiempo.
      </p>
      {restante === 0 && (
        <Aviso>
          Se cumplieron los 15 minutos. Si ya transferiste, enviá el
          comprobante igual: vale mientras nadie más haya tomado el número.
        </Aviso>
      )}

      <dl className="divide-y divide-ink/10 rounded-2xl bg-white px-5">
        {reserva.precio > 0 && (
          <Fila etiqueta="Monto" valor={pesos.format(reserva.precio)} />
        )}
        <div className="py-3">
          <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
            Alias o CBU
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-3 font-semibold [overflow-wrap:anywhere]">
            {reserva.alias || "A confirmar"}
            {reserva.alias && (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(reserva.alias);
                  setCopiado(true);
                }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-rotary"
              >
                {copiado ? <Check size={14} /> : <Copy size={14} />}
                {copiado ? "Copiado" : "Copiar"}
              </button>
            )}
          </dd>
        </div>
        {reserva.titular && <Fila etiqueta="Titular" valor={reserva.titular} />}
      </dl>

      <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-ink/25 px-5 py-6 text-center transition-colors hover:border-blue-rotary hover:bg-white">
        <span className="block font-bold">
          {archivo || "Tocá para adjuntar el comprobante"}
        </span>
        <span className="mt-1 block text-xs text-ink/50">
          JPG, PNG o PDF, hasta 4 MB
        </span>
        <input
          name="comprobante"
          type="file"
          required
          accept="image/jpeg,image/png,application/pdf"
          onChange={(evento) => setArchivo(evento.target.files?.[0]?.name ?? "")}
          className="sr-only"
        />
      </label>
      {error && <Aviso>{error}</Aviso>}
      <button disabled={enviando} className={botonPrimario}>
        {enviando ? "Enviando…" : "Enviar comprobante"}
      </button>
      <p className="text-xs text-ink/50">
        El comprobante no confirma el pago por sí solo: un socio del club
        verifica que el dinero haya ingresado.
      </p>
    </form>
  );
}

function Enviado({
  numero,
  config,
  precio,
  onCerrar,
}: {
  numero: number;
  config: ConfigPublica;
  precio?: string;
  onCerrar: () => void;
}) {
  const [enlace, setEnlace] = useState("");
  useEffect(() => setEnlace(window.location.href), []);
  const mensaje = `¡Ya tengo el número ${numero} en la ${config.nombre} del Rotary Club Mendoza Sur! Elegí el tuyo: ${enlace}`;

  return (
    <div className="text-center">
      <h3 className="font-display text-4xl tracking-tight">
        ¡Estás <span className="italic text-blue-rotary">adentro!</span>
      </h3>
      <Boleto
        numero={numero}
        premio={config.premio}
        precio={precio}
        sello="Enviado"
        className="mx-auto mt-8 w-full max-w-[16rem] text-left"
      />
      <p className="mt-8 text-ink/70">
        Recibimos tu comprobante. El número {numero} queda bloqueado a tu
        nombre mientras un socio del club verifica que el pago ingresó.
      </p>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(mensaje)}`}
        target="_blank"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gold-rotary px-7 py-3.5 text-sm font-bold tracking-wide text-ink transition-colors hover:bg-ink hover:text-white"
      >
        Contarlo por WhatsApp
      </a>
      <button onClick={onCerrar} className={`${botonPrimario} mt-3`}>
        Listo
      </button>
    </div>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
        {etiqueta}
      </dt>
      <dd className="text-right font-semibold">{valor}</dd>
    </div>
  );
}
