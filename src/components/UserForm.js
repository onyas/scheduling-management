// src/components/UserForm.js
import React from 'react';

import {
  Button,
  Col,
  Form,
  Input,
  Row,
} from 'antd';

const UserForm = ({ onAddUser }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { name } = values;
    onAddUser({ name });
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="horizontal">
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 'auto', marginRight: 0 }}>
              添加用户
            </Button>
          </Form.Item>
        </Col>
      </Row>
      </Form>
  );
};

export default UserForm;