import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapComponentCover: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [markers, setMarkers] = useState<any>([])
  const [circles, setCircles] = useState<any>([])

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
    if (map) {
      map.setFitView()
    }
  }, [markers, circles])

  const handleMarkerCreate = () => {
    const lng = (Math.random() - 0.5) * 2 + 115
    const lat = (Math.random() - 0.5) * 10 + 30
    const marker = new AMap.Marker({
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      position: [lng, lat],
      anchor: 'bottom-center',
    })
    map.add(marker)
    setMarkers([...markers, marker])
  }

  const handleMarkerRemove = () => {
    const marker = markers[0]
    if (!marker) {
      return
    }

    map.remove(marker)
    setMarkers(markers.slice(1))
  }

  const handleCircleCreate = () => {
    const lng = (Math.random() - 0.5) * 10 + 115
    const lat = (Math.random() - 0.5) * 10 + 30
    const circle = new AMap.Circle({
      center: new AMap.LngLat(lng, lat), // 圆心位置
      radius: Math.random() * 100000, //半径
      strokeColor: '#F33', //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 3, //线粗细度
      fillColor: '#ee2200', //填充颜色
      fillOpacity: 0.35, //填充透明度
    })
    map.add(circle)
    setCircles([...circles, circle])
  }

  const handleCircleRemove = () => {
    const circle = circles[0]
    if (!circle) {
      return
    }

    map.remove(circle)
    setCircles(circles.slice(1))
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '60px' }}>Marker:</div>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleMarkerCreate}
            >
              添加Marker
            </Button>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleMarkerRemove}
            >
              删除Marker
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '60px' }}>Circle:</div>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleCircleCreate}
            >
              添加Circle
            </Button>
            <Button
              type='primary'
              style={{ width: '120px' }}
              onClick={handleCircleRemove}
            >
              删除Circle
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BasicMapComponentCover
