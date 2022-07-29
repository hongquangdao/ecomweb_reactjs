import React, { useEffect, useState } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editProduct, updateProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInstock, setCountInstock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state => state.productEdit));
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state => state.productUpdate));
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  console.log(product);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInstock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      description,
      image,
      countInstock,
    }))
  }

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-brown text-white">
              Trở về sản phẩm
            </Link>
            <h2 className="content-title">Cập nhật</h2>
            <div>
              <button type="submit" className="btn btn-brown">
                Áp dụng
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {
                    error && <Message variant="alert-danger">{error}</Message>
                  }
                  {
                    loading && <Loading />
                  }
                  {
                    loadingUpdate ? <Loading /> : error ? <Message variant="alert-danger">{error}</Message> : (
                      <>
                        <div className="mb-4">
                          <label htmlFor="product_title" className="form-label">
                            Product name
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_title"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Giá
                          </label>
                          <input
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Số lượng trong kho
                          </label>
                          <input
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_price"
                            required
                            value={countInstock}
                            onChange={(e) => setCountInstock(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Miêu tả</label>
                          <textarea
                            placeholder="Type here"
                            className="form-control"
                            rows="7"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Hình ảnh</label>
                          <input
                            className="form-control"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
