import React from 'react'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import FiltersDrawer from './FiltersDrawer'
import { DatePicker, Select, Radio, Button, Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { StoreContext } from '../store'

dayjs.extend(customParseFormat);

interface Props {
  filtersID:string;
  element:any;
  handler:Function;
}

export default function FiltersField(props:Props) { 

  const { store } = React.useContext(StoreContext);
  const [ openFilterDetails, setOpenFilterDetails ] = React.useState(false);
  const filtersID = props.filtersID;
  const el = props.element;

  const currentValue = store[filtersID] ? store[filtersID].filter(
    (o: {filterName: string}) => o.filterName === el.name
  )[0].filterObj[el.type == 'tree' ? 'label' : 'value'] : ''

  function dateFormat(type:string) {
    switch (type) {
      case 'week' : return 'ww/YYYY'
      case 'month': return 'MM/YYYY'
      case 'year' : return 'YYYY'
      default     : return 'DD/MM/YYYY'
    }
  }

  function prepareDate(dateLabel:any, dateValue:any) {
    if(!dateValue) return null

    if (dateLabel == 'week') {
        let week:any = dayjs(dateValue.split('/')[1])
        dateValue = week.week(dateValue.split('/')[0]).format('DD/MM/YYYY')
        dateLabel = 'day'
    }
    return dayjs(dateValue, dateFormat(dateLabel))
  }

  switch (el.type) {

    case 'date': 
      let label = el.items[0].label;
      return (
        <div key={el.name}>
          <h5>{el.name}</h5>
          { 
            (currentValue === '' || currentValue.length > 2)
            ?
            <DatePicker 
              key={el.name} allowClear={false} format={dateFormat(label)} 
              picker={label == 'day' ? 'date' : label}
              value={prepareDate(label, currentValue)}
              onChange={(value:any) => props.handler(el, 
                dayjs(value).format(dateFormat(label))
              )} 
            /> 
            : 
            <DatePicker.RangePicker 
              key={el.name} allowClear={false} format={dateFormat(label)} 
              picker={label == 'day' ? 'date' : label}
              value={[prepareDate(label, currentValue[0]), prepareDate(label, currentValue[1])]}
              onChange={(value:any) => props.handler(el, [
                dayjs(value[0]).format(dateFormat(label)), 
                dayjs(value[1]).format(dateFormat(label))
              ])} 
            /> 
          }
        </div>
      )

    case 'select': 
      var width:number = 0;
      var selectOptions:any = el.items.map((item:any, i: string) => {
        width = item.label.length > width ? item.label.length : width

        return (
          <Select.Option value={item.value} key={'vista'+i}>
            {item.label}
          </Select.Option>
        )
      })

      return (
        <div key={el.name}>
          <h5>{el.name}</h5>
          
          <Select 
            style={{width: (width * 10 > 200) ? 200 : width * 10}}
            key={el.name}
            value={currentValue}
            onChange={value => props.handler(el, value)} 
          >
            {selectOptions}
          </Select>
        </div>
      )

    case 'radio': 
      return (
        <div key={el.name}>
          <h5>{el.name}</h5>
          
          <Radio.Group 
            key={el.name}
            optionType="button"
            options={el.items} 
            value={currentValue} 
            onChange={value => props.handler(el, value.target.value)} 
          />
        </div>
      )

    case 'tree':
      return (
        <div key={el.name}>
          <h5>{el.name}: {currentValue}</h5>

          <Button type="primary" onClick={() => setOpenFilterDetails(true)}>
            Filtrar {el.name}
          </Button>
          
          <FiltersDrawer 
            title={el.name}
            open={openFilterDetails} 
            setOpen={setOpenFilterDetails}
          >
            <Tree
              showLine
              selectable
              onSelect={(v: React.Key[], value: any) => props.handler(el, value.node)} 
              treeData={el.items}
              defaultExpandedKeys={[el.items[0].value]}
              defaultSelectedKeys={[el.items[0].value]}
              switcherIcon={<DownOutlined />}
              fieldNames={{ title: 'label', key: 'value', children: 'children' }}
            />
          </FiltersDrawer>
        </div>
      )

    default:
      return null
  }
}