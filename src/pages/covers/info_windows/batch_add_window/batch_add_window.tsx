import AMapLoader from '@amap/amap-jsapi-loader'
import React, { FC, useEffect } from 'react'
// import { InfoWindow, Map } from 'react-amap'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'
declare const window: any

/**
 * 自定义样式信息窗体
 */
const CoversInfoWindowsBatchAddWindow: FC = () => {
  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.InfoWindow'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
          closeWhenClickMap: true,
        })
        const lngLats = [
          [116.368904, 39.923423],
          [116.382122, 39.921176],
          [116.387271, 39.922501],
          [116.398258, 39.9146],
        ]
        lngLats.map((lngLat, index) => {
          const marker = new AMap.Marker({
            map: map,
            position: lngLat,
          })

          marker.on('click', () => {
            infoWindow.setContent(`这是第${index + 1}个标记`)
            infoWindow.open(map, marker.getPosition())
          })
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
    </div>
  )
}

export default CoversInfoWindowsBatchAddWindow
