import { DatePicker, Space,Select } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export default function FiltersHeader () {  

  return (
    <Space wrap={true} size='middle'>

      <DatePicker key="f1" defaultValue={dayjs()} format={dateFormatList} />

      <DatePicker.RangePicker key="f2" defaultValue={[dayjs(), dayjs().add(9, 'day')]} format={dateFormatList} />

      <Select key="f3"  defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Option value="disabled" key={101} disabled>Vista</Option>
        <Option value="jack" key={102}>Mercado</Option>
        <Option value="lucy" key={103}>Linha de Produto</Option>
      </Select>
      
    </Space>
  )
}