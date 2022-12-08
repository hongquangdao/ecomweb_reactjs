import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useSelector } from "react-redux";

const Main = () => {
  const orderList = useSelector((state) => state.orderListReducer);
  const { orders, loading, error } = orderList;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={products}/>

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} products={products} loading={loading} error={error}/>
        </div>
      </section>
    </>
  );
};

export default Main;
