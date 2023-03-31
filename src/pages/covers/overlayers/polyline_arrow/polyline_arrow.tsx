import AMapLoader from '@amap/amap-jsapi-loader'
import React, { FC, useEffect } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 折线添加方向箭头
 */
const CoversOverlayersPolylineArrow: FC = () => {
  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.OverlayGroup', 'AMap.PolylineEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})

        const canvasDir = document.createElement('canvas')
        const width = 24
        canvasDir.width = width
        canvasDir.height = width

        const context = canvasDir.getContext('2d')
        if (context) {
          context.strokeStyle = 'red'
          context.lineJoin = 'round'
          context.lineWidth = 8
          context.moveTo(-4, width - 4)
          context.lineTo(width / 2, 6)
          context.lineTo(width + 4, width - 4)
          context.stroke()
        }

        const polyline = new AMap.Polyline({
          path: [
            [75.757904, 41.118117],
            [97.375719, 27.598057],
            [117.375719, 41.118117],
          ], // 设置线覆盖物路径
          showDir: true,
          dirImg: canvasDir,
          strokeColor: '#3366cc', // 线颜色
          strokeWeight: 10, // 线宽
        })

        map.add(polyline)
        map.setFitView()
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
    </div>
  )
}

export default CoversOverlayersPolylineArrow
