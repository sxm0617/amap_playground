import AMapLoader from '@amap/amap-jsapi-loader'
import { Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const EventsMapEventLoad: FC = () => {
  const [lng, setLng] = useState()
  const [lat, setLat] = useState()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        map.on('complete', () => {
          const { lng, lat } = map.getCenter()
          setLng(lng)
          setLat(lat)
        })
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '280px' }}>
        地图加载完毕，当前中心点为：{lng && lat ? `${lng}, ${lat}` : ''}
      </Card>
    </div>
  )
}

export default EventsMapEventLoad
