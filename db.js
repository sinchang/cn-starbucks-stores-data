'use strict'

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data.sqlite'
  },
  useNullAsDefault: true
})

const json = require('./format.json')
const provinces = json.data;

(async () => {
  try {
    for (let i = 0; i < provinces.length; i++) {
      const province = provinces[i]

      const item = {
        province: province.name,
        date: knex.fn.now(),
        count: province.count
      }

      await knex('store').insert(item)
    }

    process.exit(0)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
