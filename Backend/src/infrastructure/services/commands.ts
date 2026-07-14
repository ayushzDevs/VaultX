import yargs from "yargs";
import type { CommandModule, ArgumentsCamelCase } from "yargs";
import { initRepo } from "../../modules/init/init";
import { addfile } from "../../modules/add/add.command"; 
import { commitCommand } from "../../modules/commit/commit.command";
import { pullCommand } from "../../modules/pull/pull.command";
import { pushCommand } from "../../modules/push/push.command";
import { revertCommand } from "../../modules/revert/revert.command";

export const init : CommandModule = {
    command : "init",
    describe : "initialise a new repo",
    handler : async (argv : ArgumentsCamelCase)=>{
        await initRepo();
    }
};

export const addFile: CommandModule<{}, { file: string }> = {
    command: "add <file>",
    describe: "add a file to be pushed",
    builder: (yargs) =>
        yargs.positional("file", { type: "string", describe: "file to add", demandOption: true }),
    handler: async (argv) => {
        await addfile(argv.file); // argv.file is string, inferred correctly
    }
}


export const Commit : CommandModule = {
    command : "commit changhes",
    describe : "commit changes in repo",
    builder : (yargs)=>
        yargs.positional("changes", {type:"string" , describe:"commit changes in repo", demandOption : true}),
        handler: async (argv:ArgumentsCamelCase)=>{
            await commitCommand();
        }
    
}

export const Pull : CommandModule = {
    command : "pull request",
    describe : "pull req your changes",
    builder : (yargs)=>
        yargs.positional("pull req", {type:"string", describe:"pull req for contributing your changes", demandOption: true}),
        handler  : async (argv: ArgumentsCamelCase)=>{
            await pullCommand();
        }
}

export const Push : CommandModule = {
    command : "push",
    describe : "push your channges",
    builder : (yargs)=>
        yargs.positional("push", {type:"string", describe:"push your changes", demandOption:true}),
        handler: async (argv:ArgumentsCamelCase)=>{
            await pushCommand();
        }
}

export const revert : CommandModule = {
    command : "revert <commitID>",
    describe : "revert or undo previous changes",
    builder : (yargs)=>
        yargs.positional("push",{type:"string", describe:"revert previous changes", demandOption:true}),
        handler: async (argv:ArgumentsCamelCase)=>{
            await revertCommand();
        }
    
}