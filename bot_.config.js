module.exports =  {
  apps : [{
    name   : "bot",
    script : "./dist/index.js",
    max_restarts: 25,
    max_memory_restart: "300M"
  }]
}
