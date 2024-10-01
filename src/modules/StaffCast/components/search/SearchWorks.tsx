import { Form, FormInstance } from 'antd';
import React from 'react'
import AppInput from '../../../../components/common/AppInput';
import { ISearchWorks } from '../../interfaces/TypeWorks';


type Props = {
    form: FormInstance<ISearchWorks>;
    onSearch: (values: ISearchWorks) => Promise<void>;
}

const SearchWorks: React.FC<Props> = ({
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
                    <Form.Item label="Code" name="workCode">
                        <AppInput />
                    </Form.Item>
                    <Form.Item label="Name" name="workName">
                        <AppInput />
                    </Form.Item>

                </div>

            </Form>
        </div>
    )
}

export default SearchWorks
