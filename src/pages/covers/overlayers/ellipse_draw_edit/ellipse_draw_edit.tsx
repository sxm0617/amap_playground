import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversOverlayersEllipseDrawEdit: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [ellipse, setEllipse] = useState<any>()
  const [ellipseEditor, setEllipseEditor] = useState<any>()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.EllipseEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.433322, 39.900255],
          zoom: 14,
        })
        const ellipseEditor = new AMap.EllipseEditor(map)
        setEllipseEditor(ellipseEditor)
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleDraw = () => {
    if (ellipse) {
      return
    }

    const newEllipse = new AMap.Ellipse({
      center: [116.433322, 39.900255],
      radius: [2000, 1000], //半径
      borderWeight: 3,
      strokeColor: '#FF33FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      fillOpacity: 0.4,
      strokeStyle: 'dashed',
      strokeDasharray: [10, 10],
      fillColor: '#1791fc',
      zIndex: 50,
    })

    map.add(newEllipse)
    map.setFitView()
    setEllipse(newEllipse)
  }

  const handleEdit = () => {
    ellipseEditor.setTarget(ellipse)
    ellipseEditor.open()
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    ellipseEditor.close()
    setIsEditing(false)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {ellipse ? (
              isEditing ? (
                <Button type='primary' onClick={handleStopEdit}>
                  停止编辑
                </Button>
              ) : (
                <Button type='primary' onClick={handleEdit}>
                  编辑椭圆形
                </Button>
              )
            ) : (
              <Button type='primary' onClick={handleDraw}>
                绘制椭圆形
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CoversOverlayersEllipseDrawEdit
