import { Menu as AntMenu, MenuProps } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface MenuItem {
  key: React.Key
  label: string
  children?: MenuItem[]
  onTitleClick?: Function
}

const Menu: FC<MenuProps> = () => {
  const navigation: MenuItem[] = [
    {
      key: 'basic',
      label: '地图',
      children: [
        {
          key: 'life-cycle',
          label: '生命周期',
          children: [
            {
              key: 'create',
              label: '创建',
            },
            {
              key: 'loaded',
              label: '加载完成',
            },
            {
              key: 'destroy',
              label: '销毁',
            },
            {
              key: 'loading-async',
              label: '异步加载',
            },
          ],
        },
        {
          key: 'map-property',
          label: '地图属性',
          children: [
            {
              key: 'center',
              label: '获取地图中心点',
            },
            {
              key: 'range',
              label: '地图显示范围',
            },
            {
              key: 'move',
              label: '地图平移',
            },
            {
              key: 'action-control',
              label: '交互控制',
            },
            {
              key: 'get-lng-lat-by-click',
              label: '点击获取经纬度',
            },
            {
              key: 'hot-spot-info',
              label: '热点信息',
            },
            {
              key: 'cursor-style',
              label: '鼠标样式',
            },
          ],
        },
        {
          key: 'map-component',
          label: '覆盖物与图层管理',
          children: [
            {
              key: 'cover',
              label: '覆盖物的添加与移除',
            },
            {
              key: 'layer',
              label: '图层的添加与移除',
            },
            {
              key: 'function-control',
              label: '地图控件',
            },
          ],
        },
      ],
    },
    {
      key: 'events',
      label: '事件系统',
      children: [
        {
          key: 'map-event',
          label: '地图事件',
          children: [
            {
              key: 'map-load',
              label: '加载',
            },
            {
              key: 'map-move',
              label: '移动',
            },
            {
              key: 'map-zoom',
              label: '缩放',
            },
            {
              key: 'mouse-related',
              label: '鼠标相关',
            },
            {
              key: 'map-drag',
              label: '拖拽',
            },
          ],
        },
        {
          key: 'cover-event',
          label: '覆盖物事件',
          children: [
            {
              key: 'cover-click',
              label: '覆盖物点击和鼠标事件',
            },
            {
              key: 'cover-drag',
              label: '覆盖物拖拽事件',
            },
            {
              key: 'info-window',
              label: '信息窗体事件',
            },
          ],
        },
        {
          key: 'other-event',
          label: '其他事件',
          children: [
            {
              key: 'dom',
              label: 'DOM事件',
            },
            {
              key: 'custom',
              label: '自定义事件',
            },
          ],
        },
      ],
    },
    {
      key: 'layers',
      label: '图层',
      children: [
        {
          key: 'self-data',
          label: '自有数据图层',
          children: [
            {
              key: 'heat-map',
              label: '热力图',
            },
          ],
        },
      ],
    },
    {
      key: 'covers',
      label: '覆盖物',
      children: [
        {
          key: 'marker',
          label: '点标记',
          children: [
            {
              key: 'track-replay',
              label: '轨迹回放',
            },
          ],
        },
        {
          key: 'mass-markers',
          label: '海量点标记',
          children: [
            {
              key: 'cluster',
              label: '点聚合',
            },
            {
              key: 'cluster-weight',
              label: '按权重聚合',
            },
            {
              key: 'cluster-index',
              label: '按索引聚合',
            },
          ],
        },
        {
          key: 'overlayers',
          label: '矢量图形',
          children: [
            {
              key: 'polyline-draw-edit',
              label: '折线的绘制和编辑',
            },
            {
              key: 'curve-draw-edit',
              label: '曲线的绘制和编辑',
            },
            {
              key: 'polygon-draw-edit',
              label: '多边形的绘制和编辑',
            },
            {
              key: 'rectangle-draw-edit',
              label: '矩形的绘制和编辑',
            },
            {
              key: 'circle-draw-edit',
              label: '圆的绘制和编辑',
            },
            {
              key: 'ellipse-draw-edit',
              label: '椭圆的绘制和编辑',
            },
            {
              key: 'custom-draw',
              label: '自定义绘制',
            },
            {
              key: 'batch-update',
              label: '批处理矢量图形',
            },
            {
              key: 'polyline-arrow',
              label: '折线方向箭头',
            },
          ],
        },
        {
          key: 'info-windows',
          label: '信息窗体',
          children: [
            {
              key: 'default-style-window',
              label: '默认样式窗体',
            },
            {
              key: 'custom-style-window',
              label: '自定义样式窗体',
            },
            {
              key: 'info-window-events',
              label: '信息窗体事件',
            },
            {
              key: 'batch-add-window',
              label: '批量添加窗体',
            },
          ],
        },
      ],
    },
    {
      key: 'geometrics',
      label: '几何计算',
      children: [
        {
          key: 'relations',
          label: '关系判断',
          children: [
            {
              key: 'point-in-polygon',
              label: '点在多边形中',
            },
          ],
        },
      ],
    },
  ]

  const location = useLocation()
  const navigate = useNavigate()

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [openItems, setOpenItems] = useState<string[]>([])
  const openItemsRef = useRef<string[]>([])

  useEffect(() => {
    const items = navigation.map((lvl1) => getItemRecursive(lvl1))
    setMenuItems(items)
  }, [])

  useEffect(() => {
    const selectedItems = location.pathname.split('/')
    selectedItems.shift()
    setSelectedItems(selectedItems)
    setOpenItems(selectedItems.slice(0, -1))
    openItemsRef.current = selectedItems.slice(0, -1)
  }, [location])

  const getItemRecursive = (item: MenuItem) => {
    const menuItem: MenuItem = { label: item.label, key: item.key }
    if (item.children) {
      menuItem.onTitleClick = (e: any) => {
        const currentOpenItems = openItemsRef.current
        const index = currentOpenItems.findIndex(
          (openItem) => openItem === e.key,
        )

        if (index > -1) {
          setOpenItems(currentOpenItems.slice(0, index))
          openItemsRef.current = [...currentOpenItems.slice(0, index)]

          return
        }

        const newOpenItems = getKeyPath(e.key, navigation) || []
        setOpenItems(newOpenItems)
        openItemsRef.current = newOpenItems
      }
      menuItem.children = item.children.map((child) => {
        return getItemRecursive(child)
      })
    }

    return menuItem
  }

  const getKeyPath = (key: string, menu?: MenuItem[]): string[] | undefined => {
    if (!menu) {
      return
    }

    for (let i = 0; i < menu.length; i++) {
      if (menu[i].key === key) {
        return [key]
      }

      const subPath = getKeyPath(key, menu[i].children)
      if (subPath) {
        return [menu[i].key.toString(), ...subPath]
      }
    }
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.keyPath.reverse().join('/'))
  }

  return (
    <AntMenu
      style={{ width: '300px' }}
      mode='inline'
      items={menuItems}
      selectedKeys={selectedItems}
      openKeys={openItems}
      onClick={onClick}
    />
  )
}

export default Menu
