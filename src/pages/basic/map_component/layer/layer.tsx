import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapComponentLayer: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [satellite, setSatellite] = useState<any>()
  const [roadNet, setRoadNet] = useState<any>()

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

  const handleSatelliteCreate = () => {
    const satellite = new AMap.TileLayer.Satellite()
    map.add(satellite)
    setSatellite(satellite)
  }

  const handleSatelliteRemove = () => {
    if (!satellite) {
      return
    }

    map.remove(satellite)
    setSatellite(undefined)
  }

  const handleRoadNetCreate = () => {
    const roadNet = new AMap.TileLayer.RoadNet()
    map.add(roadNet)
    setRoadNet(roadNet)
  }

  const handleRoadNetRemove = () => {
    if (!roadNet) {
      return
    }

    map.remove(roadNet)
    setRoadNet(undefined)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '80px' }}>卫星图层：</div>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleSatelliteCreate}
            >
              添加卫星图层
            </Button>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleSatelliteRemove}
            >
              删除卫星图层
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '80px' }}>路网图层：</div>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleRoadNetCreate}
            >
              添加路网图层
            </Button>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleRoadNetRemove}
            >
              删除路网图层
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BasicMapComponentLayer
