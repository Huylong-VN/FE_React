import React, { useState, useEffect } from "react";
import {Pagination} from "antd"
import { Link } from "react-router-dom";
import productApi from "../api/productApi";
import Search from "../Components/Search";

const Manage_product = () => {
  const [productList, setproductList] = useState([]);

  const [pagination, setpagination] = useState();

  const [filters, setfilters] = useState({
    pageIndex: 1,
    pageSize: 6,
    keyword: "",
  });
  const handlePageChange = (newPage) => {
    setfilters({
      ...filters,
      pageIndex: newPage,
    });
  };

  useEffect(() => {
    const featchApi = async () => {
      try {
        const response = await productApi.getAll(filters);
        setproductList(response.items);
        setpagination({
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalRows: response.toTalRecords,
        });
      } catch (error) {
        console.log("lỗi" + error);
      }
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
    <div className="container-fluid">

      <h1 className="mt-4">Danh sách sản phẩm</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="breadcrumb-item active">Danh sách sản phẩm</li>
      </ol>
      <div className="card mb-12">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <button className="btn btn-success">Tạo mới</button>
            </div>
            <div className="col-md-6 col-xs-12">
              <Search onSubmit={handleFiltersChange} />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Mã SP</th>
                  <th>Tên</th>
                  <th>Giá bán</th>
                  <th>Mô Tả</th>
                  <th>Ảnh</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <img
                        alt={product.name}
                        style={{ height: 100, width: 100 }}
                        src={
                          "http://huylong37-001-site1.btempurl.com/user-content/" + product.image
                        }
                      />
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
          current={pagination.pageIndex}
          defaultPageSize={5}
          onChange={(page, pageSize) => handlePageChange(page, pageSize)}
          total={pagination.totalRows}
          showSizeChanger
          pageSizeOptions={[5, 10, 20]}
        />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage_product;
