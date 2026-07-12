import express from "express"
import cors from "cors"
import { FRONTEND_URL } from '../lib/env';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import { init, addFile } from "../infrastructure/commands/commands";


const app = express();

// middlewares
app.use(cors({
  origin: FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



yargs(hideBin(process.argv))
    .command(init)
    .command(addFile)
     .demandCommand(1,
        "you need atleast one command")
        .help()
        .argv;







/**
 * @routes
 * @description all the routes will go here
 */

app.get("/api/verify",(req : express.Request,res : express.Response)=>{
    res.send({ health: "ok!" });
})



export {app}