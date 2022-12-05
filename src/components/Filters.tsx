import React from 'react'
import FiltersField from './FiltersField'
import FiltersInitial from './FiltersInitial'
import { Space } from 'antd'
import { StoreContext } from '../store'

interface Props {
  position: ('header' | 'drawer');
  dataFilters: {id: string, filters: any[]};
}

const initialValidation:string[] = []

export default function Filters(props:Props) { 

  const { store, setStore } = React.useContext(StoreContext)
  const [ enterButtonDisabled, setEnterButtonDisabled ] = React.useState(true)
  const filtersID = props.dataFilters.id
  const filters = props.dataFilters.filters

  // Reading all filters
  React.useEffect(() => {
    if(!store[filtersID]) {

      // Prepare value and send to applyFilter
      filters.forEach(el => {

        let isConditionTrue = () => {
          let anchor = el.conditional ? filters.filter(o => o.name == el.conditional.anchor)[0] : null
          return anchor ? conditionalMode(el, anchor.items[anchor.defaultItemIndex ?? 0].value) : true
        }

        let prepareNullValue = () => {
          let isRange:boolean = el.type == 'date' && el.items[0].value.length == 2
          return {value: isRange ? [null, null] : null, label: null}
        }
        
        let value = !el.initial && isConditionTrue() ? prepareValue(el) : prepareNullValue()
        applyFilter(el.name, value)
      })
    }
  }, []);

  function conditionalMode(el:any, value:any) {
    let condValue = el.conditional.value
    return el.conditionalNegative ? condValue != value : condValue == value
  }

  function prepareValue(el:any) {
    if(el.type == 'date')
      return {value: el.items[0].value, label: el.items[0].value.toString().replace(',', ' - ')}
    else
      return el.items[el.defaultItemIndex ?? 0]
  }
  
  function applyFilter(name:string, value?:any) {
    setStore({
      type: 'FILTERS', 
      value: { page: filtersID, filterName: name, filterObj: value},
    })
  }

  function handler(el:any, received:any) {

    // Validation for initial filters in modal
    const i = initialValidation.indexOf(el.name)
    if(i > -1) initialValidation.splice(i, 1)
    if(initialValidation.length == 0) setEnterButtonDisabled(false)

    // Prepare value to send to applyFilter
    const send = (() => {
      switch(el.type) {
        case 'date':
          el.items[0].value = received
          return {value: received, label: received.toString().replace(',', ' - ')}
        case 'tree':
          return {value: received.value, label: received.label}
        default:
          el.defaultItemIndex = el.items.findIndex((o:any) => o.value === received);
          return el.items[el.defaultItemIndex];
      }
     })()

    // Mount and unmount conditional filter anchored in 'el'
    filters.forEach(obj => {
      if(obj.conditional && obj.conditional.anchor == el.name) {
        let value = conditionalMode(obj, send.value) ? prepareValue(obj) : {value: null, label: null}
        applyFilter(obj.name, value)
      }
    });

    applyFilter(el.name, send)
  }

  function createFilters(position:string) {
    const components:Array<any> = [];
    const initialComponents:Array<any> = [];

    filters.forEach((el, i) => {

      // Checking conditionals
      let isVisible = el.conditional && store[filtersID] ?
        conditionalMode(el, store[filtersID].filter(
          (o: {filterName: string}) => o.filterName === el.conditional.anchor
        )[0].filterObj.value) : true

      const filterFieldComponent = isVisible ? (
        <FiltersField 
          filtersID={filtersID} 
          element={el} 
          handler={handler} 
          key={el.name+i} 
        />
      ) : null
      
      // Define filter position
      if(el.position == position) {
        components.push(filterFieldComponent);
      }
      if(position == 'header' && el.initial == true) {
        initialComponents.push(filterFieldComponent);

        React.useEffect(() => {
          if(initialValidation.indexOf(el.name) < 0) initialValidation.push(el.name)
        }, []);
      }
    })
    
    // Build filter modal 
    const modalInitial = (position == 'header' && initialComponents.length) ? 
    (
      <FiltersInitial 
        title='Escolha as opções de visualização:'
        filtersID={filtersID}
        enterButtonDisabled={enterButtonDisabled}
        initialComponents={initialComponents}
      />
    ) : null;

    // Build filters
    return (
      <Space wrap={true} size='middle'>
        {modalInitial}
        {components}
      </Space>
    );
  }
  
  return createFilters(props.position)
}