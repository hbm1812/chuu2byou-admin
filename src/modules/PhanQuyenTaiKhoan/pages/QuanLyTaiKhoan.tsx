import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Popconfirm, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppButton from "../../../components/common/AppButton";
import AppTable from "../../../components/common/AppTable";
import PageContainer from "../../../components/common/PageContainer";
import useRefresh from "../../../hooks/useRefresh";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { renderStatusUser } from "../../../utils/GetColorByTrangThai";
import { deletelUser, getListUser } from "../api/user.api";
import ModalCreateUser from "../components/ModalCreateUser";
import SearchQuanLyTaiKhoan from "../components/SearchQuanLyTaiKhoan";
import {
  IRoleName,
  ISearchQlTaiKhoan,
  ITableQlTaiKhoan,
} from "../interfaces/qlTaiKhoan.interface";
import { useLocation } from "react-router-dom";

const initSearchParams = {
  page: 0,
  size: 10,
};

const QuanLyTaiKhoan: React.FC = () => {
  const { state } = useLocation();
  // const auth = state.authority;
  const dispatch = useDispatch();
  const [formSearch] = Form.useForm<ISearchQlTaiKhoan>();
  const [refresh, refecth] = useRefresh();
  const [searchParams, setSearchParams] =
    useState<ISearchQlTaiKhoan>(initSearchParams);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [total, setTotal] = useState<number>(0);
  const [openModal, setOpenModal] = useState<string>("");
  const [itemTarget, setItemTarget] = useState<number | null>(null);
  const [dataTable, setDataTable] = useState<ITableQlTaiKhoan[] | []>([]);
  // const [dataDetail, setDataDetail] = useState<IFormQlVaiTro>({})

  const showModalAdd = () => {
    setOpenModal("create");
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

  const handleDelete = async (id: number) => {
    dispatch(startLoading());
    try {
      await deletelUser(id).then((response) => {
        if (response.status) {
          dispatch(
            showNotification({ message: "Xóa thành công!", type: "success" })
          );
          refecth();
        } else {
          // thông báo lỗi
        }
      });
    } catch (error: any) {
      dispatch(
        showNotification({
          message: error.data.detail || "Xóa thất bại!",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const columnQLTaiKhoan: ColumnsType<ITableQlTaiKhoan> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
      key: "fullName",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (text: string, record) => renderStatusUser(record.active), // Sử dụng hàm GetColorByTrangThai
    },
    {
      title: "Phòng ban",
      dataIndex: "departmentName",
      key: "departmentName",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Vai trò",
      dataIndex: "roleNames",
      key: "roleNames",
      render: (roles: IRoleName[]) => {
        return roles.map((role) => {
          return <div>{role.roleName}</div>;
        });
      },
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      render: (text: string, record: ITableQlTaiKhoan) => (
        <Space size={15}>
          <Tooltip title="Chi tiết tài khoản">
            <EyeOutlined
              className="icon_action_table"
              onClick={() => {
                setOpenModal("detail");
                setItemTarget(record.id);
              }}
            />
          </Tooltip>
        
            <Tooltip title="Chỉnh sửa tài khoản">
              <EditOutlined
                className="icon_action_table edit"
                onClick={() => {
                  setOpenModal("update");
                  setItemTarget(record.id);
                }}
              />
            </Tooltip>
     
     
            <Tooltip title="Xóa tài khoản">
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => handleDelete(record.id)}
                okText="Có"
                cancelText="Không"
              >
                <DeleteOutlined
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                />
              </Popconfirm>
            </Tooltip>
    
        </Space>
      ),
    },
  ];
  const onSearch = async (values: ISearchQlTaiKhoan) => {
    setSearchParams({
      ...searchParams,
      username:
        values.username && values.username !== "" ? values.username : undefined,
      fullName:
        values.fullName && values.fullName !== "" ? values.fullName : undefined,
      active: values.active && values.active !== "" ? values.active : undefined,
    });
    refecth();
  };

  const getList = async () => {
    const payload = {
      ...searchParams,
      isFetchRole: true,
    };
    dispatch(startLoading());
    try {
      const response = await getListUser(payload);
      if (response.status) {
        const updatedData: ITableQlTaiKhoan[] = response.result.data.map(
          (item: ITableQlTaiKhoan, i: number) => ({
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

  useEffect(() => {
    getList();
  }, [searchParams, refresh]);

  // if (typeOpenModal === "add") {
  //   titleModal = "Thêm mới tài khoản"
  // } else if (typeOpenModal === "edit") {
  //   titleModal = "Chỉnh sửa tài khoản"
  // } else if (typeOpenModal === "detail") {
  //   titleModal = "Chi tiết tài khoản"
  // }

  return (
    <PageContainer title="Quản lý tài khoản" extra={extraButton()}>
      <SearchQuanLyTaiKhoan form={formSearch} onSearch={onSearch} />
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
            formSearch.resetFields();
            formSearch.submit();
            setSearchParams(initSearchParams);
          }}
        />
      </div>
      <AppTable
        titleTable="Danh sách tài khoản"
        columns={columnQLTaiKhoan as ColumnsType<any>}
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
      {openModal && (
        <ModalCreateUser
          open={openModal}
          setOpenModal={setOpenModal}
          refreshList={() => getList()}
          itemTarget={itemTarget}
          setItemTarget={setItemTarget}
        />
      )}
    </PageContainer>
  );
};
export default QuanLyTaiKhoan;
