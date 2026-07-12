import yargs from "yargs";
import type { CommandModule, ArgumentsCamelCase } from "yargs";
import { initRepo } from "../../modules/init/init";
import { addfile } from "../../modules/add/add.command"; 

export const init : CommandModule = {
    command : "init",
    describe : "initialise a new repo",
    handler : async (argv : ArgumentsCamelCase)=>{
        await initRepo();
    }
}

export const addFile : CommandModule = {
    command : "add <file>",
    describe : "add a file to be pushed",
    builder: (yargs) =>
        yargs.positional("file", { type: "string", describe: "file to add", demandOption: true }),
        handler: async (argv : ArgumentsCamelCase) => {
        await addfile();
        }

}