import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS } from "../../Redux/Constants/ProductConstants";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInstock, setCountInstock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state => state.productCreate));
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET })
      setName("");
      setPrice(0);
      setImage("");
      setCountInstock(0);
      setDescription("");
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, price, description, image, countInstock));
  }

  const handleImage = (e) => {
    const file = e.target.files[0]; 
    file.imgsrc = URL.createObjectURL(file);
    setImage(file.imgsrc)
  }

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-brown text-white">
              Đi tới sản phẩm
            </Link>
            <h2 className="content-title">Thêm sản phẩm</h2>
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
                  {error && (<Message variant="alert-danger">{error}</Message>)}
                  {
                    loading && (<Loading />)
                  }
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Tên sản phẩm
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
                    <label className="form-label">Ảnh</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3"
                      type="file"
                      onChange={handleImage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
