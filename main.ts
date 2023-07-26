import { Application } from "oak";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import router from './routes/index.ts'

// router.get("/api/:dinosaur", (context) => {
//   if (context.params.dinosaur) {
//     const found = data.find(dino => dino.name?.toLowerCase() === context.params.dinosaur.toLowerCase())
//     if(found) {
//       context.response.body = found
//     } else {
//       context.response.body= 'Dinosaur not found'
//     }
//   }
// });

const app = new Application();
// app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Api Deno running on port http://localhost:8080`)
app.listen({port: 8080});
