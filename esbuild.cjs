const esbuild = require("esbuild");

const isDev = process.env.NODE_ENV === "development";

const config = {
  entryPoints: [
    "./src/main.jsx",
    "./src/background/background.js",
    "./src/contentScript/contentScript.js",
  ],
  bundle: true,
  loader: {},

  allowOverwrite: true,
  minify: !isDev,
  sourcemap: !isDev,
  jsxDev: true,
  sourcemap: isDev,
  write: true,
  resolveExtensions: [".ts", ".js", ".jsx"],
  outdir: "dist",
};

async function run() {
  if (isDev) {
    let ctx = await esbuild.context(config);
    await ctx.watch();
    console.log("watching...");

    let { host, port } = await ctx.serve({
      servedir: "dist",
    });
    console.log(`server is running on port http://localhost:${port}`);
  } else {
    esbuild.build(config);
  }
}

run();
