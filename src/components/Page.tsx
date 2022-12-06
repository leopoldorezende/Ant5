import React from 'react'
import { Space, Button, Layout, Breadcrumb } from 'antd'
import { PageHeader } from '@ant-design/pro-layout'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ImFilter } from 'react-icons/im'
import { StoreContext } from '../store'
import FiltersDrawer from './FiltersDrawer'

interface Props {
  title: string;
  drawerTitle?: string;
  filtersHeader?:(JSX.Element);
  filtersDrawer?:(JSX.Element);
  selectedFilters?:{filterName: string, filterObj: any}[] | [];
  children:JSX.Element;
}

export default function Page (props:Props) {  
  const [ openFilters, setOpenFilters ] = React.useState(false);
  const [ filtersHeight, setFiltersHeight ] = React.useState(0);
  const { store, setStore } = React.useContext(StoreContext);
  const isMobile = store.responsiveSize == 'mobile';


  const filtersList = props.selectedFilters && props.selectedFilters.length > 0 ? (
    <Space className='layout-content-page-filtered'>
      <ImFilter className='icon-filtered' />
      <Breadcrumb separator="·" style={{fontSize: '.7rem'}}>
        {
          props.selectedFilters.map((o, i) => {
            if(o.filterObj.label && !'todos todas total'.includes(o.filterObj.label.toLowerCase())) {
                return (
                  <Breadcrumb.Item key={'filterItem'+i} className={'itemFilter'+o.filterName}>
                    <span>{o.filterName}:</span> <b>{o.filterObj.label}</b>
                  </Breadcrumb.Item>
                )
              }
          })
        }
      </Breadcrumb>
    </Space>
  ) : '';

  React.useEffect(() => {
    const filtersHeightObserver = new ResizeObserver(entries => {
      entries.forEach(entry => setFiltersHeight(entry.contentRect.height - 40));
    });
    const pageHeader = document.querySelector('.ant-page-header');
    if(pageHeader) filtersHeightObserver.observe(pageHeader);
  }, []);

  return (
    <Layout>
      
      <Layout.Header className="layout-header" >
        <PageHeader
          title={props.title}
          className= 'layout-page-header'
          backIcon={
            store.sidebarCollapsed || isMobile ? 
            <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
          onBack={() => {
            document.body.classList.add('hide-submenus')
            setTimeout(() => {document.body.classList.remove('hide-submenus')}, 500)
            setStore(
              {type: isMobile ? 'COLLAPSE_SIDEBAR_MOBILE' : 'COLLAPSE_SIDEBAR'}
            )
          }}
          extra={[
            (!isMobile) ? <Space key={props.title}>{props.filtersHeader}</Space> : '',

            props.filtersDrawer || (isMobile && props.filtersHeader) ?
              <Button 
                className='more-filters-button'
                onClick={() => {setOpenFilters(true)}}
                key="moreFilters" >
                + <ImFilter />
              </Button>
              : ''
          ]}
        />
      </Layout.Header > 
        
      {
        props.filtersDrawer || (isMobile && props.filtersHeader) ?
          <FiltersDrawer 
            title={props.drawerTitle ?? 'Filtros'}
            open={openFilters} 
            setOpen={setOpenFilters}
          >
            <div>
              {isMobile && props.filtersHeader ? 
                <div className='filters-moved'>{props.filtersHeader}</div> : ''}
              {props.filtersDrawer}
            </div>
          </FiltersDrawer>
        : ''
      }

      <Layout.Content 
        className='layout-content-page' 
        style={{paddingTop: filtersHeight}}
      >
        {filtersList}
        {props.children}
      </Layout.Content>

    </Layout>
  )
}