import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card,Image } from "antd";
import {  Col, Row } from 'antd';


const Item = (props) => {
  const { products } = props;
  return (
    <Row gutter={[16,16]}>
     {products.map((product) => (
      <Col key={product.id} span={6} xs={12} sm={8} xxl={6}>
        <Card size="small" extra={<Link href="#">More</Link>} hoverable title={product.name}>
          <Image alt={product.name} className="product_image" src={"http://huylong37-001-site1.btempurl.com//user-content/"+product.image} />
          <Card.Meta description={product.description} />
        </Card>
      </Col>
     ))}
    </Row>
  );
};

Item.propTypes = {
  products: PropTypes.array,
};
Item.defaultProps = {
  products: [],
};

export default Item;
