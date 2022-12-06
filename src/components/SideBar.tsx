import React from 'react'
import { Space, Avatar, Badge, Typography, Switch } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { StoreContext } from '../store'
import { profile } from '../Menu'
import Navigation from './Navigation'

export default function SideBar () {  

  const { store, setStore } = React.useContext(StoreContext);
  const collpased:boolean = store.sidebarCollapsed && store.responsiveSize != 'mobile';
  const changeTheme:string = store.theme == 'light' ? 'dark' : 'light'

  return (
    <div className="sidebar-content sidebar-content-theme">
      <div className='sidebar-content-scroll'>
        <Space 
          direction='vertical'
          style={{
            width: collpased ? 71 : 239, 
            transition: collpased ? 'all .2s ease' : 'all .2s ease-in'
          }}
        >
          <div className='sidebar-content-user'>
            <Badge 
              count={5} 
              offset={[-2, 10]} 
              size={collpased ? 'small' : 'default'}
            >
              <Avatar 
                size={collpased ? 40 : 60} 
                icon={<UserOutlined />}  
                src={profile.avatar}
              />
            </Badge>
          </div>

          <Typography.Paragraph className='sidebar-profile'>
            {collpased ? profile.nameInitials : profile.name}
            <p>{collpased ? '-' : profile.sector}</p>
          </Typography.Paragraph> 
            
          <div className='darkmode-switch'>
            <Switch 
              size={'small'} 
              checked={store.theme == 'light' ? false : true} 
              onChange={() => {
                window.localStorage.setItem('theme', changeTheme);
                document.body.setAttribute('data-theme', changeTheme);
                setStore({type: 'SWITCH_THEME', value: changeTheme});
              }}
            /> &nbsp; 
            {collpased ? <div>Noite</div> : 'Modo noite'}
          </div>

          <Navigation />
          
        </Space>
      </div>
      <div className='sidebar-content-footer'>
        <span className={'logo-'+store.theme}></span>
      </div>
    </div>
  )
}