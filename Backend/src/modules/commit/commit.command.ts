const fs = require("fs/promises")
const path = require("path")
import { v4 as uuidv4 } from 'uuid';




export async function commitCommand(messages:string){
    const repoPath = path.resolve(process.cwd(), ".nonExisting")
    const stagingPath = path.join(repoPath, "staging");
    const commits = path.join(repoPath , "commits");

    try{
        const commitID = uuidv4()
        const commitPath = path.join(commits , commitID);
        await fs.mkdir(commitPath, {recursive:true})
        const files = await fs.readdir(stagingPath)
        for(const file of files){
            await fs.copyFile(path.join(stagingPath, file), path.join(commitPath, file))
        }

        await fs.writeFile(path.join(commitPath, "commits.json") , JSON.stringify({messages, date : new Date().toISOString()}))

        console.log(`commit with ${commitID} is created with message : ${messages}`)

    }catch(e){
        console.error(`error in commiting changes is ${e}`)
    }
}