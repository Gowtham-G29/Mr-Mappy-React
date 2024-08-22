import { useState } from "react";
import { RegisterApi } from "../services/Api";
import { storeUserData } from "../services/Storage";
import { isAuthenticated } from "../services/Auth";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Register() {
  //error state
  const initilaState = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initilaState);
  //Loading spinner state
  const [loading, setLoading] = useState(false);

  //form submit function
  //form validation
  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initilaState;
    let hasError = false;

    if (inputs.name == "") {
      errors.name.required = true;
      hasError = true;
    }
    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }

    if (hasError != true) {
      //sending api request
      setLoading(true);
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.response.data.error.message == "EMAIL_EXISTS") {
            setErrors({
              ...errors,
              custom_error: "Already this email has been registered !",
            });
          } else if (
            String(err.response.data.error.message).includes("WEAK_PASSWORD")
          ) {
            setErrors({
              ...errors,
              custom_error: "Password should be atleast 6 characters !",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors }); //correct

    // setErrors(errors); //wrong
  };

  //form validation
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  //redirection

  if (isAuthenticated()) {
    //redirecting user to dashboard
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar/>
      <section className="register-block py-20 bg-yellow-200">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
              <h2 className="text-center text-2xl font-bold mb-6">
                Register Now
              </h2>
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="form-group mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    name="name"
                    id="name"
                    onChange={handleInput}
                  />

                  {errors.name.required ? (
                    <span className="text-red-500 text-sm">
                      Name is required.
                    </span>
                  ) : null}
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    name="email"
                    id="email"
                    onChange={handleInput}
                  />
                  {errors.email.required ? (
                    <span className="text-red-500 text-sm">
                      Email is required.
                    </span>
                  ) : null}
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    name="password"
                    id="password"
                    onChange={handleInput}
                  />

                  {errors.password.required ? (
                    <span className="text-red-500 text-sm">
                      Password is required.
                    </span>
                  ) : null}
                </div>
                <div className="form-group mb-4">
                  <span className="text-red-500 text-sm">
                    {/* custom error */}

                    {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                  </span>

                  {/* //Loading spinner */}
                  {loading ? (
                    <div className="text-center my-4">
                      <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="btn bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded mt-4 cursor-pointer"
                    value="Register"
                    disabled={loading}
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group text-center text-sm">
                  Already have an account? Please{" "}
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
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

export default Register;
