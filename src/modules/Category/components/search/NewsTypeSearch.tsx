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
                    <Form.Item label="コード" name="typeCode">
                        <AppInput placeholder="コードを入力してください" />
                    </Form.Item>
                    <Form.Item label="ニュースタイプ" name="typeNameJP">
                        <AppInput placeholder="ニュースタイプを入力してください" />
                    </Form.Item>

                </div>

            </Form>
        </div>
    )
}

export default SearchNewsType
