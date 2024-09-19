import { Form, FormInstance } from 'antd';
import React, { useEffect, useState } from 'react'
import AppInput from '../../../../components/common/AppInput';
import AppSelected from '../../../../components/common/AppSelected';
import { ISearchNews } from '../../interfaces/TypeNews';
import AppDatePicker from '../../../../components/common/AppDatePicker';
import { ISearchNewsType, ITable } from '../../interfaces/TypeNewsType';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../../redux/reducers/loadingReducer';
import { getAllNewsType } from '../../api/news.api';
import { showNotification } from '../../../../redux/reducers/notificationReducer';
import useRefresh from '../../../../hooks/useRefresh';

type Props = {
    form: FormInstance<ISearchNews>;

    onSearch: (values: ISearchNews) => Promise<void>;
}

const SearchNews: React.FC<Props> = ({
    form,

    onSearch,
}) => {
    const [dataNewsType, setDataNewsType] = useState<ITable[]>([]);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState<ISearchNewsType>({
        page: 0,
        size: 10,
    });
    const [refresh, refecth] = useRefresh();
    const getListNewsType = async () => {
        dispatch(startLoading());
        try {
            const response = await getAllNewsType();
            if (response.status) {
                setDataNewsType(response.result);

            }
        } catch (error) {
            dispatch(
                showNotification({
                    message: "Lấy dữ liệu thất bại!",
                    type: "error",
                })
            );
        } finally {
            dispatch(stopLoading());
        }
    };

    useEffect(() => {
        getListNewsType();
    }, [searchParams, refresh]);

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
                    <Form.Item label="Title" name="title">
                        <AppInput placeholder="Please enter title" />
                    </Form.Item>

                    <Form.Item label="News type" name="typeCode">
                    <AppSelected
                            options={dataNewsType.map((item) => ({
                                value: item.typeCode,
                                label: item.typeNameJP,
                            }))}
                            showSearch
                            placeholder="Select news type"
                            filterByLabel
                        />
                    </Form.Item>

                    <Form.Item
                        label="Upload date"
                        name="upLoadDate"
                    >
                        <AppDatePicker />
                    </Form.Item>

                  
                </div>

            </Form>
        </div>
    )
}

export default SearchNews
