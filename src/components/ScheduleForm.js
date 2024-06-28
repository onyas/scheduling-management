import { Button, Col, Form, Row, Select } from "antd";

const { Option } = Select;

const ScheduleForm = ({ users, onScheduleAdded, selectedDate }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { period, name } = values;
    onScheduleAdded({
      type: "success",
      content: `${period}: ${name}`,
      date: selectedDate.format("YYYY-MM-DD"),
    });
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="horizontal">
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            name="period"
            label="值班时间"
            rules={[{ required: true, message: "请输入姓名!" }]}>
            <Select style={{ width: 70 }}>
              <Option value="上午">上午</Option>
              <Option value="下午">下午</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "请输入姓名!" }]}>
            <Select style={{ width: 70 }}>
              {users.map((user) => (
                <Option key={user.id} value={user.name}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "auto", marginRight: 0 }}>
              值班
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ScheduleForm;
