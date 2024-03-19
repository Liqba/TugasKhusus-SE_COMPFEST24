const express = require("express");
const cors = require("cors");
const passport = require('passport');
const cookieParser = require('cookie-parser')
const { PORT, CLIENT_URL } = require('./constants/index')

const app = express();

require('./middlewares/passport-middleware')

app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize())


const authRoutes = require('./routes/auth')
const appRoutes = require('./routes/app')

//initialize routes
app.use('/api', authRoutes);
app.use('/', appRoutes);

// //ROUTES//

// // create deadline

// app.post("/deadlines", async (req, res) => {
//   try {
//     const { title, date, description } = req.body;

//     const newDeadline = await pool.query(
//       "INSERT INTO deadline(title, date, description) VALUES($1,$2,$3) RETURNING *",
//       [title, date, description]
//     );
//     res.json(newDeadline.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // get all deadline

// app.get("/deadlines", async (req, res) => {
//   try {
//     const allDeadlines = await pool.query("SELECT * FROM deadline");
//     res.json(allDeadlines.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // get a deadline

// app.get("/deadlines/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deadline = await pool.query("SELECT * FROM deadline WHERE deadline_id = $1", [
//       id
//     ]);

//     res.json(deadline.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });


// // update a deadline

// app.put("/deadlines/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, date, description } = req.body;
//     const updateDeadline = await pool.query(
//       "UPDATE deadline SET title = $1, date = $2, description = $3 WHERE deadline_id = $4",
//       [title, date, description ,id ]
//     );

//     res.json("Deadline was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // delete a deadline

// app.delete("/deadlines/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteDeadline = await pool.query("DELETE FROM deadline WHERE deadline_id = $1", [
//       id
//     ]);
//     res.json("Deadline was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });


// // convert date to days from now
// app.get("/convertdate/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     var date = await pool.query("SELECT date FROM deadline WHERE deadline_id = $1;", [
//       id
//     ]);

//     const todaysdate = moment();
//     const eventdate = moment(date.rows[0].date);

//     const timestamp = eventdate.diff(todaysdate, 'days');
//     console.log(timestamp);
//     res.json(timestamp);
//   } catch (err) {
//     console.log(err.message);
//   }
// });



const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()