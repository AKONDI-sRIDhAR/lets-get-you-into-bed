import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("postgresql://postgres:[YOUR_PASSWORD]@db.nxhicgnnrdyuvytukoce.supabase.co:5432/postgres"),
  },
});
