const express = require('express');
const router = express.Router();
const {InfluxDB, Point} = require('@influxdata/influxdb-client')
const { dbConfig } = require('../config')
const client = new InfluxDB({url: dbConfig.url , token: dbConfig.token})

router.get('/:dataRange', (req, res) => {

  const { dataRange }  = req.params
  console.log(dataRange)
  const queryApi = client.getQueryApi(dbConfig.org)
  const query = `from(bucket: "${dbConfig.bucket}") |> range(start: -${dataRange}) |> filter(fn: (r) => r["_field"] == "humidity")`
  const humidity = []
  console.log('HOOOOLA')
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      humidity.push(o)
    },
    error(error) {
      console.error(error)
      console.log('\nFinished ERROR')
      res.json({ message:`No se pudieron obtener los datos`, })
    },
    complete() {
      console.log('\nFinished SUCCESS')
      res.json(humidity)
    }
  })
})
module.exports = router