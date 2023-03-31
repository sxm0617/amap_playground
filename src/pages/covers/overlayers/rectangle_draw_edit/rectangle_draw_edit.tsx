import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversOverlayersRectangleDrawEdit: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [rectangle, setRectangle] = useState<any>()
  const [rectangleEditor, setRectangleEditor] = useState<any>()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.RectangleEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.387175, 39.876405],
          zoom: 13,
        })
        const rectangleEditor = new AMap.RectangleEditor(map)
        setRectangleEditor(rectangleEditor)
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleDraw = () => {
    if (rectangle) {
      return
    }

    const southWest = new AMap.LngLat(116.356449, 39.859008)
    const northEast = new AMap.LngLat(116.417901, 39.893797)
    const bounds = new AMap.Bounds(southWest, northEast)

    const newRectangle = new AMap.Rectangle({
      bounds: bounds,
      strokeColor: 'red',
      strokeWeight: 6,
      strokeOpacity: 0.5,
      strokeDasharray: [30, 10],
      strokeStyle: 'dashed',
      fillColor: 'blue',
      fillOpacity: 0.5,
      cursor: 'pointer',
      zIndex: 50,
    })

    map.add(newRectangle)
    map.setFitView()
    setRectangle(newRectangle)
  }

  const handleEdit = () => {
    rectangleEditor.setTarget(rectangle)
    rectangleEditor.open()
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    rectangleEditor.close()
    setIsEditing(false)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {rectangle ? (
              isEditing ? (
                <Button type='primary' onClick={handleStopEdit}>
                  停止编辑
                </Button>
              ) : (
                <Button type='primary' onClick={handleEdit}>
                  编辑矩形
                </Button>
              )
            ) : (
              <Button type='primary' onClick={handleDraw}>
                绘制矩形
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CoversOverlayersRectangleDrawEdit
