const {InfluxDB} = require('@influxdata/influxdb-client')

const token = process.env['token']
const org =  process.env['org']
const bucket = process.env['bucket']
const url = process.env['url']

const client = new InfluxDB({url , token})

const queryApi = client.getQueryApi(org)

const query = `from(bucket: "${bucket}") |> range(start: -48h) |> filter(fn: (r) => r["_field"] == "temperature")`

queryApi.queryRows(query, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row)
    console.log(
      `${o._time} ${o._measurement}  ${o._field}=${o._value}`)
  },
  error(error) {
    console.error(error)
    console.log('\nFinished ERROR')
  },
  complete() {
    console.log('\nFinished SUCCESS')
  }
})


const {Point} = require('@influxdata/influxdb-client')
const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({host: 'host1'})

const point = new Point('control')
  .floatField('control', 1)
writeApi.writePoint(point)
writeApi
    .close()
    .then(() => {
        console.log('FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('\\nFinished ERROR')
    })