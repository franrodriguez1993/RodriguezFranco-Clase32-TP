const cluster = require("cluster");
const os = require("os");
const minimist = require("minimist");
const { app } = require("./app");

let options = { alias: { p: "puerto", c: "cluster" } };
let args = minimist(process.argv.slice(2), options);
const PORT = process.env.PORT || 8080;
const CLUSTER = args.c;
//Número de nucleos:
const CPU_CORES = os.cpus().length;

//CLUSTERS:
if (CLUSTER) {
  if (cluster.isPrimary) {
    for (let i = 0; i < CPU_CORES; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      console.log(`Finalizó el worker: ${process.pid}`);
      cluster.fork();
    });
  } else {
    app.listen(PORT, () => {
      console.log(`App en http://localhost:${PORT} - PID: ${process.pid}`);
    });
  }
} else {
  app.listen(PORT, () => {
    console.log(`App en http://localhost:${PORT} - PID: ${process.pid}`);
  });
}
