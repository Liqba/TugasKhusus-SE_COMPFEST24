const pool = require('../db/db')
const moment = require('moment');


exports.getDeadlines = async (req, res) => {
  console.log(req.session)
    try {
        const allDeadlines = await pool.query("SELECT * FROM deadline");
        res.json(allDeadlines.rows);
      } catch (err) {
        console.error(err.message);
    }
}

exports.postDeadlines = async (req, res) => {
  console.log(req.user)
    try {
        const { title, date, description } = req.body;

        const newDeadline = await pool.query(
            "INSERT INTO deadline(title, date, description) VALUES($1,$2,$3) RETURNING *",
            [title, date, description]
        );
        res.json(newDeadline.rows[0]);
        } catch (err) {
        console.error(err.message);
    }
}

exports.getDeadline = async (req, res) => {
    try {
        const { id } = req.params;
        const deadline = await pool.query("SELECT * FROM deadline WHERE deadline_id = $1", [
          id
        ]);
    
        res.json(deadline.rows[0]);
      } catch (err) {
        console.error(err.message);
    }
}

exports.updateDeadline = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, description } = req.body;
        const updateDeadline = await pool.query(
          "UPDATE deadline SET title = $1, date = $2, description = $3 WHERE deadline_id = $4",
          [title, date, description ,id ]
        );
    
        res.json("Deadline was updated!");
      } catch (err) {
        console.error(err.message);
    }
}

exports.deleteDeadline = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDeadline = await pool.query("DELETE FROM deadline WHERE deadline_id = $1", [
          id
        ]);
        res.json("Deadline was deleted!");
      } catch (err) {
        console.log(err.message);
      }
}

exports.convertDate = async (req, res) => {
    try {
        const { id } = req.params;
        var date = await pool.query("SELECT date FROM deadline WHERE deadline_id = $1;", [
          id
        ]);
    
        const todaysdate = moment();
        const eventdate = moment(date.rows[0].date);
    
        const timestamp = eventdate.diff(todaysdate, 'days');
        res.json(timestamp);
      } catch (err) {
        console.log(err.message);
    }
}