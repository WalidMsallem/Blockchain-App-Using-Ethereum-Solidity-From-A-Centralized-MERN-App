  const express = require('express');
  const app = express()
const bodyParse = require('body-parser')
const { save_user_information } = require('./models/server_db.js')

 // handeling all the parsing

app.use(bodyParse.json())
app.post('/', async (req,res) => {
  var email = req.body.email
  var amount =req.body.amount

if (amount <= 1 ) {
  return_info = {}
  return_info.error = true
  return_info.message = "the amount should be grater than 1"
  return res.json(return_info)
}
  var result = await save_user_information( {"amount" : amount , "email" : email})
  res.send (result)
})

app.get('/get_total_amount' , async (req , res) => {
  var result =  await get_total_amount()
      res.send(result)

})
  app.listen(3000 , () => {
    console.log ("server is running on port 3000")
  })
