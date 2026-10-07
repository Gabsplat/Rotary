// Aplica db/schema.sql sobre la base configurada. Corre antes de cada build.
import { readFile } from "node:fs/promises";
import postgres from "postgres";

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!url) {
  console.warn("[migrar] Sin DATABASE_URL: se omite la migración.");
  process.exit(0);
}

const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
const sql = postgres(url, {
  max: 1,
  prepare: false,
  ssl: local ? false : "require",
  onnotice: () => {},
});

try {
  const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
  await sql.unsafe(schema);
  console.log("[migrar] Esquema aplicado.");
} finally {
  await sql.end();
}
