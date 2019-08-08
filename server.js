  const express = require('express');
  const app = express()
const bodyParse = require('body-parser')


 // handeling all the parsing

app.use(bodyParse.json())
app.post('/', (req,res) => {
  var email = req.body.email
  var amount =req.body.amount

if (amount <= 1 ) {
  return_info = {}
  return_info.error = true
  return_info.message = "the amount should be grater than 1"
  return res.json(return_info)
}
  res.send ({"amount" : amount , "email" : email})
})
  app.listen(3000 , () => {
    console.log ("server is running on port 3000")
  })
