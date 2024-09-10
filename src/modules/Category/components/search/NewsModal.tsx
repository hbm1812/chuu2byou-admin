import { Form, FormInstance } from 'antd';
import React from 'react'
import AppInput from '../../../../components/common/AppInput';
import AppSelected from '../../../../components/common/AppSelected';
import { ISearchNews } from '../../interfaces/TypeNews';
import AppDatePicker from '../../../../components/common/AppDatePicker';

type Props = {
    form: FormInstance<ISearchNews>;

    onSearch: (values: ISearchNews) => Promise<void>;
}

const SearchNews: React.FC<Props> = ({
    form,

    onSearch,
}) => {


    return (
        <div className='search_News'>
            <Form
                form={form}
                layout="vertical"
                name="News"
                onFinish={onSearch}
                autoComplete="off"
            >
                <div className='search_form_container'>
                    <Form.Item label="タイトル" name="title">
                        <AppInput placeholder="タイトルを入力してください" />
                    </Form.Item>

                    <Form.Item label="ニュースタイプ" name="type_number">
                        <AppSelected
                        options={[
                            { value: "", label: 'Tất cả' },
                            { value: 1, label: 'Nhập khẩu' },
                            { value: 2, label: 'Trong nước' }
                        ]}
                        defaultValue={'全て'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="アップロード日"
                        name="date"
                    >
                        <AppDatePicker />
                    </Form.Item>

                  
                </div>

            </Form>
        </div>
    )
}

export default SearchNews
