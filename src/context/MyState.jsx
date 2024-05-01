import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  //Get all Products state
  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductfn = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
          setGetAllProduct(productArray);
          setLoading(false);
        });
        return () => data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Order State
  const [getAllOrder, setGetAllOrder] = useState([]);

  /**========================================================================
   *========================================================================**/

  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "order"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Delete oder Function
  const orderDelete = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.success("Order Deleted successfully");
      getAllOrderFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // user State
  const [getAllUser, setGetAllUser] = useState([]);
  /**========================================================================
   *========================================================================**/

  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "users"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductfn();
    getAllOrderFunction();
    getAllUserFunction();
  }, []);
  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductfn,
        getAllOrder,
        orderDelete,
        getAllUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
