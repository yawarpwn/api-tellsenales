/**
 * cat.ts
 */
for (const filename of Deno.args) {
  const file = await Deno.open(filename);
  await file.readable.pipeTo(Deno.stdout.writable, { preventClose: true });
}

// deno run --allow-read https://deno.land/std@0.195.0/examples/cat.ts /etc/passwd
