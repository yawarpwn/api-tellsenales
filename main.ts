import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import data from "./data.json" assert { type: "json" };

const router = new Router();
router.get("/", (context) => {
  context.response.body = "WElcome dinosaurs api";
});

router.get("/api", (context) => {
  context.response.body = data;
});

router.get("/api/:dinosaur", (context) => {
  if (context.params.dinosaur) {
    const found = data.find(dino => dino.name?.toLowerCase() === context.params.dinosaur.toLowerCase())
    if(found) {
      context.response.body = found
    } else {
      context.response.body= 'Dinosaur not found'
    }
  }
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({
  port: 8080,
});
