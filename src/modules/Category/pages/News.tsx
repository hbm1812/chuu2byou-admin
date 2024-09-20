import React, { useEffect, useState } from 'react'
import AppButton from '../../../components/common/AppButton';
import { useLocation } from 'react-router-dom';
import PageContainer from '../../../components/common/PageContainer';
import { useDispatch } from 'react-redux';
import SearchNews from '../components/search/NewsSearch';
import { Form, Image, message, Popconfirm, Tooltip, UploadFile } from 'antd';
import { IInsertNews, INewsTable, ISearchNews } from '../interfaces/TypeNews';
import useRefresh from '../../../hooks/useRefresh';
import AppTable from '../../../components/common/AppTable';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, EyeOutlined, EyeTwoTone } from '@ant-design/icons';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import { addNews, deleteNews, detailNews, getListNews, updateNews } from '../api/news.api';
import { showNotification } from '../../../redux/reducers/notificationReducer';
import AppModal from '../../../components/common/AppModal';
import ModalNews from '../components/modal/modalNews';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // Import locale Nhật Bản
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('ja'); // Đặt locale là Nhật Bản
type Props = {}

const News: React.FC = () => {
  const { state } = useLocation();
  // const auth = state.authority;
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState("add");
  const [titleModal, setTitleModal] = useState(" ");
  const [form] = Form.useForm<ISearchNews>();
  const [formModal] = Form.useForm<IInsertNews>();
  const [refresh, refecth] = useRefresh();
  const [dataTable, setDataTable] = useState<INewsTable[] | []>([]);
  const [news, setNews] = useState<INewsTable>();
  const [newsCode, setNewsCode] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [newsType, setNewsType] = useState<{ id: string; name: string } | null>(null);


  const showModalAdd = () => {
    setIsModalOpen(true);
    setModalType("add");
    setTitleModal("Add new news");
  };

  const showModalDetail = async (_id: any) => {
    try {
      dispatch(startLoading())
      const rp = await detailNews(_id)
      if (rp.status) {
        setNews(rp.result);
        setIsModalOpen(true);
        setModalType("detail");
        setTitleModal("Detail news");
        setThumbnailUrl(rp.result.thumbnail);
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
      const rp = await detailNews(_id)
      if (rp.status) {
        setNews(rp.result);
        setIsModalOpen(true);
        setModalType("edit");
        setTitleModal("Edit news");
        setThumbnailUrl(rp.result.thumbnail);
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(stopLoading())
    }
  };



  const [searchParams, setSearchParams] = useState<ISearchNews>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const onSearch = async (values: ISearchNews) => {
    setSearchParams({
      ...searchParams,
      title: values.title && values.title !== "" ? values.title : undefined,
      typeCode: values.typeCode && values.typeCode !== "" ? values.typeCode : undefined,
      date: values.date && values.date !== "" ? values.date : undefined,

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
  // const [dataTable, setDataTable] = useState<ITableNews[] | []>([]);

  const columnTable: ColumnsType<INewsTable> = [
    { title: "#", dataIndex: "index", key: "index", },

    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,
      width:400,

    },
    {
      title: "thumbnail", dataIndex: "thumbnail", key: "thumbnail",
      render: (text: string) => <Image width={100} src={text}  />,
      width:100,
    },
    { title: "Type", dataIndex: "typeCode", key: "typeCode" },
    { title: "upLoadDate", dataIndex: "upLoadDate", key: "upLoadDate" },
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
      const response = await getListNews(payload);
      if (response.status) {
        console.log(response)
        const updatedData: any = response.result.data.map(
          (item: any, i: any) => ({
            ...item,
            index: i + 1 + (searchParams.page ?? 0) * (searchParams.size ?? 0),

          })
        );

        setDataTable(updatedData);
        setNewsCode(updatedData.map((item: INewsTable) => item.typeCode));
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



  const formatJapaneseDate = (value: dayjs.Dayjs | null) => {
    if (!value) return '';
    const dayOfWeek = value.format('dd'); // (水)
    const formattedDate = value.format('MM月DD日'); // 10月3日
    const time = value.format('HH時mm分'); // 0時30分
    const isLateNight = value.hour() < 5 ? '深夜' : ''; // Để xác định 深夜
    return `${formattedDate}(${dayOfWeek}) ${isLateNight}${time}`;
  };

  const handleOk = async (values:IInsertNews) => {
 
    let payload = {
      ...values,
      upLoadDate: formatJapaneseDate(values.upLoadDate),
      
    }
    
    try {
      dispatch(startLoading());
      if (titleModal === "Add new news" && modalType === "add") {
        await addNews(payload).then((response) => {
          if (response.status) {
            message.success("Add successful!");
            refecth();
            handleCancel();
          }
        });
      }

      if (titleModal === "Edit news" && modalType === "edit") {
        await updateNews(payload, news?._id).then((response) => {
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
      await deleteNews(_id).then(response => {
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
    setNewsType(null);
    setThumbnailUrl("");
    setFileList([]);
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


  const deleteDataSearch = () => {
    form.resetFields();
    form.submit();
  };
  return (
    <div>
      <PageContainer title="News" extra={extraButton()}>
        <div className="tablePanel">
          <SearchNews
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
            titleTable="News list"
            total={pagination.total}
            columns={columnTable as ColumnsType<any>}
            data={dataTable}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
            }}
          // onChange={handleTableChange}
          />
        </div>


        <AppModal width={"80%"} isOpen={isModalOpen} title={titleModal} onClose={handleCancel}
          onSubmit={() => formModal.submit()} typeOpenModal={modalType}>
          <ModalNews
            onSubmit={handleOk}
            title={titleModal}
            form={formModal}
            news={news}
            modalType={modalType}
            newsCode={newsCode}
            newsType={newsType}
            setNewsType={setNewsType}
            thumbnailUrl={thumbnailUrl }
            setThumbnailUrl={setThumbnailUrl}
            fileList={fileList}
            setFileList={setFileList}
          />
        </AppModal>
      </PageContainer>
    </div>
  )
}

export default News