const fs = require("fs/promises");
const path = require("path");

export async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".nonExisting");
    const commitPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitPath, { recursive: true });

        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify(
                { bucket: process.env.S3_BUCKET },
                null,
                2
            )
        );

        console.log("Repo initialized");
    } catch (e) {
        console.error("Error initializing repo:", e);
    }
}

