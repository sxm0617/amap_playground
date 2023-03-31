import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 默认样式信息窗体
 */
const CoversInfoWindowsDefaultStyleWindow: FC = () => {
  const [map, setMap] = useState<any>()
  const [infoWindow, setInfoWIndow] = useState<any>()
  const [isWinowOpen, setIsWinowOpen] = useState(false)
  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.InfoWindow'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.473188, 39.993253],
          zoom: 13,
        })
        const infoWindow = new AMap.InfoWindow({
          content: `
            <div style='width: 300px; display: flex; flex-direction: column; gap: 8px;'>
              <img src='https://webapi.amap.com/images/autonavi.png' style='width: 80px' />
              <h4>高德软件</h4>
              <div>电话 : 010-84107000   邮编 : 100102</div>
              <div>地址 :北京市朝阳区望京阜荣街10号首开广场4层</div>
            </div>
          `, //使用默认信息窗体框样式，显示信息内容
        })

        map.setFitView()
        setMap(map)
        setInfoWIndow(infoWindow)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleOpenWindow = () => {
    if (!infoWindow || !map) {
      return
    }

    infoWindow.open(map, map.getCenter())
    setIsWinowOpen(true)
  }

  const handleCloseWindow = () => {
    if (!infoWindow) {
      return
    }

    infoWindow.close()
    setIsWinowOpen(false)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        {isWinowOpen ? (
          <Button type='primary' onClick={handleCloseWindow}>
            关闭信息窗体
          </Button>
        ) : (
          <Button type='primary' onClick={handleOpenWindow}>
            打开信息窗体
          </Button>
        )}
      </Card>
    </div>
  )
}

export default CoversInfoWindowsDefaultStyleWindow
