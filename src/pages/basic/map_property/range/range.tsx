import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card, Input, Switch } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapPropertyRange: FC = () => {
  const [map, setMap] = useState<any>()
  const [AMap, setAMap] = useState<any>()
  const [NELng, setNELng] = useState(0)
  const [NELat, setNELat] = useState(0)
  const [SWLng, setSWLng] = useState(0)
  const [SWLat, setSWLat] = useState(0)
  const [shouldLimit, setShouldLimit] = useState(false)
  const [boundInfo, setBoundInfo] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        setAMap(AMap)
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

    map.on('moveend', getBounds)
    map.on('zoomend', getBounds)
  }, [map])

  useEffect(() => {
    if (!map) {
      return
    }

    if (shouldLimit) {
      map.setLimitBounds(boundInfo)
    } else {
      map.clearLimitBounds()
    }
  }, [shouldLimit])

  const getBounds = () => {
    const bounds = map.getBounds()
    setBoundInfo(bounds)
  }

  const handleSetLngLat = () => {
    if (
      NELng > -180 &&
      NELng < 180 &&
      NELat > -90 &&
      NELat < 90 &&
      SWLng > -180 &&
      SWLng < 180 &&
      SWLat > -90 &&
      SWLat < 90
    ) {
      const bounds = new AMap.Bounds([NELng, NELat], [SWLng, SWLat])
      map.setBounds(bounds)
    }
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '300px' }}>
        <div>当前地图展示范围</div>
        <div>
          东北坐标：
          {boundInfo
            ? `${boundInfo.northEast.lng}, ${boundInfo.northEast.lat}`
            : ''}
        </div>
        <div>
          西南坐标：
          {boundInfo
            ? `${boundInfo.southWest.lng}, ${boundInfo.southWest.lat}`
            : ''}
        </div>
      </Card>
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            东北坐标：
            <Input
              style={{ width: '150px' }}
              placeholder='经度，-180~180'
              onChange={(e: any) => setNELng(+e.target.value)}
            />
            <Input
              style={{ width: '150px' }}
              placeholder='纬度，-90~90'
              onChange={(e: any) => setNELat(+e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            西南坐标：
            <Input
              style={{ width: '150px' }}
              placeholder='经度，-180~180'
              onChange={(e: any) => setSWLng(+e.target.value)}
            />
            <Input
              style={{ width: '150px' }}
              placeholder='纬度，-90~90'
              onChange={(e: any) => setSWLat(+e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Switch onChange={(value: boolean) => setShouldLimit(value)} />
            {shouldLimit ? '取消限制范围' : '限制显示范围'}
          </div>
          <Button type='primary' onClick={handleSetLngLat}>
            显示所选区域
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default BasicMapPropertyRange
