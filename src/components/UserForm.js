// src/components/UserForm.js
import React from 'react';

import {
  Button,
  Form,
  Input,
} from 'antd';

const UserForm = ({ onAddUser }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { name } = values;
    onAddUser({ name });
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;