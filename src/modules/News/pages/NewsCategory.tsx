import React, { useState } from 'react'
import AppButton from '../../../components/common/AppButton';
import { useLocation } from 'react-router-dom';
import { startLoading, stopLoading } from '../../../redux/reducers/loadingReducer';
import { IAddNewsCategory, ITable } from '../interfaces/TypeNewsCategory';
import { useDispatch } from 'react-redux';
import { Form } from 'antd';

type Props = {}

const NewsCategory: React.FC = () => {
  const { state } = useLocation();
  const auth = state.authority;
  const dispatch = useDispatch();
  const [formModal] = Form.useForm<IAddNewsCategory>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const showModalAdd = () => {
    setIsModalOpen(true);
    setModalType("add");
};

const showModalEdit = async (id: number) => {
  try {
      dispatch(startLoading())
      // const rp = await detailProduct(id)
      // if (rp.status) {
      //     setProduct(rp.result);
      //     setIsModalOpen(true);
      //     setModalType("edit");
      // }
      setIsModalOpen(true);
      setModalType("edit");
  } catch (e) {
      console.error(e);
  } finally {
      dispatch(stopLoading())
  }
};

const [dataTable, setDataTable] = useState<ITable[] | []>([]);

  const extraButton = () => {
    return (
      <div className="page_container_header_extra">

        <AppButton className="default_btn_refresh" title="Import" />
        <AppButton
          className="default_btn_add"
          onClick={showModalAdd}
          title="Thêm mới"
        />
        <AppButton className="default_btn_refresh" title="export" />


      </div>
    );
  };

  return (
    <div>NewsCategory</div>
  )
}

export default NewsCategory