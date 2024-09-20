import { Modal } from "antd";
import React, { ReactNode } from "react";
import AppButton from "../AppButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string | number;
  width?: number | string;
  children?: ReactNode;
  typeOpenModal?: string;
  textBtnSubmit?: string;
};
const AppModal: React.FC<Props & React.ComponentProps<typeof Modal>> = ({
  isOpen,
  onClose,
  onSubmit,
  width,
  title,
  typeOpenModal,
  textBtnSubmit,
  children,
}) => {
  return (
    <Modal
      title={
        <div
          style={{
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: 18,
            color: "#173770",
          }}
        >
          {title}
        </div>
      }
      width={width}
      open={isOpen}
      onOk={onSubmit}
      onCancel={onClose}
      footer={null}
    >
      <div className="modal_container">{children}</div>
      {typeOpenModal === "detail" ? (
        <div className="btn_search_qldm">
          <AppButton
            className="default_btn_refresh"
            title="Close"
            onClick={() => onClose()}
          />
        </div>
      ) : (
        <div className="btn_search_qldm">
          <AppButton
            className="default_btn_search"
            title={textBtnSubmit ? textBtnSubmit : "OK"}
            onClick={() => onSubmit()}
          />
          <AppButton
            className="default_btn_refresh"
            title="Cancel"
            onClick={() => onClose()}
          />
        </div>
      )}
    </Modal>
  );
};
export default AppModal;
