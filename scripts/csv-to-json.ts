import { parse } from 'https://deno.land/x/csv_parser/mod.ts';
import { writeJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";

async function csvToJSON(csvFilePath: string, jsonFilePath: string) {
  const data = [];

  const file = await Deno.open(csvFilePath);
  for await (const row of parse(file)) {
    data.push(row);
  }
  file.close();

  await writeJson(jsonFilePath, data, { spaces: 2 });
}

// Ejemplo de uso
const csvFilePath = './data/data.csv';
const jsonFilePath = './data/data.json';
await csvToJSON(csvFilePath, jsonFilePath);
