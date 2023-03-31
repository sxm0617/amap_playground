import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversMarkerTrackReplay: FC = () => {
  const trackPoints = [
    [116.478935, 39.997761],
    [116.478939, 39.997825],
    [116.478912, 39.998549],
    [116.478912, 39.998549],
    [116.478998, 39.998555],
    [116.478998, 39.998555],
    [116.479282, 39.99856],
    [116.479658, 39.998528],
    [116.480151, 39.998453],
    [116.480784, 39.998302],
    [116.480784, 39.998302],
    [116.481149, 39.998184],
    [116.481573, 39.997997],
    [116.481863, 39.997846],
    [116.482072, 39.997718],
    [116.482362, 39.997718],
    [116.483633, 39.998935],
    [116.48367, 39.998968],
    [116.484648, 39.999861],
  ]

  const [carMarker, setCarMarker] = useState<any>()
  const [isPause, setIsPause] = useState(false)

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.MoveAnimation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
        })
        const carMarker = new AMap.Marker({
          map: map,
          position: [116.478935, 39.997761],
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
          offset: new AMap.Pixel(-13, -26),
        })
        const roadLine = new AMap.Polyline({
          path: trackPoints,
          showDir: true,
          strokeColor: '#28F', //线颜色
          strokeWeight: 6, //线宽
        })
        const trackLine = new AMap.Polyline({
          strokeColor: '#AF5', //线颜色
          strokeWeight: 6, //线宽
        })
        carMarker.on('moving', (e: any) => {
          trackLine.setPath(e.passedPath)
          map.setCenter(e.target.getPosition(), true)
        })
        map.add(roadLine)
        map.add(trackLine)
        map.setFitView()

        setCarMarker(carMarker)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handlePlay = () => {
    if (isPause) {
      carMarker.resumeMove()
      setIsPause(false)
      return
    }

    carMarker.moveAlong(trackPoints, {
      // 每一段的时长
      duration: 1000, //可根据实际采集时间间隔设置
      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      autoRotation: true,
    })
  }

  const handlePause = () => {
    setIsPause(true)
    carMarker.pauseMove()
  }

  const handleTerminate = () => {
    setIsPause(false)
    carMarker.stopMove()
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button type='primary' onClick={handlePlay}>
            {isPause ? '继续动画' : '开始动画'}
          </Button>
          <Button type='primary' onClick={handlePause}>
            暂停动画
          </Button>
          <Button type='primary' onClick={handleTerminate}>
            终止动画
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CoversMarkerTrackReplay
