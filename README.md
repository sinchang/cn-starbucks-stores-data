# CN STARBUCKS STORE DATA [![Build Status](https://travis-ci.com/sinchang/cn-starbucks-stores-data.svg?branch=master)](https://travis-ci.com/sinchang/cn-starbucks-stores-data)

## Latest Updated

2018-11-21

## Web Script

```
[].slice.call(document.querySelectorAll('.LocationFilterGroup button')).map(v => v.innerText)

// =>

["安徽", "北京", "重庆", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "黑龙江", "河南", "湖北", "湖南", "内蒙古", "江苏", "江西", "吉林", "辽宁", "宁夏", "青海", "陕西", "山东", "上海", "山西", "四川", "天津", "西藏", "新疆", "云南", "浙江"]
```

## API

```
https://www.starbucks.com.cn/api/stores/nearby?lat=31.231706&lon=121.472644&limit=1000&locale=ZH&features=&radius=10000000000
```

## LICENSE

MIT
