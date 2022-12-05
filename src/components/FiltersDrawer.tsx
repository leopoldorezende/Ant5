import { Drawer, Button, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface Props {
  title: string;
  open:any;
  setOpen:any;
  children:JSX.Element;
}

export default function FiltersDrawer (props:Props) {  
  return (
    <Drawer
      title={props.title}
      placement="right" 
      width={280}
      closable={false}
      open={props.open}
      onClose={() => props.setOpen(false)}
      className='filter-drawer'
      extra={
        <Button onClick={() => {props.setOpen(false)}} className='close-drawer-button'>
            <CloseOutlined />
        </Button>
      }
    >
      <Space direction={'vertical'} size={'middle'}>
        {props.children}
      </Space>
    </Drawer>
  )
}