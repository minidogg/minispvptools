// esbuild.config.js
import { build } from "esbuild";
import fs from 'fs'



const isWatch = process.argv.includes("--watch");

async function buildTime(){
    try{
    console.log("Building!")
build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "scripts/bundle.js", // single output file
  format: "esm",
  platform: "neutral",

  // 🔥 IMPORTANT for Minecraft
  external: ["@minecraft/server","@minecraft/debug-utilities","@minecraft/server-ui"],

  // nice-to-haves
  minify: !isWatch,
  sourcemap: isWatch,
  target: "es2020",

}).catch((err) => {
    console.warn(err)
});
    }catch(err){
        console.warn(err)
    }
}
console.log("Creating initial build!")
buildTime()

console.log("Watching for changes...")
let nextBuild = Date.now()
let buildQueued = false
fs.watch("./src", {"recursive":true}, ()=>{
    console.log("Changes detected!")
    buildQueued = true
    nextBuild = Date.now()+100
})
setInterval(async() => {
    if(buildQueued&&nextBuild<Date.now()){
        buildQueued = false
        try{
        buildTime()
        }catch(err){
            console.error(err)
        }
    }
}, 100);