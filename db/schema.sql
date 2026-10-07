-- Esquema de la rifa y del panel de socios. Es idempotente: se puede aplicar
-- las veces que haga falta sin perder datos.

CREATE TABLE IF NOT EXISTS socios (
  id serial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  nombre text NOT NULL DEFAULT '',
  rol text NOT NULL DEFAULT 'admin' CHECK (rol IN ('admin', 'mod')),
  activo boolean NOT NULL DEFAULT true,
  creado_en timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS rifa_config (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  nombre text NOT NULL DEFAULT 'Rifa solidaria',
  precio int NOT NULL DEFAULT 0,
  alias text NOT NULL DEFAULT '',
  titular text NOT NULL DEFAULT '',
  premio text NOT NULL DEFAULT '',
  sorteo text NOT NULL DEFAULT '',
  activa boolean NOT NULL DEFAULT false,
  activada_en timestamptz
);

INSERT INTO rifa_config (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS operaciones (
  id serial PRIMARY KEY,
  numero int NOT NULL CHECK (numero BETWEEN 1 AND 100),
  estado text NOT NULL CHECK (
    estado IN ('reservada', 'pendiente', 'confirmada', 'liberada', 'vencida')
  ),
  medio text NOT NULL DEFAULT 'transferencia' CHECK (
    medio IN ('transferencia', 'efectivo')
  ),
  comprador_nombre text NOT NULL,
  comprador_telefono text NOT NULL,
  vendedor_id int REFERENCES socios (id),
  token text NOT NULL UNIQUE,
  vence_en timestamptz,
  prueba boolean NOT NULL DEFAULT false,
  rendido boolean NOT NULL DEFAULT false,
  creado_en timestamptz NOT NULL DEFAULT now(),
  comprobante_en timestamptz,
  resuelto_en timestamptz,
  resuelto_por text
);

-- Un número no puede tener dos operaciones vivas a la vez. Este índice es lo
-- que impide vender dos veces el mismo número ante reservas simultáneas.
CREATE UNIQUE INDEX IF NOT EXISTS operaciones_numero_vivo
  ON operaciones (numero)
  WHERE estado IN ('reservada', 'pendiente', 'confirmada');

CREATE TABLE IF NOT EXISTS comprobantes (
  operacion_id int PRIMARY KEY REFERENCES operaciones (id) ON DELETE CASCADE,
  mime text NOT NULL,
  nombre text NOT NULL DEFAULT '',
  datos bytea NOT NULL,
  creado_en timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auditoria (
  id serial PRIMARY KEY,
  socio_email text NOT NULL,
  accion text NOT NULL,
  operacion_id int,
  detalle text NOT NULL DEFAULT '',
  creado_en timestamptz NOT NULL DEFAULT now()
);
