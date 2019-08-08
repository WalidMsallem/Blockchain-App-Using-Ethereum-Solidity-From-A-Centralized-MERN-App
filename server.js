  const express = require('express');
  const app = express()
const bodyParse = require('body-parser')
const { save_user_information } = require('./models/server_db.js')
const path = require ('path')
const publicPath = path.join(__dirname, './public')
const paypal = require ('paypal-rest-sdk')

 // handeling all the parsing
app.use(bodyParse.json())

app.use(express.static(publicPath))


// paypal config
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AbTok7XNX-Vgh4RwD_y9__0jPlxKxe7TnLpCCHzIK_b1l6QUlZcXNvOPnBlh0mW9AhbGFckb8AxHUWRW',
  'client_secret': 'ELNjPwkYThyrGs2WzxZT2xR4RgPGVM5ypovBFNwQk2g6Y8qgrgBeKd7LP-rJBUmd_e9FpeyV3A8bz-6N'
});
app.post('/post_info', async (req,res) => {
  var email = req.body.email
  var amount =req.body.amount

if (amount <= 1 ) {
  return_info = {}
  return_info.error = true
  return_info.message = "the amount should be grater than 1"
  return res.json(return_info)
}
  var result = await save_user_information( {"amount" : amount , "email" : email})


  var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Lottery",
                  "sku": "sku",
                  "price":  amount,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": amount
          },
          "payee": {
            'email' :"ottery_manager@lottery.com"
       },
          "description": "This is the payment description. ( Lottery purchase ) "
      }]
  };


  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
       payment.links.map(element => {
         if(element.rel === 'approval_url'){
           return res.send(element.href)
         }
       })


      }
  });


//   res.send (result)
})

app.get('/get_total_amount' , async (req , res) => {
  var result =  await get_total_amount()
      res.send(result)

})
  app.listen(3000 , () => {
    console.log ("server is running on port 3000")
  })
