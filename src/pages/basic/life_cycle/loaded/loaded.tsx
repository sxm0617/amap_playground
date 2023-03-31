import AMapLoader from '@amap/amap-jsapi-loader'
import { message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 地图加载完成
 */
const BasicLifeCycleLoaded: FC = () => {
  const [map, setMap] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          zoom: 5,
          center: [105.602725, 37.076636],
        })
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    if (!map) {
      return
    }

    map.on('complete', () => {
      message.success('地图加载完成')
    })
  }, [map])

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
    </div>
  )
}

export default BasicLifeCycleLoaded
