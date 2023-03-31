import AMapLoader from '@amap/amap-jsapi-loader'
import React, { FC, useEffect } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapPropertyHotSpotInfo: FC = () => {
  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.PlaceSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const placeSearch = new AMap.PlaceSearch()
        const infoWindow = new AMap.InfoWindow({})
        map.on('hotspotover', (result: any) => {
          placeSearch.getDetails(result.id, (status: any, result: any) => {
            if (status === 'complete' && result.info === 'OK') {
              const hotSpotInfo = result.poiList.pois[0]
              const { name, address, tel, type, location } = hotSpotInfo
              const content = `
                <div>${name}</div>
                <div>地址：${address}</div>
                <div>电话：${tel}</div>
                <div>类型：${type}</div>
              `
              infoWindow.setContent(content)
              infoWindow.open(map, location)
            }
          })
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

export default BasicMapPropertyHotSpotInfo
