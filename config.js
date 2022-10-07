const config ={
  appConfig:{
    port : process.env['port'],
    host : process.env['host'] 
  },
  dbConfig:{
    token : process.env['token'],
    org :  process.env['org'],
    bucket : process.env['bucket'],
    url : process.env['url'],
  }

}

module.exports = config