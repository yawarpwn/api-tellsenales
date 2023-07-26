import { Application } from "oak";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import router from "./routes/index.ts";

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Deno app running on http://localhost:8080");
app.listen({
  port: 8080,
});
