import AMapLoader from '@amap/amap-jsapi-loader'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversMassMarkersClusterIndex: FC = () => {
  const gridSize = 60
  const clusterIndexSet = {
    city: {
      minZoom: 2,
      maxZoom: 10,
    },
    district: {
      minZoom: 10,
      maxZoom: 12,
    },
    area: {
      minZoom: 12,
      maxZoom: 15,
    },
    community: {
      minZoom: 15,
      maxZoom: 22,
    },
  }

  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [points, setPoints] = useState<any>([])
  const [districts, setDistricts] = useState<any>()

  useEffect(() => {
    fetch('./points_index.json')
      .then((response: any) => {
        return response.json()
      })
      .then((data: any) => {
        const { points, districts } = data
        setPoints(points)
        setDistricts(districts)
      })

    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.IndexCluster'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.405285, 39.904989],
          mapStyle: 'amap://styles/grey',
          zoom: 10,
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

    new AMap.IndexCluster(map, points, {
      gridSize,
      clusterIndexSet,
      renderClusterMarker,
    })
    map.setFitView()
  }, [points, map, AMap])

  const renderClusterMarker = (context: any) => {
    const marker = context.marker // 聚合点标记对象
    const styleObj = getStyle(context)
    // 自定义点标记样式
    const div = document.createElement('div')
    div.className = 'amap-cluster'
    div.style.backgroundColor = styleObj.bgColor
    div.style.width = styleObj.size + 'px'
    if (styleObj.index <= 2) {
      div.style.height = styleObj.size + 'px'
      // 自定义点击事件
      marker.on('click', function (e: any) {
        console.log(e)
        let curZoom = map.getZoom()
        if (curZoom < 20) {
          curZoom += 1
        }
        map.setZoomAndCenter(curZoom, e.lnglat)
      })
    }
    div.style.border = 'solid 1px ' + styleObj.borderColor
    div.style.borderRadius = styleObj.size + 'px'
    div.innerHTML = styleObj.text
    div.style.color = styleObj.color
    div.style.textAlign = styleObj.textAlign
    div.style.boxShadow = styleObj.boxShadow
    marker.setContent(div)
    // 自定义聚合点标记显示位置
    const position = getPosition(context)
    if (position) {
      marker.setPosition(position)
    }
    marker.setAnchor('center')
  }

  function getStyle(context: any) {
    const clusterData = context.clusterData // 聚合中包含数据
    const index = context.index // 聚合的条件
    const count = context.count // 聚合中点的总数
    const color = ['8,60,156', '66,130,198', '107,174,214', '78,200,211']
    const indexes = ['city', 'district', 'area', 'community']
    const i = indexes.indexOf(index['mainKey'])
    let text = ''
    let size = Math.round(30 + Math.pow(count / points.length, 1 / 5) * 70)
    if (i <= 2) {
      text = `
        <div style='height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style='width: 80%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>
            ${clusterData[0][index['mainKey']]}
          </div>
          <div style='width: 80%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>
            ${context.count}套
          </div>
        </div>
      `
    } else {
      size = 12 * text.length + 20
    }
    const style = {
      bgColor: 'rgba(' + color[i] + ',.8)',
      borderColor: 'rgba(' + color[i] + ',1)',
      text: text,
      size: size,
      index: i,
      color: '#ffffff',
      textAlign: 'center',
      boxShadow: '0px 0px 5px rgba(0,0,0,0.8)',
    }
    return style
  }

  function getPosition(context: any) {
    const key = context.index.mainKey
    const dataItem = context.clusterData && context.clusterData[0]
    const districtName = dataItem[key]
    if (!districts?.[districtName]) {
      return null
    }

    const center = districts[districtName].center.split(',')
    const centerLnglat = new AMap.LngLat(center[0], center[1])
    return centerLnglat
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
    </div>
  )
}

export default CoversMassMarkersClusterIndex
