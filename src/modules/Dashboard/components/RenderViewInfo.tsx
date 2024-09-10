import { Checkbox, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import AppDatePicker from "../../../components/common/AppDatePicker";
import AppInput from "../../../components/common/AppInput";
import { formatCurrency, formatDateMonthYearQuo } from "../../../utils";
import { IOverview } from "../../BaoCaoThongKe/interfaces/TypeBaoCaoDoanhThu";

const RenderViewInfo = ({ overview }: { overview?: IOverview }) => {
  //! state
  const [form] = useForm<IOverview>();

  //! function

  //! useEffect
  useEffect(() => {
    if (overview) {
      form.setFieldsValue(overview);
      form.setFieldValue("signDate", formatDateMonthYearQuo(overview.signDate));
      form.setFieldValue(
        "timelineFrom",
        formatDateMonthYearQuo(overview.timelineFrom)
      );
      form.setFieldValue(
        "timelineTo",
        formatDateMonthYearQuo(overview.timelineTo)
      );
      form.setFieldValue(
        "contractValueVat",
        formatCurrency(overview.contractValueVat?.toString() || "")
      );
      form.setFieldValue(
        "contractValue",
        formatCurrency(overview.contractValue?.toString() || "")
      );
      form.setFieldValue(
        "contractValueAmount",
        formatCurrency(overview.contractValueAmount?.toString() || "")
      );
    }
  }, [overview]);

  //! render
  return (
    <Form form={form} layout="vertical">
      <div className="form_container_2">
        <Form.Item label="Chủ đầu tư" name="investorName">
          <AppInput readOnly />
        </Form.Item>
        <Form.Item label="Tên gói thầu" name="packageName">
          <AppInput readOnly />
        </Form.Item>
      </div>
      <div className="search_form_container">
        <Form.Item label="Mã hợp đồng" name="code">
          <AppInput readOnly />
        </Form.Item>
        <Form.Item label="Loại hợp đồng" name="contractTypeName">
          <AppInput readOnly />
        </Form.Item>
        <Form.Item label="Số hợp đồng" name="contractNumber">
          <AppInput placeholder="Nhập số hợp đồng" readOnly />
        </Form.Item>
        <Form.Item label="Ngày ký hợp đồng" name="signDate">
          <AppDatePicker readOnly />
        </Form.Item>
      </div>
      <div className="form_container_2">
        <Form.Item label="Tên dự án" name="projectName">
          <AppInput readOnly />
        </Form.Item>
        <div className="form_container_2">
          <Form.Item label="Tên viết tắt" name="projectShortname">
            <AppInput readOnly />
          </Form.Item>
          <Form.Item label="Mã dự án" name="projectCode">
            <AppInput readOnly />
          </Form.Item>
        </div>
      </div>
      <div className="search_form_container">
        <Form.Item label="Nhân viên triển khai" name="deploymentPersonnelName">
          <AppInput readOnly />
        </Form.Item>
        <div className="form_container_2">
          <Form.Item label="Thời gian TH" name="timelineFrom">
            <AppDatePicker readOnly />
          </Form.Item>
          <Form.Item label=" " name="timelineTo">
            <AppDatePicker readOnly />
          </Form.Item>
        </div>
        <Form.Item label="Giá trị hợp đồng trước VAT" name="contractValue">
          <AppInput readOnly />
        </Form.Item>
        <div className="form_container_row1_row2">
          <Form.Item label="VAT(%)" name="vat" style={{ marginRight: "8px" }}>
            <AppInput readOnly />
          </Form.Item>
          <Form.Item
            label="Giá trị hợp đồng sau VAT"
            name="contractValueVat"
            style={{ flex: 1 }}
          >
            <AppInput readOnly />
          </Form.Item>
        </div>
      </div>
      <div className="search_form_container">
        <div className="form_container_2">
          <Form.Item label=" " name="isJointVenture" valuePropName="checked">
            <Checkbox disabled>Liên danh</Checkbox>
          </Form.Item>
          <Form.Item label="Tỷ lệ % TECA" name="percentRate">
            <AppInput readOnly />
          </Form.Item>
        </div>
        <Form.Item label="Giá trị TECA thực hiện" name="contractValueAmount">
          <AppInput readOnly />
        </Form.Item>
      </div>
    </Form>
  );
};

export default RenderViewInfo;
