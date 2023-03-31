import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'
import './style.css'
declare const window: any

/**
 * 自定义样式信息窗体
 */
const CoversInfoWindowsCustomStyleWindow: FC = () => {
  const [map, setMap] = useState<any>()
  const [infoWindow, setInfoWindow] = useState<any>()
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  const [center, setCenter] = useState<{
    longitude: number
    latitude: number
  }>()

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
          isCustom: true,
          content: `
            <div style='width: 400px;'>
              <div style='display: flex; flex-direction: column; border: solid 1px silver;'>
                <div style=' background: none repeat scroll 0 0 #F9F9F9; border-bottom: 1px solid #CCC; border-radius: 5px 5px 0 0; padding: 4px 8px;'>
                  方恒假日酒店
                  <span style='font-size: 12px; font-weight: bold; color: red;'>价格:318</span>
                  <img src='https://webapi.amap.com/images/close2.gif' style='position: absolute; top: 12px; right: 10px; cursor: pointer' onclick='closeInfoWindow()' />
                </div>
                <div style='position: relative; display: flex; gap: 8px; background-color: white; padding: 8px 4px;'>
                  <img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>
                  <div>
                    <div>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里</div>
                    <div>电话：010-64733333</div>
                    <a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105' style='text-decoration: underline'>详细信息</a>
                  </div>
                </div>
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
      if (window.closeInfoWindow) {
        delete window.closeInfoWindow
      }
    }
  }, [])

  useEffect(() => {
    if (infoWindow) {
      window.closeInfoWindow = function () {
        infoWindow.close()
        setIsWindowOpen(false)
      }
    }
  }, [infoWindow])

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
            isCustom
          >
            <div
              style={{
                background: 'none repeat scroll 0 0 #F9F9F9',
                borderBottom: '1px solid #CCC',
                borderRadius: '5px 5px 0 0',
                padding: '4px 8px',
              }}
            >
              方恒假日酒店
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'red',
                }}
              >
                价格:318
              </span>
              <img
                src='https://webapi.amap.com/images/close2.gif'
                alt='X'
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '10px',
                  cursor: 'pointer',
                }}
                onClick={handleCloseWindow}
              />
            </div>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                gap: '8px',
                backgroundColor: 'white',
                padding: '8px 4px',
              }}
            >
              <img
                src='http://tpc.googlesyndication.com/simgad/5843493769827749134'
                alt='图片'
              />
              <div>
                <div>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里</div>
                <div>电话：010-64733333</div>
                <a
                  href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'
                  style={{ textDecoration: 'underline' }}
                >
                  详细信息
                </a>
              </div>
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

export default CoversInfoWindowsCustomStyleWindow
