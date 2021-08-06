import React, { useState, useEffect } from "react";
import { Modal, Button, Checkbox } from "antd";
import userApi from "../../../api/userApi";

export const RoleAssign = ({ id, role }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const plainOptions = [];

  for (var i in role) {
    plainOptions.push(role[i].name);
  }
  const showModal = () => {
    setIsModalVisible(true);
  };
  const CheckboxGroup = Checkbox.Group;

  useEffect(() => {
    let loading = true;
    const getRole = async () => {
      if (loading === true && isModalVisible === true) {
        var response = await userApi.getRole(id);
        setCheckedList(response);
      }
    };
    getRole();
    return () => (loading = false);
  }, [isModalVisible,id]);

  const [checkedList, setCheckedList] = useState();
  const onChange = (list) => {
    setCheckedList(list);
  };

  const save = async() => {
    var result=await userApi.roleAssign(checkedList)
  }
  return (
    <div>
      <Button onClick={showModal}>Click</Button>
      <Modal
        title="RoleAssign"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={save}
      >
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </Modal>
    </div>
  );
};
