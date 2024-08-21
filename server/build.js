import { build } from "esbuild";

build({
  entryPoints: ["./server.mjs"],
  bundle: true,
  platform: "node",
  target: "node16", // Adjust this to your Node.js version
  outfile: "./dist/server.js",
  format: "esm", // Set the output format to "esm"
}).catch(() => process.exit(1));
