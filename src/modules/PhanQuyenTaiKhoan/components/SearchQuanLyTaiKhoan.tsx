import { Form, FormInstance } from "antd";
import AppInput from "../../../components/common/AppInput";
import AppSelected from "../../../components/common/AppSelected";
import {ISearchQlTaiKhoan} from "../interfaces/qlTaiKhoan.interface";


type Props = {
    form: FormInstance<ISearchQlTaiKhoan>;
    onSearch: (values: ISearchQlTaiKhoan) => Promise<void>;
};
const SearchQuanLyTaiKhoan: React.FC<Props> = ({
                                                   form,
                                                   onSearch,
                                               }) => {

    const initialValues = {
        active: "",
        // departmentId: 0,
        // isDefaultRole: "",
    };
    return (
        <div className="search_qldm">
            <Form
                form={form}
                layout="vertical"
                name="QuanLyTaiKhoan"
                onFinish={onSearch}
                autoComplete="off"
                initialValues={initialValues}
            >
                <div className="search_form_container">
                    <Form.Item label="Tên tài khoản" name="username">
                        <AppInput placeholder="Nhập mã vai trò"/>
                    </Form.Item>
                    <Form.Item label="Tên đầy đủ" name="fullName">
                        <AppInput placeholder="Nhập tên vai trò"/>
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="active">
                        <AppSelected
                            placeholder="Chọn trạng thái hiệu lực"
                            options={[
                                {value: "", label: "Tất cả"},
                                {value: 2, label: "Không hoạt động"},
                                {value: 1, label: "Đang hoạt động"},
                            ]}
                        />
                    </Form.Item>
                    {/*<Form.Item label="Vai trò mặc định" name="departmentId">*/}
                    {/*    /!* <AppCheckbox title="Vai trò mặc định" layout="horizontal" /> *!/*/}
                    {/*    <AppSelected*/}
                    {/*        placeholder="Chọn trạng thái"*/}
                    {/*        options={[*/}
                    {/*            {value: "", label: "Tất cả"},*/}
                    {/*            {value: "0", label: "Không phải mặc định"},*/}
                    {/*            {value: "1", label: "Vai trò mặc định"},*/}
                    {/*        ]}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}
                </div>
            </Form>
        </div>
    );
};
export default SearchQuanLyTaiKhoan;
