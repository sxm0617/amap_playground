import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversMassMarkersCluster: FC = () => {
  const gridSize = 60

  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [points, setPoints] = useState<any>([])
  const [cluster, setCluster] = useState<any>()

  useEffect(() => {
    fetch('./points.json')
      .then((response: any) => {
        return response.json()
      })
      .then((points: any) => {
        setPoints(points)
      })

    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.MarkerCluster'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [104.937478, 35.439575],
          zoom: 5,
        })
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    if (!points || !map || !AMap) {
      return
    }

    const cluster = new AMap.MarkerCluster(map, points, {
      gridSize: gridSize,
    })
    map.setFitView()
    setCluster(cluster)
  }, [points, map, AMap])

  const handleDefault = () => {
    if (cluster) {
      cluster.setMap(null)
    }

    const clusterDefault = new AMap.MarkerCluster(map, points, {
      gridSize: gridSize,
    })
    setCluster(clusterDefault)
  }

  const handleCustom = () => {
    if (cluster) {
      cluster.setMap(null)
    }

    const styles = [
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
        size: new AMap.Size(32, 32),
        offset: new AMap.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
        size: new AMap.Size(32, 32),
        offset: new AMap.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
        size: new AMap.Size(36, 36),
        offset: new AMap.Pixel(-18, -18),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
        size: new AMap.Size(48, 48),
        offset: new AMap.Pixel(-24, -24),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
        size: new AMap.Size(48, 48),
        offset: new AMap.Pixel(-24, -24),
      },
    ]
    const clusterCustom = new AMap.MarkerCluster(map, points, {
      styles: styles,
      gridSize: gridSize,
    })
    setCluster(clusterCustom)
  }

  const handleCompleteCustom = () => {
    if (cluster) {
      cluster.setMap(null)
    }

    const clusterCompleteCustom = new AMap.MarkerCluster(map, points, {
      gridSize,
      renderMarker,
      renderClusterMarker,
    })
    setCluster(clusterCompleteCustom)
  }

  const renderMarker = (context: any) => {
    const content =
      '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;" />'
    const offset = new AMap.Pixel(-9, -9)
    context.marker.setContent(content)
    context.marker.setOffset(offset)
  }

  const renderClusterMarker = (context: any) => {
    const factor = Math.pow(context.count / points.length, 1 / 18)
    const div = document.createElement('div')
    const Hue = 180 - factor * 180
    const bgColor = 'hsla(' + Hue + ',100%,40%,0.7)'
    const fontColor = 'hsla(' + Hue + ',100%,90%,1)'
    const borderColor = 'hsla(' + Hue + ',100%,40%,1)'
    const shadowColor = 'hsla(' + Hue + ',100%,90%,1)'
    div.style.backgroundColor = bgColor
    const size = Math.round(
      30 + Math.pow(context.count / points.length, 1 / 5) * 20,
    )
    div.style.width = div.style.height = size + 'px'
    div.style.border = 'solid 1px ' + borderColor
    div.style.borderRadius = size / 2 + 'px'
    div.style.boxShadow = '0 0 5px ' + shadowColor
    div.innerHTML = context.count
    div.style.lineHeight = size + 'px'
    div.style.color = fontColor
    div.style.fontSize = '14px'
    div.style.textAlign = 'center'
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
    context.marker.setContent(div)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button type='primary' onClick={handleDefault}>
            默认样式
          </Button>
          <Button type='primary' onClick={handleCustom}>
            自定义样式
          </Button>
          <Button type='primary' onClick={handleCompleteCustom}>
            完全自定义
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CoversMassMarkersCluster
