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
                name="NewsType"
                onFinish={onSearch}
                autoComplete="off"
            >
                <div className='search_form_container'>
                    <Form.Item label="テレビコード" name="tvCode">
                        <AppInput placeholder="テレビコードを入力してください" />
                    </Form.Item>
                    <Form.Item label="テレビ名" name="tvName">
                        <AppInput placeholder="テレビ名を入力してください" />
                    </Form.Item>

                </div>

            </Form>
        </div>
    )
}

export default TVSearch