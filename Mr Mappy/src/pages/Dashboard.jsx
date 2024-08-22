import { useEffect, useState } from "react";
import { userDetailsApi } from "../services/Api";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { isAuthenticated, logout } from "../services/Auth";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({ name: "", email: "", localId: "" });
 //Loading spinner state
 const [loading, setLoading] = useState(true);
  //useEffect is used here for the component is loaded first then the Api call happens
  //usually useEffect makes initial render

  useEffect(() => {
    //prevent the calling api only if it is authenticated
    if (isAuthenticated()) {
      userDetailsApi().then((response) => {
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });

      });
    }
    setLoading(false)
  }, [setLoading]);

  //navigate hook to redirect
  const navigate = useNavigate();

  //Logout function
  const logoutUser = () => {
    //from auth.js
    logout();
    navigate("/");
  };

  //block the direct accessing the dashboard
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar logoutUser={logoutUser} />
      <main role="main" className="container mx-auto mt-12">
        <div className="container mx-auto">
          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold">Dashboard page</h3>

            {user.name && user.email && user.localId ? (
              <div>
                <p className="font-bold">
                  Hi {user.name}, your Firebase ID is {user.localId}
                </p>
                <p>Your Email is {user.email}</p>
              </div>
            ) : (
              <div>
                {loading ? (
                  <div className="text-center my-4">
                    <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
