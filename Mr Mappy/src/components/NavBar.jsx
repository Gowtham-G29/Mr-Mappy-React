import { useNavigate } from "react-router-dom";
import symbol from "../assets/symbol.png";
import { isAuthenticated } from "../services/Auth";

function NavBar(props) {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  function navigateRegister() {
    navigate("/register"); // Navigate to the /register route
  }

  function navigateLogin(){
    navigate('/login');
  }

  return (
    <div
      className="sticky flex justify-around gap-x-20 font-bold bg-yellow-300 text-slate-700
        py-10"
    >
      <div className="flex justify-center items-center">
        <img src={symbol} height={50} width={50} alt="Symbol" />
        <h2 className="text-2xl ">Mr Mappy</h2>
      </div>

      <div className="flex gap-10 justify-center items-center">
        <p>Help?</p>
        <p>Contact</p>

        {isAuthenticated() ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={props.logoutUser}
          >
            Logout
          </button>
        ) : (
          <div className="space-x-3">
            {/* //register button */}
            <button
              onClick={navigateRegister} // Call the function directly
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              register
            </button>

            <button
              onClick={navigateLogin} // Call the function directly
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
