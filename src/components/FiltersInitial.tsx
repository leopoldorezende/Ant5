import React from 'react'
import { Space, Button, Modal, Tooltip } from 'antd'
import { StoreContext } from '../store'

interface Props {
  title:string;
  filtersID:string;
  enterButtonDisabled:any;
  initialComponents:any;
}

export default function FiltersInitial(props:Props) { 

  const { store, setStore } = React.useContext(StoreContext);

  return (
    <Modal 
      title={props.title}
      className={'filter-modal'}
      open={store.keepCloseInitialFilter.indexOf(props.filtersID) < 0} 
      closable={true}
      onCancel={() => history.back()}
      footer={[
        <Tooltip 
          placement="top" 
          key="back" 
          title={props.enterButtonDisabled ? 'Selecione os filtros para entrar' : ''}
        >
          <Button 
            disabled={props.enterButtonDisabled}
            type='primary'
            onClick={() => setStore({
              type: 'KEEP_CLOSE_INITIAL_FILTER', 
              value: props.filtersID
            })}
          >
            Entrar
          </Button>
        </Tooltip>
      ]}
      >
      <Space direction={'vertical'} size={'middle'} style={{width: '50%'}}>
        {props.initialComponents}
      </Space>
    </Modal>
  )
}