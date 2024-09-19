import { Form, FormInstance } from 'antd';
import React from 'react'
import AppInput from '../../../../components/common/AppInput';
import { ISearchNewsType } from '../../interfaces/TypeNewsType';

type Props = {
    form: FormInstance<ISearchNewsType>;
    onSearch: (values: ISearchNewsType) => Promise<void>;
}

const SearchNewsType: React.FC<Props> = ({
    form,

    onSearch,
}) => {


    return (
        <div className='search_News'>
            <Form
                form={form}
                layout="vertical"
                name="NewsType"
                onFinish={onSearch}
                autoComplete="off"
            >
                <div className='search_form_container'>
                    <Form.Item label="Code" name="typeCode">
                        <AppInput placeholder="Please enter code" />
                    </Form.Item>
                    <Form.Item label="News type name" name="typeNameJP">
                        <AppInput placeholder="Please enter news type name" />
                    </Form.Item>

                </div>

            </Form>
        </div>
    )
}

export default SearchNewsType
