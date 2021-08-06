import React, { useState, useEffect } from "react";
import Item from "../Components/Client/Item";
import { Pagination, Row } from "antd";
import Search from "../Components/Search";
import productApi from "../api/productApi";
import Slide from "../Components/Client/Slide";

const Home = () => {
  var [productList, setproductList] = useState([]);

  var [pagination, setpagination] = useState({});

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

  useEffect(() => {
    let loading = true;
    const featchApi = async () => {
      if(loading===true){
        const response = await productApi.getAll(filters);
        setproductList(response.items);
        setpagination({
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalRows: response.toTalRecords,
        });
      }
    };
    featchApi();
    return ()=>(loading=false)
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setfilters({
      ...filters,
      keyword: newFilters,
    });
  };
  return (
    <div>
      <div className="container">
        {/* <Heading />
        <CallAction /> */}
        <br />
        <Slide />
        <Search onSubmit={handleFiltersChange} />
        <Item products={productList} />
        <Row justify="center">
          {" "}
          <Pagination
            current={pagination.pageIndex}
            defaultPageSize={6}
            onChange={(page, pageSize) => handlePageChange(page, pageSize)}
            total={pagination.totalRows}
            showSizeChanger
            pageSizeOptions={[6, 10, 20, 30]}
          />
        </Row>
      </div>
    </div>
  );
};

export default Home;
