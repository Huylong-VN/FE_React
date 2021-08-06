import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";
import { Pagination } from "antd";
import Create from "../Components/Admin/User/Create";
import Search from "../Components/Search";
import UD from "../Components/Admin/User/UD";
import roleApi from "../api/roleApi"
const Manage_users = () => {
  //state
  var [pagination, setpagination] = useState({
    pageIndex: 1,
  });
  var [filters, setfilters] = useState({
    pageIndex: 1,
    pageSize: 6,
    keyword: "",
  });
  const handlePageChange = (page, pageSize) => {
    setfilters({
      ...filters,
      pageIndex: page,
      pageSize: pageSize,
    });
  };
  const [data, setData] = useState([]);
  const [role,setrole] = useState();
  useEffect(() => {
    let mounted = true;
    const featchApi = async () => {
      if (mounted === true) {
        const response = await userApi.getAll(filters);
        const role=await roleApi.getAll();
        setrole(role);
        setData(response.items);
        setpagination({
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalRows: response.toTalRecords,
        });
      }
      return () => (mounted = false);
    };
    featchApi();
  }, [filters]);
  const handleFiltersChange = (newFilters) => {
    setfilters({
      ...filters,
      keyword: newFilters,
    });
  };

  return (
    <>
      <Create />
      <Search onSubmit={handleFiltersChange} />
      <UD role={role} Data={data} />
      <Pagination
        current={pagination.pageIndex}
        defaultPageSize={6}
        onChange={(page, pageSize) => handlePageChange(page, pageSize)}
        total={pagination.totalRows}
        showSizeChanger
        pageSizeOptions={[6, 10, 20, 30]}
      />
      ;
    </>
  );
};

export default Manage_users;
