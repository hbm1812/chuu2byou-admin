import { Form, FormInstance } from "antd";
import { IFormQlVaiTro, IPrivilege } from "../interfaces/qlVaiTro.interface";
import AppInput from "../../../components/common/AppInput";
import AppSelected from "../../../components/common/AppSelected";
import { useEffect, useState } from "react";
import { getListPrivilegeRole } from "../api/role.api";
import TreePhanQuyenVaiTro from "../../../components/common/TreePhanQuyenVaiTro";
import { IPrivileges } from "../interfaces";
import { ACTION } from "../../../constants";
import useCreateRole from "../hooks/useCreateRole";
import useUpdateRole from "../hooks/useUpdateRole";

type Props = {
  //   onSubmit: (values: IFormQlVaiTro) => void;
  title: string;
  form: FormInstance<IFormQlVaiTro>;
  isActionDisabled: boolean;
  setIsActionDisabled: (isActionDisabled: boolean) => void;
  dataDetail?: IFormQlVaiTro;
  refecth?: any;
  handleCancelAdd?: any;
  typeOpenModal?: string;
};
const FormQuanLyVaiTro = (props: Props) => {
  //! state
  const {
    title,
    form,
    isActionDisabled,
    setIsActionDisabled,
    dataDetail,
    refecth,
    handleCancelAdd,
    typeOpenModal,
  } = props;
  const [privilege, setPrivilege] = useState<IPrivilege[]>([]);
  const [dictOps, setDictOps] = useState<any>({});
  const [dictRead, setDictRead] = useState<any>({});
  const specialForm = title !== "Thêm mới vai trò" ? "none" : "spec";
  const initialValuesAdd = {
    active: "0",
    isDefaultRole: "1",
  };
  const readActionList: any[] = [];
  const opsActionList: any[] = [];
  const allActionList: any[] = [];
  const expandKeyList: any = [];

  const { createRole } = useCreateRole();
  const { updateRole } = useUpdateRole();

  // useEffect(() => {
  //     const get = async () => {
  //         try {
  //             const rp = await getListPrivilegeRole();
  //             setPrivilege(rp);
  //         } catch (e) {
  //             console.error(e);
  //         }
  //     };
  //     get();
  // }, []);

  //! function
  const handlePrivilegeCodeChange = (value: unknown) => {
    const selectedValue = value as string;
    form.setFieldsValue({ privileges: [{ privilegeCode: selectedValue }] });
    setIsActionDisabled(!selectedValue);
  };

  const onSuccessCreate = () => {
    refecth(), handleCancelAdd();
    setDictOps([]);
    setDictRead([]);
    readActionList.push([]);
    opsActionList.push([]);
  };

  const handleSubmit = (values: { code?: string; name?: string }) => {
    const privileges: IPrivileges[] = [];
    Object.keys(dictRead).forEach((key: string) => {
      if (dictRead[key] === true) {
        if (!opsActionList.includes(key)) {
          privileges.push({ privilegeCode: key, action: "READ" });
        }
      }
    });
    Object.keys(dictOps).forEach((key: string) => {
      if (dictOps[key] === true) {
        if (!readActionList.includes(key)) {
          privileges.push({ privilegeCode: key, action: "OPS" });
        }
      }
    });

    const body = {
      code: values.code,
      name: values.name,
      privileges,
    };
    typeOpenModal === "add"
      ? createRole({
          body,
          onSuccess: () => onSuccessCreate(),
        })
      : updateRole({
          body,
          onSuccess: () => onSuccessCreate(),
          code: dataDetail && dataDetail.code,
        });
  };

  //! useEffect
  // Khi mở modal hoặc khi giá trị của privilegeCode thay đổi, thiết lập lại isActionDisabled
  useEffect(() => {
    const privilegeCodeValue = form.getFieldValue([
      "privileges",
      0,
      "privilegeCode",
    ]);
    setIsActionDisabled(
      !privilegeCodeValue || typeof privilegeCodeValue !== "string"
    );
  }, [form]);

  useEffect(() => {
    if (typeOpenModal === "edit" && dataDetail) {
      form.setFieldsValue({
        code: dataDetail?.code,
        name: dataDetail?.name,
        // active: dataDetail?.active,
        isDefaultRole: dataDetail?.isDefaultRole ? "1" : "0",
      });
    }
  }, [typeOpenModal, dataDetail, form]);

  //! render
  return (
    <div className="form_qlvt">
      <Form
        form={form}
        layout="vertical"
        name="QlBoTieuChi"
        onFinish={(values) => handleSubmit(values)}
        autoComplete="off"
        initialValues={initialValuesAdd}
      >
        {typeOpenModal !== "detail" && (
          <div className={"modal_form_container"}>
            <Form.Item
              label="Mã vai trò"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập mã vai trò" },

                {
                  pattern: /^[a-zA-Z0-9_-]+$/,
                  message:
                    "Mã vai trò chỉ được chứa chữ không dấu, số, dấu gạch dưới (_) và dấu gạch ngang (-)",
                },
              ]}
            >
              <AppInput
                placeholder="Nhập mã vai trò"
                disabled={typeOpenModal === "edit"}
                maxLength={50}
                onChange={(text) =>
                  form.setFieldValue("code", text.target.value.toUpperCase())
                }
              />
            </Form.Item>
            <Form.Item
              label="Tên vai trò"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}
            >
              <AppInput placeholder="Nhập tên vai trò" />
            </Form.Item>
          </div>
        )}
        <TreePhanQuyenVaiTro
          dictOps={dictOps}
          setDictOps={setDictOps}
          dictRead={dictRead}
          setDictRead={setDictRead}
          readActionList={readActionList}
          opsActionList={opsActionList}
          allActionList={allActionList}
          expandKeyList={expandKeyList}
          dataRoleDetail={dataDetail}
          typeOpenModal={typeOpenModal}
        />
      </Form>
    </div>
  );
};
export default FormQuanLyVaiTro;
