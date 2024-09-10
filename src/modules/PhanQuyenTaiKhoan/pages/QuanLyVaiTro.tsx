import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppButton from "../../../components/common/AppButton";
import AppModal from "../../../components/common/AppModal";
import AppTable from "../../../components/common/AppTable";
import PageContainer from "../../../components/common/PageContainer";
import useRefresh from "../../../hooks/useRefresh";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { renderStatusUser } from "../../../utils/GetColorByTrangThai";
import { deleteRole, detailRole, getListRole } from "../api/role.api";
import FormQuanLyVaiTro from "../components/FormQuanLyVaiTro";
import SearchQuanLyVaiTro from "../components/SearchQuanLyVaiTro";
import {
  IFormQlVaiTro,
  ISearchQlVaiTro,
  ITableQlVaiTro,
} from "../interfaces/qlVaiTro.interface";
import { useLocation } from "react-router-dom";

const initSearchParams = {
  page: 0,
  size: 10,
};

const QuanLyVaiTro: React.FC = () => {
  const { state } = useLocation();
  // const auth = state.authority;
  const dispatch = useDispatch();

  const [formSearch] = Form.useForm<ISearchQlVaiTro>();
  const [formHandle] = Form.useForm<IFormQlVaiTro>();
  const [refresh, refecth] = useRefresh();
  const [isActionDisabled, setIsActionDisabled] = useState<boolean>(true);
  const [searchParams, setSearchParams] =
    useState<ISearchQlVaiTro>(initSearchParams);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeOpenModal, setTypeOpenModal] = useState("add");
  const [dataTable, setDataTable] = useState<ITableQlVaiTro[] | []>([]);
  const [total, setTotal] = useState<number>(0);
  const [dataDetail, setDataDetail] = useState<IFormQlVaiTro>({});

  let titleModal = "";
  const showModalAdd = () => {
    setIsModalOpen(true);
    setTypeOpenModal("add");
  };

  const showModalUpdate = async (code: string) => {
    try {
      dispatch(startLoading());
      const res = await detailRole(code);
      res.status &&
        (setIsModalOpen(true),
        setTypeOpenModal("edit"),
        setDataDetail(res.result));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(stopLoading());
    }
  };

  const showModalDetail = async (code: string) => {
    try {
      dispatch(startLoading());
      const res = await detailRole(code);
      res.status &&
        (setIsModalOpen(true),
        setTypeOpenModal("detail"),
        setDataDetail(res.result));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleCancelAdd = () => {
    setIsActionDisabled(true);
    setIsModalOpen(false);
    setDataDetail({});
    formHandle.resetFields();
  };

  const extraButton = () => {
    return (
      <div>
     
          <div className="page_container_header_extra">
            <AppButton
              className="default_btn_add"
              title="Thêm mới"
              onClick={showModalAdd}
            />
          </div>
      
      </div>
    );
  };

  const deleteProduct = async (code: string) => {
    dispatch(startLoading());
    try {
      await deleteRole(code).then((response) => {
        if (response.status) {
          dispatch(
            showNotification({ message: "Xóa thành công!", type: "success" })
          );
          refecth();
        } else {
          // thông báo lỗi
        }
      });
    } catch (error) {
      dispatch(
        showNotification({
          message: "Xóa thất bại!",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const columnQLVaiTro: ColumnsType<ITableQlVaiTro> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Mã vai trò",
      dataIndex: "code",
      key: "code",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Vai trò mặc định",
      dataIndex: "isDefaultRole",
      key: "isDefaultRole",
      render: (text: string) => (
        <div>{text ? "Vai trò mặc định" : "Không mặc định"}</div>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (text: string, record: ITableQlVaiTro) =>
        renderStatusUser(record.active),
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      align: 'center', 
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      render: (text: string, record: ITableQlVaiTro) => (
        <Space size={15}>
          <EyeOutlined
            style={{ fontSize: 18, cursor: "pointer" }}
            onClick={() => showModalDetail(record.code)}
          />
        
            <EditOutlined
              style={{
                color: "rgb(24, 106, 201)",
                cursor: "pointer",
                fontSize: 18,
                marginLeft: 30,
              }}
              onClick={() => showModalUpdate(record.code)}
            />

            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => deleteProduct(record.code)}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined
                style={{
                  color: "red",
                  marginLeft: 30,
                  cursor: "pointer",
                  fontSize: 18,
                }}
              />
            </Popconfirm>
 
        </Space>
      ),
    },
  ];

  const onSearch = async (values: ISearchQlVaiTro) => {
    setSearchParams({
      ...searchParams,
      code: values.code && values.code !== "" ? values.code : undefined,
      name: values.name && values.name !== "" ? values.name : undefined,
      active: values.active && values.active !== "" ? values.active : undefined,
      isDefaultRole:
        values.isDefaultRole && values.isDefaultRole !== ""
          ? values.isDefaultRole === "1"
            ? true
            : false
          : undefined,
    });
    refecth();
  };

  const getList = async () => {
    const payload = {
      ...searchParams,
      sorts: ["created_date:desc"],
    };
    dispatch(startLoading());
    try {
      const response = await getListRole(payload);
      if (response.status) {
        const updatedData: ITableQlVaiTro[] = response.result.data.map(
          (item: ITableQlVaiTro, i: number) => ({
            ...item,
            stt: i + 1 + searchParams.page * searchParams.size,
          })
        );
        setDataTable(updatedData);
        setPagination((prev) => ({
          ...prev,
          total: response.result.total,
        }));
        setTotal(response.result.total);
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

  const handleTableChange = (pagination: any) => {
    setSearchParams({
      ...searchParams,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
    setPagination(pagination);
  };

  if (typeOpenModal === "add") {
    titleModal = "Thêm mới vai trò";
  } else if (typeOpenModal === "edit") {
    titleModal = "Chỉnh sửa vai trò";
  } else if (typeOpenModal === "detail") {
    titleModal = "Chi tiết vai trò";
  }

  useEffect(() => {
    getList();
  }, [searchParams, refresh]);

  return (
    <PageContainer title="Quản lý vai trò" extra={extraButton()}>
      <SearchQuanLyVaiTro form={formSearch} onSearch={onSearch} />
      <div className="btn_search_qldm">
        <AppButton
          className="default_btn_search"
          title="Tìm kiếm"
          onClick={() => {
            if (searchParams.page > 0) {
              setSearchParams({ ...searchParams, page: 0 });
              setPagination({ ...pagination, current: 1 });
            }
            formSearch.submit();
          }}
        />
        <AppButton
          className="default_btn_refresh"
          title="Xoá điều kiện"
          onClick={() => {
            setSearchParams(initSearchParams);
            formSearch.resetFields();
            formSearch.submit();
          }}
        />
      </div>
      <AppTable
        titleTable="Danh sách vai trò"
        columns={columnQLVaiTro as ColumnsType<any>}
        data={dataTable}
        rowKey="stt"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        total={total}
      />
      <AppModal
        width={"40%"}
        onSubmit={() => formHandle.submit()}
        onClose={handleCancelAdd}
        isOpen={isModalOpen}
        title={titleModal}
        typeOpenModal={typeOpenModal}
      >
        <FormQuanLyVaiTro
          title={titleModal}
          form={formHandle}
          isActionDisabled={isActionDisabled}
          setIsActionDisabled={setIsActionDisabled}
          dataDetail={dataDetail}
          refecth={refecth}
          handleCancelAdd={handleCancelAdd}
          typeOpenModal={typeOpenModal}
        />
      </AppModal>
    </PageContainer>
  );
};
export default QuanLyVaiTro;
