import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 通过鼠标自定义绘制矢量图形
 * 目前仅支持标记点、折线、多边形、矩形、圆形
 * 不支持曲线、椭圆形及其他图形（2.0.5版本）
 */
const CoversOverlayersCustomDraw: FC = () => {
  const [mouseTool, setMouseTool] = useState<any>()
  const [drawText, setDrawText] = useState('未绘制图形')
  const shape = useRef('')

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.MouseTool'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          zoom: 10,
        })
        const mouseTool = new AMap.MouseTool(map)
        mouseTool.on('draw', handleDraw)
        setMouseTool(mouseTool)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleDraw = (e: any) => {
    // 事件返回的对象有type和obj两个属性，type为string类型，表示事件名称，一直为'draw'
    console.log(e.type)
    // obj为图形对象，可以使用所属类的方法，如getOptions()获取配置信息，详情见官方文档
    console.log(e.obj)
    console.log(e.obj.getOptions())
    switch (shape.current) {
      case 'polyline':
        setDrawText('绘制了折线')
        break

      case 'polygon':
        setDrawText('绘制了多边形')
        break

      case 'rectangle':
        setDrawText('绘制了矩形')
        break

      case 'circle':
        setDrawText('绘制了圆形')
        break
    }
  }

  const handlePolyline = () => {
    mouseTool.polyline({
      strokeColor: '#3366FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      strokeStyle: 'solid',
    })
    shape.current = 'polyline'
  }

  const handlePolygon = () => {
    mouseTool.polygon({
      strokeColor: '#FF33FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      fillColor: '#1791fc',
      fillOpacity: 0.4,
      strokeStyle: 'solid',
    })
    shape.current = 'polygon'
  }

  const handleRectangle = () => {
    mouseTool.rectangle({
      strokeColor: 'red',
      strokeOpacity: 0.5,
      strokeWeight: 6,
      fillColor: 'blue',
      fillOpacity: 0.5,
      strokeStyle: 'solid',
    })
    shape.current = 'rectangle'
  }

  const handleCircle = () => {
    mouseTool.circle({
      strokeColor: '#FF33FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      fillColor: '#1791fc',
      fillOpacity: 0.4,
      strokeStyle: 'solid',
    })
    shape.current = 'circle'
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '150px' }}>
        {drawText}
      </Card>
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          使用鼠标绘制
          <Button type='primary' onClick={handlePolyline}>
            自定义折线
          </Button>
          <Button type='primary' onClick={handlePolygon}>
            自定义多边形
          </Button>
          <Button type='primary' onClick={handleRectangle}>
            自定义矩形
          </Button>
          <Button type='primary' onClick={handleCircle}>
            自定义圆形
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CoversOverlayersCustomDraw
