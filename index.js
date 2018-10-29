'use strict'

const axios = require('axios')
const fs = require('fs')
const pcs = require('./pc.json')

const APIURL =
  'https://www.starbucks.com.cn/api/stores/nearby?lat=31.231706&lon=121.472644&limit=10000&locale=ZH&features=&radius=10000000000'
const result = {}
const FixedCity = ['上海市', '天津市', '重庆市', '北京市', '香港', '澳門']
const searchProvince = city => {
  if (FixedCity.indexOf(city) > -1) return city
  if (city === 'Hong Kong') return '香港'
  if (city === 'Macau') return '澳門'
  for (let k in pcs) {
    for (let x of pcs[k]) {
      if (x.indexOf(city) > -1) {
        return k
      }
    }
  }
}

axios
  .get(APIURL)
  .then(res => {
    const data = res.data.data

    data.forEach(item => {
      const city = item.address.city
      const provice = searchProvince(city)
      if (!provice) {
        console.log(`${city} 没找到对应省份`)
        return
      }
      if (!result[provice]) {
        result[provice] = {}
        result[provice].count = 1
      } else {
        result[provice].count = result[provice].count + 1
      }
    })

    fs.writeFileSync('./format.json', JSON.stringify(result))
  })
  .catch(err => {
    console.log(err)
  })
