import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MyContext from "../../context/MyContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Loader } from "lucide-react";

const Signup = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const [userSignup, setUserSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  const signUpFn = async () => {
    if (
      userSignup.firstName === "" ||
      userSignup.lastName === "" ||
      userSignup.email === "" ||
      userSignup.password === "" ||
      userSignup.role === ""
    ) {
      return toast.error("All fields must be provided");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // Create User object
      const user = {
        firstname: userSignup.firstName,
        lastname: userSignup.lastName,
        email: userSignup.email,
        uid: userCredential.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // Create User Reference
      const userReference = collection(fireDB, "users");

      // Add user Detail
      await addDoc(userReference, user);

      setUserSignup({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      toast.success("Signup successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      // if (error.code === "auth/email-already-in-use") {
      //   toast.error(
      //     "The email address is already in use. Please use a different email."
      //   );
      // } else {
      //   toast.error("Error signing up. Please try again later.");
      // }
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    signUpFn(); // Call the signUpFn function
  };

  return (
    <section className="text-center">
      {/* Loader Component */}

      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
          height: "50px",
        }}
      ></div>

      <div
        className="card mx-4 mx-md-5 shadow-5-strong"
        style={{
          marginTop: "-50px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              {loading && <Loader />}
              <form onSubmit={handleSubmit}>
                {/* Added onSubmit handler */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="firstname"
                        value={userSignup.firstName}
                        onChange={(e) =>
                          setUserSignup({
                            ...userSignup,
                            firstName: e.target.value,
                          })
                        }
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="firstname">
                        First name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="lastname"
                        value={userSignup.lastName}
                        onChange={(e) =>
                          setUserSignup({
                            ...userSignup,
                            lastName: e.target.value,
                          })
                        }
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="lastname">
                        Last name
                      </label>
                    </div>
                  </div>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={userSignup.email}
                    onChange={(e) =>
                      setUserSignup({
                        ...userSignup,
                        email: e.target.value,
                      })
                    }
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={userSignup.password}
                    onChange={(e) =>
                      setUserSignup({
                        ...userSignup,
                        password: e.target.value,
                      })
                    }
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <button
                  onClick={signUpFn}
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign up
                </button>
                <div className="text-center">
                  <p>Already have an account:</p> <br />
                  <Link to="/login" className="bg-red-800 p-1">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
