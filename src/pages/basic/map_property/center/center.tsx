import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card, Input, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapPropertyCenter: FC = () => {
  const [map, setMap] = useState<any>()
  const [centerInfo, setCenterInfo] = useState<any>({
    zoom: 5,
    lng: 105.602725,
    lat: 37.076636,
  })
  const [zoom, setZoom] = useState(12)
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  const [region, setRegion] = useState('')

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
    getCenterInfo()
  }, [map])

  const getCenterInfo = () => {
    const zoom = map.getZoom()
    const { lng, lat } = map.getCenter()
    map.getCity((info: any) => {
      setCenterInfo({
        zoom,
        lng,
        lat,
        ...info,
      })
    })
  }

  const handleSetZoom = () => {
    if (!zoom || zoom < 3 || zoom > 20) {
      message.error('缩放级别为3~20的数字')
      return
    }

    map.setZoom(zoom)
  }

  const handleSetLngLat = () => {
    if (lng !== lng || lng < -180 || lng > 180) {
      message.error('经度为-180~180的数字')
      return
    }

    if (lat !== lat || lat < -90 || lat > 90) {
      message.error('维度为-90~90的数字')
      return
    }

    map.setCenter([lng, lat])
  }

  const handleSetRegion = () => {
    map.setCity(region)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '300px' }}>
        <div>缩放级别：{centerInfo.zoom || ''}</div>
        <div>
          中心坐标：{`${centerInfo.lng || ''}, ${centerInfo.lat || ''}`}
        </div>
        <div>
          行政区域：
          {`${centerInfo.province || ''} ${centerInfo.city || ''} ${
            centerInfo.district || ''
          }`}
        </div>
        <div>行政区号：{centerInfo.citycode || ''}</div>
      </Card>
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Input.Group compact>
            <Input
              style={{ width: '300px' }}
              placeholder='缩放级别，3~20'
              onChange={(e: any) => setZoom(+e.target.value)}
            />
            <Button type='primary' onClick={handleSetZoom}>
              设置缩放级别
            </Button>
          </Input.Group>
          <Input.Group compact>
            <Input
              style={{ width: '150px' }}
              placeholder='经度，-180~180'
              onChange={(e: any) => setLng(+e.target.value)}
            />
            <Input
              style={{ width: '150px' }}
              placeholder='纬度，-90~90'
              onChange={(e: any) => setLat(+e.target.value)}
            />
            <Button type='primary' onClick={handleSetLngLat}>
              设置中心坐标
            </Button>
          </Input.Group>
          <Input.Group compact>
            <Input
              style={{ width: '300px' }}
              placeholder='行政区域，省市区、区号或行政编码'
              onChange={(e: any) => setRegion(e.target.value)}
            />
            <Button type='primary' onClick={handleSetRegion}>
              设置行政区域
            </Button>
          </Input.Group>
        </div>
      </Card>
    </div>
  )
}

export default BasicMapPropertyCenter
