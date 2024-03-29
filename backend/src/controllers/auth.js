const db = require('../db/db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
    console.log(req.user)
  try {
    const { rows } = await db.query('select user_id, username from users')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const hashedPassword = await hash(password, 10)

    await db.query('insert into users(username,password) values ($1 , $2)', [
      username,
      hashedPassword,
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
    req.session.userName = req.user.username;
    req.session.userId = req.user.user_id;
    req.session.save();
    console.log(req.session.userName)
    console.log(req.session.userId)
    console.log(req.session)

  let user = req.user

  let payload = {
    id: user.user_id,
    username: user.username,
  }
  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}