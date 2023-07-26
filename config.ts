import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load()
export const FIREBASE_CONFIG = env['FIREBASE_CONFIG']

