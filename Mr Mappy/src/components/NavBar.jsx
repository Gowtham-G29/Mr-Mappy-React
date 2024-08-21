import symbol from "../assets/symbol.png";

function NavBar() {
  return (
    <div
      className="sticky flex justify-around gap-x-20 font-bold bg-yellow-300 text-slate-700
        py-10"
    >
      <div className="flex justify-center items-center">
        <img src={symbol} height={50} width={50} alt="" />
        <h2 className="text-2xl ">Mr Mappy</h2>
      </div>

      <div className="flex gap-10 justify-center items-center">
        <p>Help?</p>

        <p>Contact</p>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Login / Sign Up
        </button>
      </div>
    </div>
  );
}

export default NavBar;
