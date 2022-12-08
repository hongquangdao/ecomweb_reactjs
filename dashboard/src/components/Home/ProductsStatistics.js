import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          <iframe
            title="product"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "500px"
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-ecom_web-lhzik/embed/charts?id=639055cb-0147-4249-881d-9589e0cb276a&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
          <iframe
            title="product"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "500px"
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-ecom_web-lhzik/embed/charts?id=639055cb-0147-4249-881d-9589e0cb276a&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
