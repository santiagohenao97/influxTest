const express = require('express');
const router = express.Router();
const {InfluxDB, Point} = require('@influxdata/influxdb-client')
const { dbConfig } = require('../config')
const client = new InfluxDB({url: dbConfig.url , token: dbConfig.token})


router.post('/', (req, res)=>{
  const writeApi = client.getWriteApi(dbConfig.org, dbConfig.bucket)
  const point = new Point('controler')
    .floatField('control', 24)
  writeApi.writePoint(point)
  writeApi
      .close()
      .then(() => {
          console.log('FINISHED')
          res.json({ message:`Dato guardado`, })
      })
      .catch(e => {
          console.error(e)
      })
})

module.exports = router