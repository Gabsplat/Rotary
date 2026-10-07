// Base Postgres local para desarrollo, sin instalar nada: PGlite escuchando en
// 127.0.0.1:5433 y guardando los datos en .pglite/.
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";

const db = await PGlite.create("./.pglite");
// Varias conexiones para poder usar psql mientras corre el sitio; PGlite las
// atiende de a una consulta por vez.
const server = new PGLiteSocketServer({
  db,
  port: 5433,
  host: "127.0.0.1",
  maxConnections: 5,
});
await server.start();
console.log("Base local lista en postgres://postgres:postgres@127.0.0.1:5433/postgres");

for (const señal of ["SIGINT", "SIGTERM"]) {
  process.on(señal, async () => {
    await server.stop();
    await db.close();
    process.exit(0);
  });
}
