import AMapLoader from '@amap/amap-jsapi-loader'
import React, { FC, useEffect } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 创建地图
 * 这里使用了JSAPI Loader，加载方式为异步加载，在React框架下推荐适用
 * 除此之外有其他异步或同步加载方式，详情见
 * https://lbs.amap.com/api/jsapi-v2/guide/abc/load
 */
const BasicLifeCycleCreate: FC = () => {
  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        new AMap.Map('container', {
          zoom: 5,
          center: [105.602725, 37.076636],
        })
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

export default BasicLifeCycleCreate
