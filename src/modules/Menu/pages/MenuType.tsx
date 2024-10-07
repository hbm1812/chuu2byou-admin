import { Form, message, Popconfirm, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import useRefresh from '../../../hooks/useRefresh';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { showNotification } from '../../../redux/reducers/notificationReducer';
import AppButton from '../../../components/common/AppButton';
import PageContainer from '../../../components/common/PageContainer';
import AppTable from '../../../components/common/AppTable';
import AppModal from '../../../components/common/AppModal';
import { IAddMenuType, ISearchMenuType, ITableMenuType, IUpdateMenuType } from '../interfaces/typeMenuType';
import { addMenuType, deleteMenuType, detailMenuType, getListMenuType, updateMenuType } from '../api/menuType.api';
import SearchMenuType from '../components/search/SearchMenuType';
import ModalMenuType from '../components/modal/ModalMenuType';

type Props = {}

const MenuType = (props: Props) => {
  const dispatch = useDispatch();
  const [formModal] = Form.useForm<IAddMenuType>();
  const [form] = Form.useForm<ISearchMenuType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [titleModal, setTitleModal] = useState(" ");
  const [refresh, refecth] = useRefresh();
  const [dataTable, setDataTable] = useState<ITableMenuType[] | []>([]);
  const [dataMenuType, setDataMenuType] = useState<ITableMenuType>();
  const [menuTypeCode, setMenuTypeCode] = useState<string[]>([]);

  const showModalAdd = () => {
    setIsModalOpen(true);
    setModalType("add");
    setTitleModal("Add new menu type");
  };
  const showModalDetail = async (_id: any) => {
    try {
      dispatch(startLoading())
      const rp = await detailMenuType(_id)
      if (rp.status) {
        setDataMenuType(rp.result);
        setIsModalOpen(true);
        setModalType("detail");
        setTitleModal("Detail menu type");
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
      const rp = await detailMenuType(_id)
      if (rp.status) {
        setDataMenuType(rp.result);
        setIsModalOpen(true);
        setModalType("edit");
        setTitleModal("Edit menu type");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(stopLoading())
    }
  };

  const [searchParams, setSearchParams] = useState<ISearchMenuType>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const onSearch = async (values: ISearchMenuType) => {
    setSearchParams({
      ...searchParams,
      menuTypeName: values.menuTypeName && values.menuTypeName !== "" ? values.menuTypeName : undefined,
      menuTypeCode: values.menuTypeCode && values.menuTypeCode !== "" ? values.menuTypeCode : undefined,
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


  const columnTable: ColumnsType<ITableMenuType> = [
    { title: "#", dataIndex: "index", key: "index", },
    {
      title: "Code",
      dataIndex: "menuTypeCode",
      key: "menuTypeCode",

    },
    {
      title: "Name",
      dataIndex: "menuTypeName",
      key: "menuTypeName",
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
      const response = await getListMenuType(payload);
      if (response.status) {
        const updatedData: any = response.result.data.map(
          (item: any, i: any) => ({
            ...item,
            index: i + 1 + (searchParams.page ?? 0) * (searchParams.size ?? 0),

          })
        );

        setDataTable(updatedData);
        setMenuTypeCode(updatedData.map((item: ITableMenuType) => item.menuTypeCode));
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

      if (titleModal === "Add new menu type" && modalType === "add") {
        const insertBody: IAddMenuType = { ...values };
        await addMenuType(insertBody).then((response) => {
          if (response.status) {
            message.success("Add successful!");
            refecth();
            handleCancel();
          }
        });
      }

      if (titleModal === "Edit menu type" && modalType === "edit") {

        const updateBody: IUpdateMenuType= { ...values };
        await updateMenuType(updateBody, dataMenuType?._id).then((response) => {
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
      await deleteMenuType(_id).then(response => {
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
      <PageContainer title="Menu type" extra={extraButton()}>
        <div className="tablePanel">
          <SearchMenuType
            form={form}
            onSearch={onSearch}
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
            titleTable="Tv series menu list"
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
          <ModalMenuType
            onSubmit={handleOk}
            title={titleModal}
            form={formModal}
            dataMenuType={dataMenuType}
            modalType={modalType}
            menuTypeCode={menuTypeCode}
          />
        </AppModal>
      </PageContainer>
    </div>
  )
}

export default MenuType