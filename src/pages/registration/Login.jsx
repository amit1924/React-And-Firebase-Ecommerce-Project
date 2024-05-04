import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginData.email === "" || loginData.password === "") {
      return toast.error("Please provide both email and password.");
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      console.log(users);
      const q = query(
        collection(fireDB, "users"),
        where("uid", "==", users?.user.uid)
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let user;
        QuerySnapshot.forEach((doc) => {
          user = doc.data();
          localStorage.setItem("users", JSON.stringify(user));
          setLoginData({
            email: "",
            password: "",
          });
          toast.success("Login successful");
          setLoading(false);
          if (user.role === "user") {
            console.log("Navigating to dashboard");
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
      });
      return () => data();
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleLogin(); // Call the handleLogin function
  };

  return (
    <section className="text-center text-lg-start">
      {/* Loader Component */}
      {loading && <Loader />}
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="Trendy Pants and Shoes"
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example1"
                    className="form-control"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                  <label className="form-label" htmlFor="form2Example1">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example2"
                    className="form-control"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                  <label className="form-label" htmlFor="form2Example2">
                    Password
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>
                <div>
                  <div>
                    {/* Simple link */}
                    <p className="text-orange-500 ">Don't have an Account !</p>
                    <br />
                    <Link to="/signup" className="bg-red-800 p-1  ">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
