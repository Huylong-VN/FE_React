import React, { useState, useEffect } from "react";
import { Modal, Button, Checkbox, notification } from "antd";
import userApi from "../../../api/userApi";

export const RoleAssign = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [roles, setroles] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    let loading = true;
    const getRole = async () => {
      if (loading === true && isModalVisible === true) {
        var response = await userApi.getRole(id);
        setroles(response.roles);
      }
    };
    getRole();
    return () => (loading = false);
  }, [isModalVisible, id]);

  const save = () => {
    roles.forEach((role) => {
      if (role.selected === true) {
        userApi.roleAssign({
          userId: id,
          userIdRole: localStorage.getItem("Id"),
          roles: [role],
        });
      }
    });
    setIsModalVisible(false);
    notification["success"]({
      message: "Assign Role Success",
      description: "Success! You",
    });
  };
  return (
    <div>
      <Button onClick={showModal}>Click</Button>
      <Modal
        title="RoleAssign"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={save}
      >
        {roles.map((roleValue, roleKey) => (
          <div key={roleKey}>
            <Checkbox
              onChange={(event) => {
                let checked = event.target.checked;
                setroles(
                  roles.map((data) => {
                    if (roleValue.id === data.id) {
                      data.selected = checked;
                    }
                    return data;
                  })
                );
              }}
              checked={roleValue.selected}
            >
              {roleValue.name}
            </Checkbox>
          </div>
        ))}
      </Modal>
    </div>
  );
};
