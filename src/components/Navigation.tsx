import React from 'react'
import { Menu as AntMenu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { itemsMenu } from '../Menu'
import type { MenuProps} from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

var i = 0;
var selected:string = '';
var selectedOpen:string[] = [];

const rootSubmenuKeys:string[] = [];
const items = menuFactory(itemsMenu);

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

function menuFactory(items:any) {
  return items.map(
    (o:{link: string, text: string, icon:JSX.Element,i: number,children: []}) => { 
      i++
      o.i = i
      if(o.children && o.children.length) rootSubmenuKeys.push(i.toString())
      return getItem(
        o.link && o.link !== '' && !o.children ? <Link style={{color: 'none!important'}} to={o.link}>{o.text}</Link> : o.text, 
        i.toString(), 
        o.icon ? o.icon : null, 
        o.children && o.children.length ? menuFactory(o.children) : null
      );
    }
  );
}

function menuSelected(items:any, parent?:string) {
  items.forEach(
  (n:{
    link: string, 
    i: number,
    children: []
  }) => {
    if(n.link && n.link.toUpperCase() === useLocation().pathname.toUpperCase()) {
      selected = n.i.toString()
      selectedOpen = parent ? [parent] : []
    }
    if(n.children && n.children.length) menuSelected(n.children, n.i.toString())
  })
  return selected
} 

export default function Navigation () {  

  const [openKeys, setOpenKeys] = React.useState(['']);
  const selectedItem = menuSelected(itemsMenu);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  if(openKeys[0] == '') {
    setOpenKeys(selectedOpen)
  } 
  
  return (
    <AntMenu 
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[selectedItem]}
    />
  )
}