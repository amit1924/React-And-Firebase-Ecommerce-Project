import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

// productData

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const { getAllProduct, loading } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Add to cart Function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  // Delete from cart Function
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <style>
          {`
            @keyframes blink {
              0% { opacity: 1; }
              50% { opacity: 0; }
              100% { opacity: 1; }
            }

            .gradient-text {
              background-image: linear-gradient(to right, #ff8a00, #e52e71);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              animation: blink 3s infinite;
            }
          `}
        </style>
        <h1 className="text-center mb-5 text-2xl font-semibold animate-blink gradient-text">
          Bestselling Products
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex justify-center">{loading && <Loader />}</div>

          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 16).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      onClick={() => navigate(`/productInfo/${id}`)}
                      className="lg:h-80  h-96 w-full"
                      src={productImageUrl}
                      alt="img"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        E-kart
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price}
                      </h1>

                      <div className="flex justify-center">
                        {cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="bg-green-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Delete From Cart
                          </button>
                        ) : (
                          <button
                            className="bg-green-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                            onClick={() => addCart(item)}
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
