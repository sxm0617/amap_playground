import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card, Input, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapPropertyRange: FC = () => {
  const [map, setMap] = useState<any>()
  const [centerInfo, setCenterInfo] = useState<any>()
  const [lng, setLng] = useState<any>()
  const [lat, setLat] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    if (!map) {
      return
    }

    map.on('moveend', getCenterInfo)
    map.on('zoomend', getCenterInfo)
  }, [map])

  const getCenterInfo = () => {
    const center = map.getCenter()
    setCenterInfo(center)
  }

  const handleMove = () => {
    if (lng !== lng || lat !== lat) {
      message.error('请输入数字')
    }

    map.panBy(lng, lat)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '300px' }}>
        中心坐标：
        {centerInfo ? `${centerInfo.lng}, ${centerInfo.lat}` : ''}
      </Card>
      <Card className='info-card info-card-br'>
        <Input.Group compact>
          <Input
            style={{ width: '150px' }}
            placeholder='水平像素'
            onChange={(e: any) => setLng(+e.target.value)}
          />
          <Input
            style={{ width: '150px' }}
            placeholder='垂直像素'
            onChange={(e: any) => setLat(+e.target.value)}
          />
          <Button type='primary' onClick={handleMove}>
            移动坐标
          </Button>
        </Input.Group>
      </Card>
    </div>
  )
}

export default BasicMapPropertyRange
