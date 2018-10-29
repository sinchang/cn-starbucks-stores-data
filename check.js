'use strict'

const data = require('./format.json')
const assert = require('assert')

let count = 0

for (let k in data.data) {
  count += data.data[k].count
}

assert(count === data.total)
