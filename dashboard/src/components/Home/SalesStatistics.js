import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "500px"
            }}
            title="product"
            src="https://charts.mongodb.com/charts-ecom_web-lhzik/embed/charts?id=639051f8-0371-4804-817f-5fa551e58a06&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
          <iframe
            title="user"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              height: "500px",
              width: "100%"
            }}
            src="https://charts.mongodb.com/charts-ecom_web-lhzik/embed/charts?id=6390f72d-c44a-4fea-864d-3957219be19d&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
