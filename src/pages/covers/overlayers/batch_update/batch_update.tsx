import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 批量更新矢量图形
 * 支持标记点、折线、曲线、多边形、矩形、圆形、椭圆形（2.0.5）
 */
const CoversOverlayersBatchUpdate: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [overlayGroup, setOverlayGroup] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.OverlayGroup', 'AMap.PolylineEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.4, 39.91],
          zoom: 13,
        })
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleDraw = () => {
    const polyline = drawPolyline()
    const polygon = drawPolygon()
    const circle = drawCircle()
    const overlayGroup = new AMap.OverlayGroup([polyline, polygon, circle])
    map.add(overlayGroup)
    setOverlayGroup(overlayGroup)
  }

  const drawPolyline = () => {
    return new AMap.Polyline({
      path: [
        [116.37, 39.91],
        [116.38, 39.9],
        [116.39, 39.91],
        [116.4, 39.9],
      ], //设置线覆盖物路径
      strokeColor: '#3366FF', //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 5, //线宽
      strokeStyle: 'solid', //线样式
      strokeDasharray: [10, 5], //补充线样式
    })
  }

  const drawPolygon = () => {
    return new AMap.Polygon({
      path: [
        [116.4, 39.92],
        [116.41, 39.9],
        [116.4, 39.89],
        [116.39, 39.89],
      ], //设置多边形边界路径
      strokeColor: '#FF33FF', //线颜色
      strokeOpacity: 0.2, //线透明度
      strokeWeight: 3, //线宽
      fillColor: '#1791fc', //填充色
      fillOpacity: 0.35, //填充透明度
    })
  }

  const drawCircle = () => {
    return new AMap.Circle({
      center: new AMap.LngLat('116.40', '39.92'), // 圆心位置
      radius: 1000, //半径
      strokeColor: '#F33', //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 3, //线粗细度
      fillColor: '#ee2200', //填充颜色
      fillOpacity: 0.35, //填充透明度
    })
  }

  const handleChangeStyle = () => {
    if (!overlayGroup) {
      return
    }

    overlayGroup.setOptions({
      fillColor: getRandomColor(),
      strokeColor: getRandomColor(),
      outlineColor: getRandomColor(),
    })
  }

  const getRandomColor = () => {
    return `#${((Math.random() * 0xffffff) << 0).toString(16)}`
  }

  const handleRemove = () => {
    map.remove(overlayGroup)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', gap: '16px' }}>
          {!overlayGroup && (
            <Button type='primary' onClick={handleDraw}>
              绘制图形
            </Button>
          )}
          {overlayGroup && (
            <Button type='primary' onClick={handleChangeStyle}>
              更改样式
            </Button>
          )}
          {overlayGroup && (
            <Button type='primary' onClick={handleRemove}>
              移除图形
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default CoversOverlayersBatchUpdate
