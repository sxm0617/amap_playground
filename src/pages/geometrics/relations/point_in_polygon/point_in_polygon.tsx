import AMapLoader from '@amap/amap-jsapi-loader'
import { Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 判断点是否在多边形中
 */
const GeometricsRelationsPointInPolygon: FC = () => {
  const path = [
    [116.169465, 39.93267],
    [116.16026, 39.924492],
    [116.186138, 39.879817],
    [116.150625, 39.710019],
    [116.183198, 39.70992],
    [116.22695, 39.777616],
    [116.421078, 39.810771],
    [116.442621, 39.799892],
    [116.463478, 39.790066],
    [116.588276, 39.809551],
    [116.536091, 39.808859],
    [116.573856, 39.839643],
    [116.70638, 39.91674],
    [116.657285, 39.934545],
    [116.600293, 39.93777],
    [116.540039, 39.937968],
    [116.514805, 39.982375],
    [116.499935, 40.01371],
    [116.54652, 40.030443],
    [116.687668, 40.129961],
    [116.539697, 40.080659],
    [116.50339, 40.058474],
    [116.4688, 40.052578],
  ]

  const [dragText, setDragText] = useState('不在多边形内')

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.InfoWindow'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const polygon = new AMap.Polygon({
          map: map,
          path: path,
        })
        const marker = new AMap.Marker({
          map: map,
          draggable: true,
          position: [116.566298, 40.014179],
        })
        marker.on('dragging', (e: any) => {
          var isInPolygon = AMap.GeometryUtil.isPointInRing(e.lnglat, path)
          setDragText(isInPolygon ? '在多边形内' : '不在多边形内')
        })

        map.setFitView()
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr'>
        <div>拖拽标记点进出多边形</div>
        <div>{dragText}</div>
      </Card>
    </div>
  )
}

export default GeometricsRelationsPointInPolygon
