import { Form, message, Popconfirm, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import useRefresh from '../../../hooks/useRefresh';
import { IAddGlobalMenu, ISearchGlobalMenu, ITableGlobalMenu, IUpdateGlobalMenu } from '../interfaces/typeGlobalMenu';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { showNotification } from '../../../redux/reducers/notificationReducer';
import AppButton from '../../../components/common/AppButton';
import PageContainer from '../../../components/common/PageContainer';
import SearchNewsType from '../../Category/components/search/NewsTypeSearch';
import AppTable from '../../../components/common/AppTable';
import AppModal from '../../../components/common/AppModal';
import ModalGlobalMenu from '../components/modal/ModalGlobalMenu';
import { addGlobalMenu, deleteGlobalMenu, detailGlobalMenu, getListGlobalMenu, updateGlobalMenu } from '../api/globalMenu.api';

type Props = {}

const GlobalMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [formModal] = Form.useForm<IAddGlobalMenu>();
  const [form] = Form.useForm<ISearchGlobalMenu>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [titleModal, setTitleModal] = useState(" ");
  const [refresh, refecth] = useRefresh();
  const [dataTable, setDataTable] = useState<ITableGlobalMenu[] | []>([]);
  const [dataGlobalMenu, setDataGlobalMenu] = useState<ITableGlobalMenu>();
  const [globalMenuCode, setGlobalMenuCode] = useState<string[]>([]);

  const showModalAdd = () => {
    setIsModalOpen(true);
    setModalType("add");
    setTitleModal("Add new global menu");
  };
  const showModalDetail = async (_id: any) => {
    try {
      dispatch(startLoading())
      const rp = await detailGlobalMenu(_id)
      if (rp.status) {
        setDataGlobalMenu(rp.result);
        setIsModalOpen(true);
        setModalType("detail");
        setTitleModal("Detail global menu");
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
      const rp = await detailGlobalMenu(_id)
      if (rp.status) {
        setDataGlobalMenu(rp.result);
        setIsModalOpen(true);
        setModalType("edit");
        setTitleModal("Edit global menu");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(stopLoading())
    }
  };


  const [searchParams, setSearchParams] = useState<ISearchGlobalMenu>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });


  const onSearch = async (values: ISearchGlobalMenu) => {
    setSearchParams({
      ...searchParams,
      key: values.key && values.key !== "" ? values.key : undefined,
      name: values.name && values.name !== "" ? values.name : undefined,
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

  const columnTable: ColumnsType<ITableGlobalMenu> = [
    { title: "#", dataIndex: "index", key: "index", },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",

    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,

    },
    {
      title: "Parent code",
      dataIndex: "parentCode",
      key: "parentCode",

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
      const response = await getListGlobalMenu(payload);
      if (response.status) {
        const updatedData: any = response.result.data.map(
          (item: any, i: any) => ({
            ...item,
            index: i + 1 + (searchParams.page ?? 0) * (searchParams.size ?? 0),

          })
        );

        setDataTable(updatedData);
        setGlobalMenuCode(updatedData.map((item: ITableGlobalMenu) => item.code));
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

      if (titleModal === "Add new global menu" && modalType === "add") {
          const insertBody: IAddGlobalMenu = { ...values };
          console.log(insertBody,"insert body")
          await addGlobalMenu(insertBody).then((response) => {
              if (response.status) {
                  message.success("Add successful!");
                  refecth();
                  handleCancel();
              }
          });
      }

      if (titleModal === "Edit global menu" && modalType === "edit") {

          const updateBody: IUpdateGlobalMenu = { ...values };
          await updateGlobalMenu(updateBody, dataGlobalMenu?._id).then((response) => {
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
      await deleteGlobalMenu(_id).then(response => {
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
    <PageContainer title="Global menu" extra={extraButton()}>
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
            <ModalGlobalMenu
                onSubmit={handleOk}
                title={titleModal}
                form={formModal}
                dataGlobalMenu={dataGlobalMenu}
                modalType={modalType}
                globalMenuCode={globalMenuCode}
            />
        </AppModal>
    </PageContainer>
</div>
  )
}

export default GlobalMenu