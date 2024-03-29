var db = require('../db.js')

save_user_information = (data) =>  new Promise ((resolve , reject) => {
  db.query('INSERT INTO lottery_info SET ?', data, function(err,results, fields) {
    if (err) {
      reject('could not insert into lottery infromation')
    }
    resolve('Succesful')
  })
})

get_total_amount = (data) =>  new Promise ((resolve , reject) => {
  db.query('select sum(amount) as total_amount  from lottery_info', null, function(err,results, fields) {
    if (err) {
      reject('could not get total amount')
    }
    resolve(results)

  })
})

module.exports =  {
  save_user_information
}
