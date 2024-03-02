
import express from 'express';
import {router as notesRouter} from './notes.js';
import {router as usersRouter} from './users.js';

export const router = express.Router();
router.use("/notes", notesRouter);
router.use('/users', usersRouter);

// ReactDOM.render(
//   <Router>
//     <Switch>
//       <Route path="/home" element={<HomePage />} />
//       <Route path="/login" element={<LoginSignup />} />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );