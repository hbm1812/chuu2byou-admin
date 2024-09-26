import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import useRefresh from '../../../../hooks/useRefresh';
import { ISearchNewsType, ITable } from '../../interfaces/TypeNewsType';
import { ColumnsType } from 'antd/es/table';
import { Form, FormInstance, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { startLoading, stopLoading } from '../../../../redux/reducers/loadingReducer';
import { showNotification } from '../../../../redux/reducers/notificationReducer';
import { getListNewsType } from '../../api/news.api';
import AppInput from '../../../../components/common/AppInput';
import AppButton from '../../../../components/common/AppButton';
import AppTable from '../../../../components/common/AppTable';

type Props = {
    formListNewsType: FormInstance<ISearchNewsType>;
    newsType: { id: string; name: string; } | null;
    setNewsType: Dispatch<SetStateAction<{ id: string; name: string; } | null>>;
    typeSearch?: string;
}

const MListNewsType: React.FC<Props> = ({ typeSearch, setNewsType, newsType, formListNewsType }) => {
    const dispatch = useDispatch();
    const [refresh, refecth] = useRefresh();
    const [dataTable, setDataTable] = useState<ITable[] | []>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [searchParams, setSearchParams] = useState<ISearchNewsType>({
        page: 0,
        size: 10,
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });


    const columnTable: ColumnsType<ITable> = [
        { title: "#", dataIndex: "index", key: "index", },
        {
            title: "typeNameJP",
            dataIndex: "typeNameJP",
            key: "typeNameJP",
            render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,

        },
        {
            title: "typeCode",
            dataIndex: "typeCode",
            key: "typeCode",

        },
       

    ];

    const onSearch = async (values: ISearchNewsType) => {
        setSearchParams({
            ...searchParams,
            typeNameJP: values.typeNameJP && values.typeNameJP !== "" ? values.typeNameJP : undefined,
            typeCode: values.typeCode && values.typeCode !== "" ? values.typeCode : undefined,
            page: 0,
            size: 10,

        });
        setPagination({
            current: 1,
            pageSize: 10,
            total: 0,
        }
        );
        refecth();
    };

    const getList = async () => {

        const payload = {
            ...searchParams,
        };
        dispatch(startLoading());
        try {
            const response = await getListNewsType(payload);
            if (response.status) {
                console.log(response)
                const updatedData: any = response.result.data.map(
                    (item: any, i: any) => ({
                        ...item,
                        index: i + 1 + (searchParams.page ?? 0) * (searchParams.size ?? 0),

                    })
                );

                setDataTable(updatedData);
                setPagination((prev) => ({
                    ...prev,
                    total: response.result.total,
                }));

            }
        } catch (err) {
            setDataTable([]);
            dispatch(
                showNotification({
                    message: "Get data fail!",
                    type: "error",
                })
            );
        } finally {
            dispatch(stopLoading());
        }
    };
    useEffect(() => {
        getList();
    }, [searchParams, refresh]);

    const handleTableChange = (pagination: any) => {
        setSearchParams({
            ...searchParams,
            page: pagination.current - 1,
            size: pagination.pageSize,
        });
        setPagination(pagination);
    };


    const onSelectChange = (newSelectedRowKeys: React.Key[], newsType: ITable[]) => {
        if (newsType.length > 0) {
            const { typeCode, typeNameJP } = newsType[newsType.length - 1];
            setNewsType({ id: typeCode as string, name: typeNameJP as string });
        } else {
            setNewsType(null); // Nếu không có dòng nào được chọn
        }
    };
    const rowSelection = {
        type: 'checkbox' as const,
        selectedRowKeys: newsType ? [newsType.id] : [],
        onChange: onSelectChange,
    };
    return (

        <div className={"modal_danh_sach_nhan_vien"}>
            <Form
                form={formListNewsType}
                layout="vertical"
                name="NewsType"
                onFinish={onSearch}
                autoComplete="off"
            >
                <div className='search_form_container'>
                    <Form.Item label="Code" name="typeCode">
                        <AppInput  />
                    </Form.Item>
                    <Form.Item label="News type name" name="typeNameJP">
                        <AppInput  />
                    </Form.Item>

                    <Form.Item label={" "}>
                        <div className="btn_search_qldm">
                            <AppButton
                                className="default_btn_search"
                                title="Search"
                                onClick={() => formListNewsType.submit()}
                            />
                            <AppButton
                                className="default_btn_refresh"
                                title="Clear"
                                onClick={() => {
                                    formListNewsType.resetFields()
                                    setSearchParams({
                                        page: 0,
                                        size: 5,
                                    });
                                    setPagination({
                                        ...pagination,
                                        current: 1,
                                    });
                                    refecth()
                                }}
                            />
                        </div>
                    </Form.Item>
                </div>
            </Form>

            <AppTable
                titleTable="News type list"
                total={pagination.total}
                columns={columnTable as ColumnsType<any>}
                data={dataTable}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                }}
                onChange={handleTableChange}
                rowKey="typeCode"
                rowSelection={rowSelection}
            />
        </div>
    )
}

export default MListNewsType