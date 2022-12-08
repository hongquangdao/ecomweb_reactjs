import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";
import 'moment/locale/vi';


const LatestOrder = (props) => {
  const { orders, loading, error } = props
  console.log(orders);

  return (
    <div className="card-body">
      <h4 className="card-title">New orders</h4>
      {
        loading ? <Loading /> : error ? <Message variant="alert-danger">{error}</Message>
          :
          (
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  {
                    orders.slice(0, 5).map((order) => (
                      <tr key={order._id}>
                        <td>
                          <b>User</b>
                        </td>
                        <td>{order.user.email}</td>
                        <td>VND {order.totalPrice}</td>
                        <td>
                          {
                            order.isPaid ? (
                              <span className="badge rounded-pill alert-success">
                                {moment(order.paidAt).locale('vi').format("MM Do YYYY")}
                              </span>
                            ):
                            (
                              <span className="badge rounded-pill alert-danger">
                                Not Paid
                            </span>
                            )
                          }
                        </td>
                        <td>{moment(order.createdAt).locale('vi').calendar()}</td>
                        <td className="d-flex justify-content-end align-item-center">
                          <Link to={`/order/${order._id}`} className="text-success">
                            <i className="fas fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
      }

    </div>
  );
};

export default LatestOrder;
