import React, { useState } from 'react'
import AppButton from '../../../components/common/AppButton';
import { useLocation } from 'react-router-dom';
import PageContainer from '../../../components/common/PageContainer';
import { useDispatch } from 'react-redux';
import SearchNews from '../components/search/NewsSearch';
import { Form, Popconfirm, Tooltip } from 'antd';
import { ISearchNews, ITable } from '../interfaces/TypeNews';
import useRefresh from '../../../hooks/useRefresh';
import AppTable from '../../../components/common/AppTable';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, EyeOutlined, EyeTwoTone } from '@ant-design/icons';

type Props = {}

const News: React.FC = () => {
  const { state } = useLocation();
  // const auth = state.authority;
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState("add");
  let titleModal = ""
  const [form] = Form.useForm<ISearchNews>();

  const [refresh, refecth] = useRefresh();

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

  const columnTable: ColumnsType<ITable> = [
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

    { title: "type_number", dataIndex: "type_number", key: "type_number" },
    { title: "date", dataIndex: "date", key: "date" },
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

  const dataTable: ITable[] = [
    {
      
      index: "1",
      title: "日本の経済状況",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3QkN5o0vBDAD_5iJjRfPRIHOVgXVbdQSnEw&s",
      type_number: "101",
      date: "2024-08-09",
    },
    {
      index: "2",
      title: "東京オリンピックの結果",
      thumbnail: "https://example.com/thumbnail2.jpg",
      type_number: "102",
      date: "2024-08-10",
    },
    {
      index: "3",
      title: "新型ウイルスの影響",
      thumbnail: "https://example.com/thumbnail3.jpg",
      type_number: "103",
      date: "2024-08-11",
    },
    {
      index: "4",
      title: "新しい技術の進展",
      thumbnail: "https://example.com/thumbnail4.jpg",
      type_number: "104",
      date: "2024-08-12",
    },
    {
      index: "5",
      title: "芸能ニュース最新情報",
      thumbnail: "https://example.com/thumbnail5.jpg",
      type_number: "105",
      date: "2024-08-13",
    },
  ];
  

  const extraButton = () => {
    return (
      <div className="page_container_header_extra">

        <AppButton className="default_btn_refresh" title="輸入" />
        <AppButton
          className="default_btn_add"
          // onClick={showModalAdd}
          title="作成する"
        />
        <AppButton className="default_btn_refresh" title="輸出" />


      </div>
    );
  };
  if (modalType === "add") {
    titleModal = "Add News"
  } else if (modalType === "edit") {
    titleModal = "Edit News"
  } else if (modalType === "detail") {
    titleModal = "Detail News"
  }

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


        {/* <AppModal width={"80%"} isOpen={isModalOpen} title={titleModal} onClose={handleCancel}
          onSubmit={() => formModal.submit()} typeOpenModal={modalType}>
          <ModalHangHoa
            onSubmit={handleOk}
            title={titleModal}
            form={formModal}
            product={product}
            productCodes={productCodes}
          />
        </AppModal> */}
      </PageContainer>
    </div>
  )
}

export default News