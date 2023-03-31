import AMapLoader from '@amap/amap-jsapi-loader'
import { Card } from 'antd'
import Input from 'antd/lib/input/Input'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapPropertyGetLngLatByClick: FC = () => {
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
        map.on('click', (e: any) => {
          setLng(e.lnglat.getLng())
          setLat(e.lnglat.getLat())
        })
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          点击获取经纬度：
          <Input
            style={{ width: '200px' }}
            value={lng && lat ? `${lng}, ${lat}` : ''}
          />
        </div>
      </Card>
    </div>
  )
}

export default BasicMapPropertyGetLngLatByClick
