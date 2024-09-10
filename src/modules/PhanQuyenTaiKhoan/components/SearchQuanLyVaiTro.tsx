import { Form, FormInstance } from "antd";
import { ISearchQlVaiTro } from "../interfaces/qlVaiTro.interface";
import AppInput from "../../../components/common/AppInput";
import AppSelected from "../../../components/common/AppSelected";

type Props = {
  form: FormInstance<ISearchQlVaiTro>;
  onSearch: (values: ISearchQlVaiTro) => Promise<void>;
};
const SearchQuanLyVaiTro: React.FC<Props> = ({
  form,
  onSearch,
}) => {
  const initialValues = {
    active: "",
    isDefaultRole: "",
  };
  return (
    <div className="search_qldm">
      <Form
        form={form}
        layout="vertical"
        name="QlBoTieuChi"
        onFinish={onSearch}
        autoComplete="off"
        initialValues={initialValues}
      >
        <div className="search_form_container">
          <Form.Item label="Mã vai trò" name="code">
            <AppInput placeholder="Nhập mã vai trò" />
          </Form.Item>
          <Form.Item label="Tên vai trò" name="name">
            <AppInput placeholder="Nhập tên vai trò" />
          </Form.Item>
          <Form.Item label="Trạng thái" name="active" >
            <AppSelected
              placeholder="Chọn trạng thái hiệu lực"
              options={[
                { value: "", label: "Tất cả" },
                { value: "0", label: "Không hoạt động" },
                { value: "1", label: "Đang hoạt động" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Vai trò mặc định" name="isDefaultRole">
            {/* <AppCheckbox title="Vai trò mặc định" layout="horizontal" /> */}
            <AppSelected
              placeholder="Chọn trạng thái"
              options={[
                { value: "", label: "Tất cả" },
                { value: "0", label: "Không phải mặc định" },
                { value: "1", label: "Vai trò mặc định" },
              ]}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default SearchQuanLyVaiTro;
