import React, { useEffect, useState } from 'react'
import AppButton from '../../../components/common/AppButton';
import { useLocation } from 'react-router-dom';
import PageContainer from '../../../components/common/PageContainer';
import { useDispatch } from 'react-redux';
import SearchNews from '../components/search/NewsSearch';
import { Form, message, Popconfirm, Tooltip } from 'antd';
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


  const showModalAdd = () => {
    setIsModalOpen(true);
    setModalType("add");
    setTitleModal("新しいニュースを作成する");
};

  const showModalDetail = async (_id: any) => {
    try {
        dispatch(startLoading())
        const rp = await detailNews(_id)
        if (rp.status) {
            setNews(rp.result);
            setIsModalOpen(true);
            setModalType("detail");
            setTitleModal("ニュースの詳細");
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
          setTitleModal("ニュースを編集する");
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
      type_number: values.type_number && values.type_number !== "" ? values.type_number : undefined,
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
    { title: "index", dataIndex: "index", key: "index", },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,

    },
    { title: "thumbnail", dataIndex: "thumbnail", key: "thumbnail", 
      render: (text: string) => <div style={{ width:70, height:50 }} ><img style={{ width:"200%", height:"100%" }} src={text} alt=""  /> </div>,
    },
    { title: "newsCode", dataIndex: "newsCode", key: "newsCode" },
    { title: "typeCode", dataIndex: "typeCode", key: "typeCode" },
    { title: "upLoadDate", dataIndex: "upLoadDate", key: "upLoadDate" },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, record: any) => (
        <div style={{ textAlign: "center" }}>
          <Tooltip title="詳細を見る">

            <EyeOutlined className="icon_action_table detail"
              onClick={() => showModalDetail(record._id)}
              />
          </Tooltip>
          <Tooltip title="編集する">
            <EditOutlined
             className="icon_action_table edit"
            onClick={() => showModalEdit(record._id)}
            />
          </Tooltip>
          <Tooltip title="削除する">
            <Popconfirm
              title="削除してもよろしいですか?"
              onConfirm={() => deleteVoid(record._id)}
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
}, [searchParams, refresh]);



const handleOk = async () => {
  try {
      dispatch(startLoading());
      const values = await formModal.validateFields();

      if (titleModal === "新しいニュースを作成する" && modalType === "add") {
          const insertBody: IInsertNews = { ...values };
          await addNews(insertBody).then((response) => {
              if (response.status) {
                  message.success("新規追加に成功しました!");
                  refecth();
                  handleCancel();
              }
          });
      }

      if (titleModal === "ニュースを編集する" && modalType === "edit") {

          const updateBody: INewsTable = { ...values };
          await updateNews(updateBody, news?._id).then((response) => {
              if (response.status) {
                  refecth();
                  handleCancel();
                  message.success("編集が完了しました!");
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
              dispatch(showNotification({ message: "削除に成功しました!", type: "success" }))
              refecth();
          } else {
              // thông báo lỗi
          }

      });

  } catch (error) {
      dispatch(
          showNotification({
              message: "削除に失敗しました!",
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


  const deleteDataSearch = () => {
    form.resetFields();
    form.submit();
  };
  return (
    <div>
      <PageContainer title="ニュース" extra={extraButton()}>
        <div className="tablePanel">
          <SearchNews
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
            titleTable="ニュースリスト"
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
          />
        </AppModal>
      </PageContainer>
    </div>
  )
}

export default News