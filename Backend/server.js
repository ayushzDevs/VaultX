const yargs = require("yargs")
const {hidebin} = require (yargs.hidebin);
const {initRepo} = require("./controllers/init.controllers")



yargs(hidebin((process.argv)).command("init", "initialise a new repo", {}));