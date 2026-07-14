
const fs = require('fs/promises');
const path = require('path')

export async function addfile(filePath : string){
    const repoPath = path.resolve(process.cwd(), ".nonExisting");
    const stagingPath = path.join(repoPath , "staging");

    try{
        await fs.mkdir(stagingPath , {recursive: true});
        const resolvedFilePath = path.resolve(process.cwd(), filePath);
        const fileName = path.basename(filePath)
        await fs.copyFile(resolvedFilePath , path.join(stagingPath , fileName))
        console.log(`file added to the staging area ${fileName}`)
    }catch(e){
        console.log(`error in adding  is ${e} `)
    }
}

