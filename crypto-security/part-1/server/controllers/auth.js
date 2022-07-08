const express = require('express')
const bcrypt = require('bcryptjs')
const app = express()
app.use(express.json())
app.listen(4040, () => console.log('Server running on 4040'))


const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          //res.status(200).send(users[i])
          bcrypt.compare(password, hash, (err, res) => {
            if (err) {
              console.error(err)
              return
            }
           res.status(200).send(users[i]);
          })
        }else{ 
          res.status(400).send("User not found.")
        }
      }
    },
    register: (req, res) => {
        console.log('Registering User')
        bcrypt.hash(req.password, 3, (err, hash) => {
          if (err) {
            console.error(err)
            
          }else{
            users.push({username: req.username, password: hash});
          } 
        })
        console.log(req.body)
        users.push(req.body)
        res.status(200).send(req.body)
    }
}