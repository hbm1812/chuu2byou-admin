import React from 'react'
import { ISearchTV } from '../../interfaces/TypeTV';
import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';

type Props = {
    form: FormInstance<ISearchTV>;
    onSearch: (values: ISearchTV) => Promise<void>;
}

const TVSearch: React.FC<Props> = ({ 
    form,

    onSearch,
}) => {
    return (
        <div className='search_News'>
            <Form
                form={form}
                layout="vertical"
                name="TV"
                onFinish={onSearch}
                autoComplete="off"
            >
                <div className='search_form_container'>
                    <Form.Item label="Code" name="tvCode">
                        <AppInput placeholder="Please enter code" />
                    </Form.Item>
                    <Form.Item label="TV name" name="tvName">
                        <AppInput placeholder="Please enter TV name" />
                    </Form.Item>

                </div>

            </Form>
        </div>
    )
}

export default TVSearch