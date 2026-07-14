#!/usr/bin/env bun
import express from "express"
import cors from "cors"
import { FRONTEND_URL } from '../lib/env';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import { init, addFile , Commit , Pull, Push, revert } from "../infrastructure/services/commands";


const app = express();

// middlewares
app.use(cors({
  origin: FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



async function main() {
  await yargs(hideBin(process.argv))
    .command(init)
    .command(addFile)
    .command(Commit)
    .command(Pull)
    .command(Push)
    .command(revert)
    .demandCommand(1, "you need atleast one command")
    .help()
    .parseAsync();
}

main();


/**
 * @routes
 * @description all the routes will go here
 */

app.get("/api/verify",(req : express.Request,res : express.Response)=>{
    res.send({ health: "ok!" });
})



export {app}