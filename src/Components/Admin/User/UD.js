import React, { useState } from "react";
import { Button, Table, Input, InputNumber, Form,notification } from "antd";
import {RoleAssign} from "./RoleAssign"

import userApi from "../../../api/userApi";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({ Data,role,roleuser }) => {
  const [form] = Form.useForm();
  const [editingid, setEditingid] = useState("");

  const isEditing = (record) => record.id === editingid;
  const edit = (record) => {
    form.setFieldsValue({
      firstName: "",
      lastName: "",
      email: "",
      Dob: "",
      phoneNumber: 0,
      ...record,
    });
    setEditingid(record.id);
  };
  const cancel = () => {
    setEditingid("");
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      await userApi
        .update({
          userId: localStorage.getItem("Id"),
          id: id,
          dob: row.dob,
          email: row.email,
          firstname: row.firstName,
          lastname: row.lastName,
          phone: row.phoneNumber,
        })
        .then(() => {
          setEditingid("");
          openNotificationWithIcon("success", "Update thành Công");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const openNotificationWithIcon = (type, mes) => {
    notification[type]({
      message: "Notification Title",
      description: mes,
    });
  };
  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
      editable: true,
      width: "15%",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
      editable: true,
      width: "15%",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      editable: true,
      width: "10%",
    },
    {
      title: "dob",
      dataIndex: "dob",
      key: "dob",
      editable: true,
      width: "10%",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      editable: true,
      width: "20%",
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "28%",
      colspan: 2,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button
              onClick={() => save(record.id)}
              type="primary"
              danger
              shape="round"
            >
              Save
            </Button>
            <Button type="primary" danger shape="round" onClick={cancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            disabled={editingid !== ""}
            type="primary"
            shape="round"
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "RoleAssign",
      render: (_, record) => (
         <RoleAssign roleuser={roleuser} id={record.id} role={role}/>
      )
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowKey="uid"
        dataSource={Data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default EditableTable;
