import React from 'react';
// import PropTypes from 'prop-types';
import { Table } from 'antd';

const ProductList = ({ products }) => {
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    },{
      title: "年龄",
      dataIndex: "age",
      key: "age"
    }, {
      title: "住址",
      dataIndex: "city",
      key: "city"
    },{
      title: "住址",
      dataIndex: "city",
      key: "city"
    }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};



export default ProductList;