import React, { useEffect, useState } from 'react'
import AppButton from '../../../components/common/AppButton';
import { useLocation } from 'react-router-dom';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import { IAddNewsType, ISearchNewsType, ITable } from '../interfaces/TypeNewsType';
import { useDispatch } from 'react-redux';
import { Form, message, Popconfirm, Tooltip } from 'antd';
import PageContainer from '../../../components/common/PageContainer';
import SearchNewsType from '../components/search/NewsTypeSearch';
import useRefresh from '../../../hooks/useRefresh';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import AppTable from '../../../components/common/AppTable';
import AppModal from '../../../components/common/AppModal';
import ModalNewsType from '../components/modal/modalNewsType';
import { showNotification } from '../../../redux/reducers/notificationReducer';
import { addNewsType, getListNewsType } from '../api/news.api';


type Props = {}

const NewsType: React.FC = () => {
    const { state } = useLocation();
    //   const auth = state.authority;
    const dispatch = useDispatch();
    const [formModal] = Form.useForm<IAddNewsType>();
    const [form] = Form.useForm<ISearchNewsType>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [titleModal, setTitleModal] = useState(" ");
    const [refresh, refecth] = useRefresh();
    const [dataTable, setDataTable] = useState<ITable[] | []>([]);
    const [newsType, setNewsType] = useState<ITable>();
    const [newsTypeCode, setNewsTypeCode] = useState<string[]>([]);

    const showModalAdd = () => {
        setIsModalOpen(true);
        setModalType("add");
       setTitleModal("新しいタイプのニュースを作成する");
    };

    const [searchParams, setSearchParams] = useState<ISearchNewsType>({
        page: 0,
        size: 10,
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    

    const onSearch = async (values: ISearchNewsType) => {
        setSearchParams({
            ...searchParams,
            typeNameJP: values.typeNameJP && values.typeNameJP !== "" ? values.typeNameJP : undefined,
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
   
    const deleteDataSearch = () => {
        form.resetFields();
        form.submit();
    };

    const columnTable: ColumnsType<ITable> = [
        { title: "#", dataIndex: "index", key: "index", },
        {
            title: "typeCode",
            dataIndex: "typeCode",
            key: "typeCode",

        },
        {
            title: "typeNameJP",
            dataIndex: "typeNameJP",
            key: "typeNameJP",
            render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,

        },
        {
            title: "action",
            dataIndex: "action",
            key: "action",
            render: (_, record: any) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title="詳細を見る">

                        <EyeOutlined className="icon_action_table detail"
                        // onClick={() => showModalChiTiet(record.id)} 
                        />
                    </Tooltip>
                    <Tooltip title="編集する">
                        <EditOutlined
                            className="icon_action_table edit"
                        // onClick={() => showModalSua(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="削除する">
                        <Popconfirm
                            title="削除してもよろしいですか?"
                            // onConfirm={() => deleteProduct(record.id)}
                            okText="はい"
                            cancelText="いいえ"
                        >
                            <DeleteOutlined
                                className="icon_action_table delete"
                            />
                        </Popconfirm>
                    </Tooltip>


                </div>
            ),
            fixed: 'right',
        },
    ];
   
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
                setNewsTypeCode(updatedData.map((item: ITable) => item.typeCode));
                setPagination((prev) => ({
                    ...prev,
                    total: response.result.total,
                }));
                
            }
        } catch (err) {
            setDataTable([]);
            dispatch(
                showNotification({
                    message: "Lấy dữ liệu thất bại.",
                    type: "error",
                })
            );
        } finally {
            dispatch(stopLoading());
        }
    };
    useEffect(() => {
        getList();
    }, [ searchParams,refresh]);

    const handleTableChange = (pagination: any) => {
        setSearchParams({
            ...searchParams,
            page: pagination.current - 1,
            size: pagination.pageSize,
        });
        setPagination(pagination);
    };
    
    const showModalEdit = async (id: number) => {
        try {
            dispatch(startLoading())
            // const rp = await detailProduct(id)
            // if (rp.status) {
            //     setProduct(rp.result);
            //     setIsModalOpen(true);
            //     setModalType("edit");
            // }
            setIsModalOpen(true);
            setModalType("edit");
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(stopLoading())
        }
    };

     const handleOk = async () => {
        try {
            dispatch(startLoading());
            const values = await formModal.validateFields();
            if (titleModal === "新しいタイプのニュースを作成する" && modalType==="add") {
                const insertBody: IAddNewsType = { ...values };
                await addNewsType(insertBody).then((response) => {
                    if (response.status) {
                        message.success("Thêm mới thành công!");
                        refecth();
                        handleCancel();
                    }
                });
            }

            if (titleModal === "Sửa hàng hóa") {

                // const updateBody: IUpdateDanhMucHangHoa = { ...values };
                // await updateDMHangHoa(updateBody, product?.id).then((response) => {
                //     if (response.status) {
                //         refecth();
                //         handleCancel();
                //         message.success("Sửa thành công!");
                //     }
                // });

            }
        } catch (error: any) {

            dispatch(
                showNotification({
                    message: error?.message,
                    type: "error",
                })
            );
        } finally {
            dispatch(stopLoading());
        }
    }; 

    const handleCancel = () => {
        setIsModalOpen(false);
        formModal.resetFields();
        setModalType("");
        setTitleModal(" ");
    };
    const extraButton = () => {
        return (
            <div className="page_container_header_extra">

                <AppButton className="default_btn_refresh" title="輸入" />
                <AppButton
                    className="default_btn_add"
                    onClick={showModalAdd}
                    title="作成する"
                />
                <AppButton className="default_btn_refresh" title="輸出" />


            </div>
        );
    };

    return (
        <div>
            <PageContainer title="ニュースタイプ" extra={extraButton()}>
                <div className="tablePanel">
                    <SearchNewsType
                        form={form}
                        onSearch={onSearch}
                    // searchParams={searchParams}
                    />
                    <div className="btn_search_qldm">
                        <AppButton
                            className="default_btn_search"
                            title="検索"
                            onClick={() => form.submit()}
                        />

                        <AppButton
                            className="default_btn_refresh"
                            title="検索データをクリア"
                            onClick={() => deleteDataSearch()}
                        />
                    </div>
                    <AppTable
                        titleTable="ニュースタイプリスト"
                        total={pagination.total}
                        columns={columnTable as ColumnsType<any>}
                        data={dataTable}
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: pagination.total,
                        }}
                    onChange={handleTableChange}
                    />
                </div>


                <AppModal width={"70%"} isOpen={isModalOpen} title={titleModal} onClose={handleCancel}
                    onSubmit={() => formModal.submit()} typeOpenModal={modalType}>
                    <ModalNewsType
                        onSubmit={handleOk}
                        title={titleModal}
                        form={formModal}
                        newsType={newsType}
                        modalType={modalType}
                        newsTypeCode={newsTypeCode}
                    />
                </AppModal>
            </PageContainer>
        </div>
    )
}

export default NewsType