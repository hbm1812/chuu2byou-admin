import React, { useEffect, useState } from 'react'
import { IAddWorks, ISearchWorks, ITableWorks } from '../interfaces/TypeWorks';
import { Form, message, Popconfirm, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import useRefresh from '../../../hooks/useRefresh';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import { addWorks, deleteWorks, detailWorks, getListWorks, updateWorks } from '../api/works.api';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { showNotification } from '../../../redux/reducers/notificationReducer';

type Props = {}

const Works = (props: Props) => {

  const dispatch = useDispatch();
  const [formModal] = Form.useForm<IAddWorks>();
  const [form] = Form.useForm<ISearchWorks>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [titleModal, setTitleModal] = useState(" ");
  const [refresh, refecth] = useRefresh();
  const [dataTable, setDataTable] = useState<ITableWorks[] | []>([]);
  const [workData, setWorkData] = useState<ITableWorks>();

  const showModalAdd = () => {
    setIsModalOpen(true);
    setModalType("add");
    setTitleModal("Add new work");
  };

  const showModalDetail = async (_id: any) => {
    try {
      dispatch(startLoading())
      const rp = await detailWorks(_id)
      if (rp.status) {
        setIsModalOpen(true);
        setModalType("detail");
        setTitleModal("Detail work");
        setWorkData(rp.result);
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
      const rp = await detailWorks(_id)
      if (rp.status) {
        setIsModalOpen(true);
        setModalType("edit");
        setTitleModal("Edit work");
        setWorkData(rp.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(stopLoading())
    }
  };

  const [searchParams, setSearchParams] = useState<ISearchWorks>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const onSearch = async (values: ISearchWorks) => {
    setSearchParams({
      ...searchParams,
      workName: values.workName && values.workName !== "" ? values.workName : undefined,
      workCode: values.workCode && values.workCode !== "" ? values.workCode : undefined,
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

    const deleteDataSearch = () => {
      form.resetFields();
      form.submit();
    };

  };


  const columnTable: ColumnsType<ITableWorks> = [
    { title: "#", dataIndex: "index", key: "index", },
    {
      title: "Work code",
      dataIndex: "workCode",
      key: "workCode",

    },

    {
      title: "Work name",
      dataIndex: "workName",
      key: "workName",
      render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,

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
      const response = await getListWorks(payload);
      if (response.status) {
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

  const handleOk = async (values: IAddWorks) => {
    let payload = {
      ...values
    }
    try {
      dispatch(startLoading());
      if (titleModal === "Add new work" && modalType === "add") {
        await addWorks(payload).then((response) => {
          if (response.status) {
            message.success("Add successful!");
            refecth();
            handleCancel();
          }
        });
      }

      if (titleModal === "Edit work" && modalType === "edit") {
        await updateWorks(payload, workData?._id).then((response) => {
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
      await deleteWorks(_id).then(response => {
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
    <div>works</div>
  )
}

export default Works