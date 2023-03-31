import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversOverlayersPolylineDrawEdit: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [basicPolyline, setBasicPolyline] = useState<any>()
  const [customPolyline, setCustomPolyline] = useState<any>()
  const [polylineEditor, setPolylineEditor] = useState<any>()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.PolylineEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const polylineEditor = new AMap.PolylineEditor(map)
        setPolylineEditor(polylineEditor)
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleBasicDraw = () => {
    if (basicPolyline) {
      return
    }

    const path = [
      [116.403322, 39.920255],
      [116.410703, 39.897555],
      [116.402292, 39.892353],
      [116.389846, 39.891365],
    ]

    const polyline = new AMap.Polyline({
      path: path,
      isOutline: true,
      outlineColor: '#ffeeff',
      borderWeight: 3,
      strokeColor: '#3366FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      strokeStyle: 'solid',
      strokeDasharray: [10, 5],
      lineJoin: 'round',
      lineCap: 'round',
      zIndex: 50,
    })

    map.add(polyline)
    map.setFitView()
    setBasicPolyline(polyline)
  }

  const handleCustomDraw = () => {
    if (customPolyline) {
      return
    }

    const path = [
      [116.453322, 39.920255],
      [116.460703, 39.897555],
      [116.452292, 39.892353],
      [116.439846, 39.891365],
    ]

    const polyline = new AMap.Polyline({
      path: path,
      isOutline: true,
      outlineColor: 'white',
      borderWeight: 5,
      strokeColor: 'red',
      strokeOpacity: 0.8,
      strokeWeight: 10,
      strokeStyle: 'dashed',
      strokeDasharray: [20, 20],
      lineJoin: 'round',
      lineCap: 'round',
      zIndex: 50,
    })

    map.add(polyline)
    map.setFitView()
    setCustomPolyline(polyline)
  }

  const handleBasicEdit = () => {
    polylineEditor.setTarget(basicPolyline)
    polylineEditor.open()
    setIsEditing(true)
  }

  const handleCustomEdit = () => {
    polylineEditor.setTarget(customPolyline)
    polylineEditor.open()
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    polylineEditor.close()
    setIsEditing(false)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {basicPolyline ? (
              <Button type='primary' onClick={handleBasicEdit}>
                编辑基本折线
              </Button>
            ) : (
              <Button type='primary' onClick={handleBasicDraw}>
                绘制基本折线
              </Button>
            )}
            {customPolyline ? (
              <Button type='primary' onClick={handleCustomEdit}>
                编辑自定义折线
              </Button>
            ) : (
              <Button type='primary' onClick={handleCustomDraw}>
                绘制自定义折线
              </Button>
            )}
            {isEditing && (
              <Button type='primary' onClick={handleStopEdit}>
                停止编辑
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CoversOverlayersPolylineDrawEdit
