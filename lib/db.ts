import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

const global = globalThis as unknown as { __sql?: Sql };

// La conexión se crea recién en la primera consulta, para que el build no
// dependa de tener la base configurada.
export function db(): Sql {
  if (global.__sql) return global.__sql;
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) throw new Error("Falta la variable DATABASE_URL.");
  const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
  global.__sql = postgres(url, {
    // La base local (PGlite) atiende una sola conexión.
    max: local ? 1 : 5,
    prepare: false,
    ssl: local ? false : "require",
    onnotice: () => {},
  });
  return global.__sql;
}
