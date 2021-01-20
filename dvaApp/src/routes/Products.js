import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = (props) => {
    const { dispatch, products,getData } = props
    console.log(props);
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <button onClick={getData}>search</button>
      <ProductList onDelete={handleDelete} products={products.data} />
    </div>
  );
};

// export default Products;
export default connect(
    // ({ products }) => ({
    //     products,
    // }),
    ({products})=> ({products}),
    {
        getData:payload=>({type:'products/getProductData'})
    }
)(Products);