
import express from 'express'
import cors from 'cors'
import {router as notesRouter} from './routes/notes.js'   
import {router as usersRouter} from './routes/users.js'
import {router as indexRouter} from './routes/index.js'

import {Note} from './models/notes.js'
import {User} from './models/users.js'
import { syncDatabase } from './models/config.js'

User.hasMany(Note, {foreignKey: 'userId'})
Note.belongsTo(User, {foreignKey: 'userId'})


const app = express()
const PORT = 3000

app.use(express.json());

app.use(cors());
app.use("/", indexRouter);




const server= app.listen(PORT, async () => {
    try{
        await syncDatabase();
        console.log(`Server started on http://localhost:${PORT}`)
    }
    catch(err){
        console.log("error with db");
        server.close();
    }
   });