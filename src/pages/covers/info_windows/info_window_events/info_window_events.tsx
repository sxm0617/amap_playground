import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
// import { InfoWindow, Map } from 'react-amap'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'
declare const window: any

/**
 * 自定义样式信息窗体
 */
const CoversInfoWindowsInfoWindowEvents: FC = () => {
  const [map, setMap] = useState<any>()
  const [infoWindow, setInfoWindow] = useState<any>()
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  const [center, setCenter] = useState<any>()
  const [lngLat, setLngLat] = useState<any>()

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
            <div style='width: 300px'>
              <div>故宫博物院</div>
              <div style='display: flex'>
                <button onclick='getLngLat()'>获取经纬度</button>
                <div id='center' />
              </div>
            </div>
          `, //使用默认信息窗体框样式，显示信息内容
          closeWhenClickMap: true,
        })
        map.setFitView()
        setMap(map)
        setInfoWindow(infoWindow)
      })
      .catch((e: any) => {
        console.log(e)
      })

    return () => {
      if (window.getLngLat) {
        delete window.getLngLat
      }
    }
  }, [])

  useEffect(() => {
    if (!window) {
      return
    }

    window.getLngLat = () => {
      const { lng, lat } = map.getCenter()
      const div = document.getElementById('center')
      if (div) {
        div.innerHTML = `${lng}, ${lat}`
      }
    }
  }, [infoWindow])

  const handleGetCenter = () => {
    const { lng, lat } = map.getCenter()
    setLngLat({ lng, lat })
  }

  const handleOpenWindow = () => {
    if (!infoWindow || !map) {
      return
    }

    infoWindow.open(map, map.getCenter())
    setIsWindowOpen(true)
  }

  const handleCloseWindow = () => {
    if (!infoWindow) {
      return
    }

    infoWindow.close()
    setIsWindowOpen(false)
  }

  return (
    <div className='outer-container'>
      {/* 使用静态HTML，对事件不太友好 */}
      <div id='container' className='map-container' />
      {/* 使用amap-react组件，方便加事件，推荐使用，但是样式可能需要处理 */}
      {/* <Map
        amapkey={AMAP_APPLICATION_KEY}
        version='2.0.5'
        events={{
          created: (map: any) => {
            setMap(map)
            const center = map.getCenter()
            setCenter({
              longitude: center.lng,
              latitude: center.lat,
            })
          },
          moveend: (e: any) => {
            const center = map.getCenter()
            setCenter({
              longitude: center.lng,
              latitude: center.lat,
            })
          },
        }}
      >
        {center && (
          <InfoWindow
            position={center}
            events={{
              created: (infoWindow: any) => {
                setInfoWindow(infoWindow)
              },
            }}
          >
            <div>地图中心</div>
            <div style={{ display: 'flex' }}>
              <Button onClick={handleGetCenter}>获取经纬度</Button>
              <div>{lngLat ? `${lngLat.lng}, ${lngLat.lat}` : null}</div>
            </div>
          </InfoWindow>
        )}
      </Map> */}
      <Card className='info-card info-card-br'>
        {isWindowOpen ? (
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

export default CoversInfoWindowsInfoWindowEvents
