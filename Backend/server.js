const yargs = require("yargs")
const { hideBin } = require("yargs/helpers");
const {initRepo} = require("./controllers/init.controllers")



yargs(hideBin(process.argv))
  .command(
    "init",
    "initialise a new repo",
    {},
    initRepo
  )
  .command(
    "add <file>",
    "add a file to the repo",
    (yargs)=>{
        yargs.positional("file")
    }
  )
  .demandCommand(1, "you need atleast one command")
  .help()
  .argv;