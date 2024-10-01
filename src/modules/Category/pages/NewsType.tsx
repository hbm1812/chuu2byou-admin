import React, { useEffect, useState } from 'react'
import AppButton from '../../../components/common/AppButton';
import { useLocation } from 'react-router-dom';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import { IAddNewsType, ISearchNewsType, ITable, IUpdateNewsType } from '../interfaces/TypeNewsType';
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
import { addNewsType, deleteNewsType, detailNewsType, getListNewsType, updateNewsType } from '../api/news.api';


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
        setTitleModal("Add new news type");
    };

    const showModalDetail = async (_id: any) => {
        try {
            dispatch(startLoading())
            const rp = await detailNewsType(_id)
            if (rp.status) {
                setNewsType(rp.result);
                setIsModalOpen(true);
                setModalType("detail");
                setTitleModal("Detail news type");
            }
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(stopLoading())
        }
    };


    const showModalEdit = async (_id: any) => {
        try {
            dispatch(startLoading())
            const rp = await detailNewsType(_id)
            if (rp.status) {
                setNewsType(rp.result);
                setIsModalOpen(true);
                setModalType("edit");
                setTitleModal("Edit news type");
            }
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(stopLoading())
        }
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

    const deleteDataSearch = () => {
        form.resetFields();
        form.submit();
    };

    const columnTable: ColumnsType<ITable> = [
        { title: "#", dataIndex: "index", key: "index", },
        {
            title: "Code",
            dataIndex: "typeCode",
            key: "typeCode",

        },
        {
            title: "Name",
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
                    <Tooltip title="Detail">

                        <EyeOutlined className="icon_action_table detail"
                            onClick={() => showModalDetail(record._id)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <EditOutlined
                            className="icon_action_table edit"
                            onClick={() => showModalEdit(record._id)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Are you sure to delete this task??"
                            onConfirm={() => deleteVoid(record._id)}
                            okText="Yes"
                            cancelText="No"
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

    

    const handleOk = async () => {
        try {
            dispatch(startLoading());
            const values = await formModal.validateFields();

            if (titleModal === "Add new news type" && modalType === "add") {
                const insertBody: IAddNewsType = { ...values };
                await addNewsType(insertBody).then((response) => {
                    if (response.status) {
                        message.success("Add successful!");
                        refecth();
                        handleCancel();
                    }
                });
            }

            if (titleModal === "Edit news type" && modalType === "edit") {

                const updateBody: IUpdateNewsType = { ...values };
                await updateNewsType(updateBody, newsType?._id).then((response) => {
                    if (response.status) {
                        refecth();
                        handleCancel();
                        message.success("Edit successful!");
                    }
                });

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

    const deleteVoid = async (_id: any) => {
        try {
            dispatch(startLoading());
            await deleteNewsType(_id).then(response => {
                if (response.status) {
                    dispatch(showNotification({ message: "Delete successful!", type: "success" }))
                    refecth();
                } else {
                    // thông báo lỗi
                }

            });

        } catch (error) {
            dispatch(
                showNotification({
                    message: "Delete fail!",
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

                <AppButton className="default_btn_refresh" title="Import" />
                <AppButton
                    className="default_btn_add"
                    onClick={showModalAdd}
                    title="Add new"
                />
                <AppButton className="default_btn_refresh" title="Export" />


            </div>
        );
    };

    return (
        <div>
            <PageContainer title="News type" extra={extraButton()}>
                <div className="tablePanel">
                    <SearchNewsType
                        form={form}
                        onSearch={onSearch}
                    // searchParams={searchParams}
                    />
                    <div className="btn_search_qldm">
                        <AppButton
                            className="default_btn_search"
                            title="Search"
                            onClick={() => form.submit()}
                        />

                        <AppButton
                            className="default_btn_refresh"
                            title="Clear"
                            onClick={() => deleteDataSearch()}
                        />
                    </div>
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
                    />
                </div>


                <AppModal width={"80%"} isOpen={isModalOpen} title={titleModal} onClose={handleCancel}
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