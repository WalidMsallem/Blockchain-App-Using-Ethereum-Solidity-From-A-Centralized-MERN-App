var mysql = require('mysql)

var db_config = {
  host : '127.0.0.1',
  user : 'root',
  password : 'root',
  database : 'webapp'
}

var connection
function handelDisconnect () {
  connection = mysql.createConnection (db_config)

  connection.connect( function (err) {
    if (err) {
      console.log( 'error when connecting to db : ' , err)
      setTimeout(handelDisconnect , 2000)
    }
  })
  connecting.on('error' , function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handelDisconnect ()
    }else {
      throw err
    }
  })
}

handelDisconnect()

module.exports = connection
