import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversOverlayersPolygonDrawEdit: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [polygon, setPolygon] = useState<any>()
  const [polygonEditor, setPolygonEditor] = useState<any>()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.PolygonEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.397637, 39.900001],
          zoom: 14,
        })
        const polygonEditor = new AMap.PolygonEditor(map)
        setPolygonEditor(polygonEditor)
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleDraw = () => {
    if (polygon) {
      return
    }

    const path = [
      [116.403322, 39.920255],
      [116.410703, 39.897555],
      [116.402292, 39.892353],
      [116.389846, 39.891365],
    ]

    const newPolygon = new AMap.Polygon({
      path: path,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      fillColor: '#1791fc',
      zIndex: 50,
      bubble: true,
    })

    map.add(newPolygon)
    map.setFitView()
    setPolygon(newPolygon)
  }

  const handleEdit = () => {
    polygonEditor.setTarget(polygon)
    polygonEditor.open()
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    polygonEditor.close()
    setIsEditing(false)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {polygon ? (
              isEditing ? (
                <Button type='primary' onClick={handleStopEdit}>
                  停止编辑
                </Button>
              ) : (
                <Button type='primary' onClick={handleEdit}>
                  编辑多边形
                </Button>
              )
            ) : (
              <Button type='primary' onClick={handleDraw}>
                绘制多边形
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CoversOverlayersPolygonDrawEdit
