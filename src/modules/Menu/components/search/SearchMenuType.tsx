import React from 'react'
import { ISearchMenuType } from '../../interfaces/typeMenuType';
import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';

type Props = {
  form: FormInstance<ISearchMenuType>;
  onSearch: (values: ISearchMenuType) => Promise<void>;
}

const SearchMenuType: React.FC<Props> = ({
  form,
  onSearch,
}) => {
  return (
    <div className='search_News'>
      <Form
        form={form}
        layout="vertical"
        name="MenuType"
        onFinish={onSearch}
        autoComplete="off"
      >
        <div className='search_form_container'>
          <Form.Item label="Code" name="menuTypeCode">
            <AppInput placeholder="Please enter code" />
          </Form.Item>
          <Form.Item label="News type name" name="menuTypeName">
            <AppInput placeholder="Please enter menu type name" />
          </Form.Item>

        </div>

      </Form>
    </div>
  )
}

export default SearchMenuType