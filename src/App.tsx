import React from 'react'
import { Drawer, Layout } from 'antd'
import { AppRoutes } from "./Routes"
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { StoreContext, storeReducer, storeInitialValues } from './store'
import { themes } from './Themes';
import SideBar from './components/SideBar'
import ptBR from 'antd/locale/pt_BR' 
import './assets/css/app.css'

const App: React.FC = () => {
  
  const [ store, setStore ] = React.useReducer(storeReducer, storeInitialValues);
  const changeTheme:string = window.localStorage.getItem('theme') ?? 'light'

  React.useEffect(() => {

    document.body.setAttribute('data-theme', changeTheme );
    setStore({type: 'SWITCH_THEME', value: changeTheme })
    
    function setResponsiveSize() {
      let w = window.innerWidth;
      let deviceType:string = w < 768 ? 'mobile' : w < 992 ? 'tablet' : 'desktop'

      setStore({type: 'RESPONSIVE_SIZE', value: deviceType})
    }
    window.addEventListener('resize', setResponsiveSize);
    setResponsiveSize();
  }, []);

  return (
    <ConfigProvider locale={ptBR} theme={themes(store.theme)}>
      <StoreContext.Provider value={{ store, setStore }}>
        <Router>
          <Layout>
            {
              store.responsiveSize == 'mobile' 
              ? 
                <Drawer
                  width={240}
                  closable={false}
                  onClose={() => setStore({type: 'COLLAPSE_SIDEBAR_MOBILE'})}
                  open={!store.sidebarCollapsedMobile}
                  placement="left"
                >
                  <SideBar />
                </Drawer>
              :
                <Layout.Sider 
                  collapsible 
                  collapsed={store.sidebarCollapsed}
                  width={240}
                  collapsedWidth={72}
                  trigger={null}
                  style={{overflow: 'hidden'}}
                >
                  <SideBar />
                </Layout.Sider>
            }
            <Layout className="site-layout">
              <AppRoutes />
            </Layout>
          </Layout>
        </Router>
      </StoreContext.Provider>
    </ConfigProvider>
  );
}

export default App