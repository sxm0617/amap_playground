import AMapLoader from '@amap/amap-jsapi-loader'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversMassMarkersClusterWeight: FC = () => {
  const gridSize = 60

  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [points, setPoints] = useState<any>([])

  useEffect(() => {
    fetch('./points_weight.json')
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
          mapStyle: 'amap://styles/grey',
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

    new AMap.MarkerCluster(map, points, {
      gridSize,
      renderMarker,
      renderClusterMarker,
    })
    map.setFitView()
  }, [points, map, AMap])

  const renderMarker = (context: any) => {
    const content =
      '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;" />'
    const offset = new AMap.Pixel(-9, -9)
    context.marker.setContent(content)
    context.marker.setOffset(offset)
  }

  const renderClusterMarker = (context: any) => {
    const clusterCount = context.count

    let bgColor = ''
    if (clusterCount >= 0 && clusterCount < 10) {
      bgColor = '204,235,197'
    } else if (clusterCount >= 10 && clusterCount < 100) {
      bgColor = '168,221,181'
    } else if (clusterCount >= 100 && clusterCount < 1000) {
      bgColor = '123,204,196'
    } else if (clusterCount >= 1000 && clusterCount < 10000) {
      bgColor = '78,179,211'
    } else if (clusterCount >= 10000) {
      bgColor = '43,140,190'
    }

    const div = document.createElement('div')
    div.style.backgroundColor = 'rgba(' + bgColor + ',.5)'

    const size = Math.round(
      25 + Math.pow(clusterCount / points.length, 1 / 5) * 40,
    )
    div.style.width = div.style.height = size + 'px'
    div.style.border = 'solid 1px rgba(' + bgColor + ',1)'
    div.style.borderRadius = size / 2 + 'px'
    div.innerHTML = context.count
    div.style.lineHeight = size + 'px'
    div.style.color = '#ffffff'
    div.style.fontSize = '12px'
    div.style.textAlign = 'center'

    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
    context.marker.setContent(div)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
    </div>
  )
}

export default CoversMassMarkersClusterWeight
