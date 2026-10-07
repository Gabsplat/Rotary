# Rifa y panel de socios

Guía para publicar y operar la rifa de 100 números y el panel de socios.

## Qué hay

| Ruta | Quién la usa | Qué hace |
|---|---|---|
| `/rifa` | Compradores | Grilla de números, reserva de 15 minutos y envío del comprobante. Con `?v=<id>` llega con el vendedor preseleccionado. |
| `/panel` | Socios | Resumen, pagos por verificar, enlace propio de vendedor, alta de ventas en efectivo. |
| `/panel/pedidos` | Socios | Todas las operaciones, con filtros por estado. |
| `/panel/configuracion` | Socios | Datos de la rifa y activación. |
| `/panel/socios` | Socios | Quién puede entrar al panel. |
| `/panel/ingresar` | Socios | Ingreso con Google. |

Todos los socios habilitados son administradores. La tabla `socios` ya tiene
la columna `rol` (`admin` o `mod`) para diferenciar permisos más adelante; hoy
ninguna pantalla la consulta.

## Pasos manuales para publicar

Hacelos en este orden. Hasta completar el paso 4, `/rifa` y `/panel` dan error
en el sitio publicado; el resto del sitio sigue funcionando.

### 1. Base de datos

1. En Vercel, abrí el proyecto y entrá a **Storage → Create Database → Neon**.
2. Conectala al proyecto en los entornos Production y Preview.
3. Verificá en **Settings → Environment Variables** que exista `DATABASE_URL`.

No hay que crear tablas a mano: cada build corre `scripts/migrar.mjs`, que
aplica `db/schema.sql`.

### 2. Credenciales de Google

1. En <https://console.cloud.google.com> creá un proyecto (o usá uno del club)
   y abrí **Google Auth Platform**.
2. **Información de la marca**: nombre "Rotary Club Mendoza Sur" y un correo
   de asistencia.
3. **Público**: tipo de usuario *Externo* y **Publicar aplicación**. Si queda
   en "Prueba", solo entran las cuentas cargadas como usuarios de prueba.
4. **Clientes → Crear cliente → Aplicación web**. En **URI de
   redireccionamiento autorizados** cargá, reemplazando el dominio por el real
   del sitio:
   - `https://DOMINIO/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (para desarrollo)
5. Copiá el ID de cliente y el secreto: el secreto se muestra una sola vez.

**Acceso a los datos** no hace falta tocarlo: el ingreso usa solo correo y
perfil, que vienen por defecto.

Las URL de vista previa de Vercel cambian en cada deploy y Google no las
acepta, así que el ingreso con Google solo se puede probar en el dominio real
o en local.

### 3. Variables en Vercel

En **Settings → Environment Variables**, para Production y Preview:

| Variable | Valor |
|---|---|
| `AUTH_SECRET` | Resultado de `openssl rand -base64 33` |
| `AUTH_GOOGLE_ID` | ID de cliente del paso 2 |
| `AUTH_GOOGLE_SECRET` | Secreto del paso 2 |
| `ADMIN_EMAILS` | Tu correo de Google (varios separados por coma) |

`ADMIN_EMAILS` es la llave del primer ingreso: esos correos entran siempre. El
resto de los socios se carga desde el panel.

### 4. Publicar

1. Subí los cambios a la rama que Vercel publica.
2. En el log del build tiene que aparecer `[migrar] Esquema aplicado.` Si dice
   `Sin DATABASE_URL`, la base no quedó conectada a ese entorno.

### 5. Puesta en marcha

1. Entrá a `/panel` con tu cuenta de Google.
2. En **Socios**, cargá el correo de Google y el nombre de cada socio. El
   nombre es el que ven los compradores en "¿Quién te lo vendió?".
3. En **Configuración**, completá nombre, precio, alias o CBU, titular, premio
   y sorteo.
4. Probá el circuito completo en modo de prueba: reservá un número desde
   `/rifa`, subí un comprobante, confirmalo desde el panel, cargá una venta en
   efectivo.
5. Cuando esté todo bien, tocá **Activar la rifa**. Borra las operaciones de
   prueba y deja los 100 números disponibles. No se puede deshacer desde el
   panel.
6. Cada socio copia su enlace desde **Resumen → Tu enlace de vendedor**.

## Cómo funciona

- **Reserva.** El comprador elige número y carga nombre, teléfono y vendedor.
  El número queda reservado 15 minutos. Un índice único en la base impide que
  dos personas reserven el mismo número a la vez.
- **Comprobante.** JPG, PNG o PDF de hasta 4 MB (el tope de Vercel por
  petición es 4,5 MB). Las fotos grandes se achican en el navegador antes de
  subir. Al enviarlo, el número queda "por verificar" sin vencimiento.
- **Vencimiento.** Una reserva vencida libera el número. Si el comprador manda
  el comprobante tarde y nadie más tomó el número, se acepta igual.
- **Confirmación.** Es manual: un socio verifica en la cuenta que el dinero
  entró y toca **Confirmar pago**.
- **Efectivo.** El socio carga la venta desde el panel y el número queda
  vendido en el acto, marcado "sin rendir". Cuando el vendedor entrega la
  plata, se toca **Marcar rendido**.
- **Liberar / anular.** Devuelve el número a disponible. Sirve para reservas,
  pagos rechazados y ventas cargadas por error.
- **Registro.** Cada confirmación, liberación, venta en efectivo, rendición y
  cambio de configuración queda en la tabla `auditoria` con el correo del
  socio y la hora.
- **Privacidad.** La vista pública solo expone el estado de cada número. Los
  datos de compradores y los comprobantes se sirven únicamente con sesión de
  socio. Los comprobantes se guardan en la base (tabla `comprobantes`).
- **Tope anti abuso.** Un mismo teléfono puede tener hasta 3 reservas sin
  pagar al mismo tiempo.

## Desarrollo local

```bash
cp .env.example .env.local   # completar AUTH_SECRET y ADMIN_EMAILS
pnpm db:local                # base Postgres local en 127.0.0.1:5433 (dejar corriendo)
pnpm db:migrar               # en otra terminal: crea las tablas
pnpm dev
```

Con `AUTH_DEV_LOGIN=1` en `.env.local`, `/panel/ingresar` muestra un ingreso
por correo sin pasar por Google. Solo existe con `pnpm dev`: en un build de
producción el proveedor no se registra. El correo igual tiene que estar
habilitado como socio o figurar en `ADMIN_EMAILS`.

## Pendientes y límites conocidos

- **No hay enlace a la rifa en el menú del sitio.** Agregarlo en
  `components/Navbar.tsx` cuando la rifa esté activa.
- **Roles.** Diferenciar `mod` de `admin` requiere chequear `socio.rol` en
  `app/panel/acciones.ts`.
- **Cobro automático.** Mercado Pago no está integrado; todo pago se confirma
  a mano.
- **Volver a modo de prueba o reiniciar la rifa** no tiene botón: se hace
  sobre la base.
- **Export estático.** `STATIC_EXPORT=1` ya no sirve para este proyecto: la
  rifa y el panel necesitan servidor.
- **Autorización de la rifa.** Consultar qué exige Mendoza antes de vender.
