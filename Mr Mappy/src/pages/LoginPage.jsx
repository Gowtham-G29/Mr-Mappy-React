import { useState } from "react";
import { LoginApi } from "../services/Api";
import { storeUserData } from "../services/Storage";
import { isAuthenticated } from "../services/Auth";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function LoginPage() {
  const initilaState = {
    email: { required: false },
    password: { required: false },
    // name: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initilaState);
  //Loading spinner state
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //form validation
  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initilaState;
    let hasError = false;

    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }

    if (hasError != true) {
      //sending  Login api request
      setLoading(true);
      LoginApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.code == "ERR_BAD_REQUEST") {
            setErrors({
              ...errors,
              custom_error: "Invalid Credentials.",
            });
          }
          //   if (err.response.data.error.message == "EMAIL_EXISTS") {
          //     setErrors({
          //       ...errors,
          //       custom_error: "Already this email has been registered !",
          //     });
          //   } else if (
          //     String(err.response.data.error.message).includes("WEAK_PASSWORD")
          //   ) {
          //     setErrors({
          //       ...errors,
          //       custom_error: "Password should be atleast 6 characters !",
          //     });
          //   }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setErrors({ ...errors });
  };

  if (isAuthenticated()) {
    //redirecting user to dashboard
    return <Navigate to="/dashboard"/>;
  }

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <NavBar/>
      <section className="min-h-screen flex items-center justify-center bg-yellow-200">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center mb-6">Login Now</h2>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="email"
                    placeholder="email"
                    onChange={handleInput}
                  />
                  {errors.email.required ? (
                    <span className="text-red-500 text-sm">
                      Email is required.
                    </span>
                  ) : null}{" "}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="password"
                    placeholder="password"
                    onChange={handleInput}
                  />
                  {errors.password.required ? (
                    <span className="text-red-500 text-sm">
                      Password is required.
                    </span>
                  ) : null}
                </div>
                <div className="mb-4">
                  {/* //Loading spinner */}
                  {loading ? (
                    <div className="text-center my-4">
                      <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  ) : null}

                  <div className="text-red-500 text-center">
                    <span className="text-red-500 text-sm">
                      {/* custom error */}

                      {errors.custom_error ? (
                        <p>{errors.custom_error}</p>
                      ) : null}
                    </span>
                  </div>

                  <input
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                    value="Login"
                    disabled={loading}
                  />
                </div>

                <div className="text-center mt-4">
                  <p>
                    Create new account? Please{" "}
                    <Link to="/register" className="text-blue-500">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default LoginPage;
