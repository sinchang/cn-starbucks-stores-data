'use strict'

const axios = require('axios')
const fs = require('fs')
const pcs = require('./pc.json')
const prettier = require('prettier')

const APIURL =
  'https://www.starbucks.com.cn/api/stores'
const result = {}
const FixedCity = ['上海市', '天津市', '重庆市', '北京市', '香港', '澳門']
const searchProvince = city => {
  if (FixedCity.indexOf(city) > -1) return city
  if (city === 'Hong Kong') return '香港'
  if (city === 'Macau') return '澳門'
  if (city === 'SHANGHAI' || city === 'Shanghai') return '上海市'
  if (city === 'Beijing') return '北京市'
  if (city === 'Yangzhou' || city === 'Suzhou' || city === 'Nantong' || city === 'Wuxi' || city === 'Nanjing') return '江苏省'
  if (city === 'Hangzhou' || city === 'Jinhua' || city === 'Huzhou' || city === 'TBD' || city === 'Ningbo') return '浙江省'
  if (city === '襄樊市' || city === 'Wuhan') return '湖北省'
  if (city === 'Guangzhou' || city === 'Shenzhen') return '广东省'
  if (city === 'Tin Shui Wai') return '黑龙江省'
  if (city === '延吉市') return '吉林省'
  if (city === 'Chengdu City' || city === '西昌市' || city === 'Luzhou' || city === 'Chengdu' || city === 'Nanchong' || city === 'Panzhihua') return '四川省'
  if (city === '大理市' || city === '景洪市') return '云南省'
  if (city === 'Jinan') return '山东省'
  if (city === 'Chongqing') return '重庆市'
  if (city === 'Anqing') return '安徽省'
  if (city === '海南省') return '海南省'

  for (const k in pcs) {
    for (const x of pcs[k]) {
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
    fs.writeFileSync('./data.json', JSON.stringify(res.data))
    data.forEach(item => {
      const city = item.address.city
      const provice = searchProvince(city)
      if (!provice) {
        throw new Error(`${city} 没找到对应省份`)
      }
      if (!result[provice]) {
        result[provice] = {}
        result[provice].count = 1
      } else {
        result[provice].count = result[provice].count + 1
      }
    })

    fs.writeFileSync(
      './format.json',
      prettier.format(
        JSON.stringify({
          data: Object.keys(result).map(key => {
            return {
              name: key,
              count: result[key].count
            }
          }).sort((a, b) => b.count - a.count),
          total: res.data.meta.total
        }),
        { parser: 'json' }
      )
    )
  })
  .catch(err => {
    console.log(err)
  })
