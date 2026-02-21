import esbuild from "esbuild";

const isProd = process.argv[2] === "production";

const context = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: ["obsidian"],
  format: "cjs",
  target: "es2022",
  platform: "node",
  sourcemap: isProd ? false : "inline",
  treeShaking: true,
  outfile: "main.js",
  logLevel: "info",
});

if (isProd) {
  await context.rebuild();
  await context.dispose();
} else {
  await context.watch();
  console.log("Watching for changes...");
}