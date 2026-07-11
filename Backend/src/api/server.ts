import {app} from "./app"
import { APP_PORT } from "../lib/env";

import dotenv from 'dotenv';
dotenv.config()

app.listen(APP_PORT, () => {
    console.log(`Server is up @ http://localhost:${APP_PORT}`);
});