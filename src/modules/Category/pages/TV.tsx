import React, { useEffect, useState } from 'react'
import AppTable from '../../../components/common/AppTable';
import AppButton from '../../../components/common/AppButton';
import TVSearch from '../components/search/TVSearch';
import PageContainer from '../../../components/common/PageContainer';
import { ColumnsType } from 'antd/es/table';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IAddTV, ISearchTV, ITableTV, IUpdateTV } from '../interfaces/TypeTV';
import { Form, message, Popconfirm, Tooltip } from 'antd';
import useRefresh from '../../../hooks/useRefresh';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import { addTV, deleteTV, detailTV, getListTV, updateTV } from '../api/tv.api';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { showNotification } from '../../../redux/reducers/notificationReducer';
import AppModal from '../../../components/common/AppModal';
import ModalTV from '../components/modal/modalTV';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // Import locale Nhật Bản
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('ja'); // Đặt locale là Nhật Bản
type Props = {}

const TV = (props: Props) => {
    const { state } = useLocation();
    //   const auth = state.authority;
    const dispatch = useDispatch();
    const [formModal] = Form.useForm<IAddTV>();
    const [form] = Form.useForm<ISearchTV>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [titleModal, setTitleModal] = useState(" ");
    const [refresh, refecth] = useRefresh();
    const [dataTable, setDataTable] = useState<ITableTV[] | []>([]);
    const [tv, setTv] = useState<ITableTV>();
    const [tvCode, setTvCode] = useState<string[]>([]);

    const showModalAdd = () => {
        setIsModalOpen(true);
        setModalType("add");
        setTitleModal("Add new broadcast time");
    };

    const showModalDetail = async (_id: any) => {
        try {
            dispatch(startLoading())
            const rp = await detailTV(_id)
            if (rp.status) {
                setTv(rp.result);
                setIsModalOpen(true);
                setModalType("detail");
                setTitleModal("Detail broadcast time");
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
            const rp = await detailTV(_id)
            if (rp.status) {
                setTv(rp.result);
                setIsModalOpen(true);
                setModalType("edit");
                setTitleModal("Edit broadcast time");
            }
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(stopLoading())
        }
    };


    const [searchParams, setSearchParams] = useState<ISearchTV>({
        page: 0,
        size: 10,
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });


    const onSearch = async (values: ISearchTV) => {
        setSearchParams({
            ...searchParams,
            tvName: values.tvName && values.tvName !== "" ? values.tvName : undefined,
            tvCode: values.tvCode && values.tvCode !== "" ? values.tvCode : undefined,
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

    const columnTable: ColumnsType<ITableTV> = [
        { title: "#", dataIndex: "index", key: "index", },
   
        {
            title: "TV name",
            dataIndex: "tvName",
            key: "tvName",
            render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,

        },
        {
            title: "Code",
            dataIndex: "tvCode",
            key: "tvCode",

        },
        {
            title: "Broadcast time",
            dataIndex: "broadcastTime",
            key: "broadcastTime",

        },
        {
            title: "Action",
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
                            title="Are you sure to delete this task?"
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
            const response = await getListTV(payload);
            if (response.status) {
                const updatedData: any = response.result.data.map(
                    (item: any, i: any) => ({
                        ...item,
                        index: i + 1 + (searchParams.page ?? 0) * (searchParams.size ?? 0),

                    })
                );

                setDataTable(updatedData);
                setTvCode(updatedData.map((item: ITableTV) => item.tvCode));
                setPagination((prev) => ({
                    ...prev,
                    total: response.result.total,
                }));

            }
        } catch (err) {
            setDataTable([]);
            dispatch(
                showNotification({
                    message: "Get data fail.",
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

    const formatJapaneseDate = (value: dayjs.Dayjs | null) => {
        if (!value) return '';
        const dayOfWeek = value.format('dd'); // (水)
        const formattedDate = value.format('MM月DD日'); // 10月3日
        const time = value.format('HH時mm分'); // 0時30分
        const isLateNight = value.hour() < 5 ? '深夜' : ''; // Để xác định 深夜
        return `${formattedDate}(${dayOfWeek}) ${isLateNight}${time}`;
      };
 
    const handleOk = async (values: IAddTV) => {
        let payload = {
            ...values,
            broadcastTime: formatJapaneseDate(values.broadcastTime),
          }
        try {
            dispatch(startLoading());
            if (titleModal === "Add new broadcast time" && modalType === "add") {
                await addTV(payload).then((response) => {
                    if (response.status) {
                        message.success("Add successful!");
                        refecth();
                        handleCancel();
                    }
                });
            }

            if (titleModal === "Edit broadcast time" && modalType === "edit") {
                console.log(payload,"payload")
                await updateTV(payload, tv?._id).then((response) => {
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
            await deleteTV(_id).then(response => {
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
            <PageContainer title="Broadcast time" extra={extraButton()}>
                <div className="tablePanel">
                    <TVSearch
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
                        titleTable="Broadcast time list"
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
                    <ModalTV
                        onSubmit={handleOk}
                        title={titleModal}
                        form={formModal}
                        tv={tv}
                        modalType={modalType}
                        tvCode={tvCode}
                    />
                </AppModal>
            </PageContainer>
        </div>
    )
}

export default TV