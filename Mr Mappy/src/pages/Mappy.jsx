import { useEffect, useState } from "react";
// import { userDetailsApi } from "../services/Api";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { isAuthenticated, logout } from "../services/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import logo from "../assets/logo.png";



const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

function Dashboard() {

    const [map, setMap] = useState(null);
    const [mapEvent, setMapEvent] = useState(null);
    const [workouts, setWorkouts] = useState(() => {
      const localData = JSON.parse(localStorage.getItem("workouts"));
      return localData || [];
    });
    const [form, setForm] = useState({
      type: "running",
      distance: "",
      duration: "",
      cadence: "",
      elevation: "",
    });
    const [formVisible, setFormVisible] = useState(false);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const coords = [latitude, longitude];
            const mapInstance = L.map("map").setView(coords, 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapInstance);
  
            L.marker(coords)
              .addTo(mapInstance)
              .bindPopup("You are currently here!")
              .openPopup();
  
            mapInstance.on("click", (e) => {
              setMapEvent(e);
              setFormVisible(true);
            });
  
            workouts.forEach((workout) => {
              renderWorkoutMarker(mapInstance, workout);
            });
  
            setMap(mapInstance);
          },
          () => {
            alert("Could not get your position");
          }
        );
      }
    }, [workouts]);
  
    useEffect(() => {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }, [workouts]);
  
    const renderWorkoutMarker = (mapInstance, workout) => {
      L.marker(workout.coords)
        .addTo(mapInstance)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
          }).setPopupContent(
            `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
          )
        )
        .openPopup();
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const { type, distance, duration, cadence, elevation } = form;
  
      if (
        !distance ||
        !duration ||
        (type === "running" && !cadence) ||
        (type === "cycling" && !elevation)
      ) {
        return alert("Please fill out all fields");
      }
  
      const newWorkout = {
        id: (Date.now() + "").slice(-10),
        coords: [mapEvent.latlng.lat, mapEvent.latlng.lng],
        distance: +distance,
        duration: +duration,
        type,
        ...(type === "running" && {
          cadence: +cadence,
          pace: duration / distance,
        }),
        ...(type === "cycling" && {
          elevation: +elevation,
          speed: distance / duration,
        }),
        date: new Date(),
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} on ${
          months[new Date().getMonth()]
        } ${new Date().getDate()}`,
      };
  
      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
      renderWorkoutMarker(map, newWorkout);
      setFormVisible(false);
      setForm({
        type: "running",
        distance: "",
        duration: "",
        cadence: "",
        elevation: "",
      });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
  
    const toggleElevationField = () => {
      setForm((prevForm) => ({
        ...prevForm,
        type: prevForm.type === "running" ? "cycling" : "running",
      }));
    };
  
    const moveToPopup = (workout) => {
      map.setView(workout.coords, 13, { animate: true, pan: { duration: 1 } });
    };
  
//   const [user, setUser] = useState({ name: "", email: "", localId: "" });
//  //Loading spinner state
//  const [loading, setLoading] = useState(true);
  //useEffect is used here for the component is loaded first then the Api call happens
  //usually useEffect makes initial render

//   useEffect(() => {
//     //prevent the calling api only if it is authenticated
//     if (isAuthenticated()) {
//       userDetailsApi().then((response) => {
//         setUser({
//           name: response.data.users[0].displayName,
//           email: response.data.users[0].email,
//           localId: response.data.users[0].localId,
//         });

//       });
//     }
//     setLoading(false)
//   }, [setLoading]);

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
      <div className="flex flex-col md:flex-row h-screen">
      <div className="sidebar bg-yellow-200 text-white flex flex-col p-4 md:p-8 w-full md:w-1/3 relative">
        <img src={logo} alt="Logo" className="logo mb-4 md:mb-8 mx-auto" />
        <ul className="workouts overflow-y-scroll flex-1">
          {workouts.map((workout) => (
            <li
              key={workout.id}
              className={`workout workout--${workout.type} mb-4 p-4 rounded bg-gray-700 cursor-pointer`}
              onClick={() => moveToPopup(workout)}
            >
              <h2 className="workout__title text-base md:text-lg font-semibold">
                {workout.description}
              </h2>
              <div className="workout__details">
                <span className="workout__icon">
                  {workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}
                </span>
                <span className="workout__value">{workout.distance}</span> km
              </div>
              <div className="workout__details">
                <span className="workout__icon">⏱</span>
                <span className="workout__value">{workout.duration}</span> min
              </div>
              {workout.type === "running" && (
                <>
                  <div className="workout__details">
                    <span className="workout__icon">⚡️</span>
                    <span className="workout__value">
                      {workout.pace.toFixed(1)}
                    </span>{" "}
                    min/km
                  </div>
                  <div className="workout__details">
                    <span className="workout__icon">🦶🏼</span>
                    <span className="workout__value">
                      {workout.cadence}
                    </span>{" "}
                    spm
                  </div>
                </>
              )}
              {workout.type === "cycling" && (
                <>
                  <div className="workout__details">
                    <span className="workout__icon">⚡️</span>
                    <span className="workout__value">
                      {workout.speed.toFixed(1)}
                    </span>{" "}
                    km/h
                  </div>
                  <div className="workout__details">
                    <span className="workout__icon">⛰</span>
                    <span className="workout__value">
                      {workout.elevation}
                    </span>{" "}
                    m
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
     
       
    
        {formVisible && (
          <form
            className="form bg-gray-700 text-white p-4 rounded absolute bottom-4 left-4 md:bottom-8 md:left-8 w-full md:max-w-sm"
            onSubmit={handleFormSubmit}
          >
            <div className="form__row">
              <label className="form__label">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={toggleElevationField}
                className="form__input"
              >
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
              </select>
            </div>
            <div className="form__row">
              <label className="form__label">Distance</label>
              <input
                name="distance"
                value={form.distance}
                onChange={handleInputChange}
                className="form__input"
                placeholder="km"
              />
            </div>
            <div className="form__row">
              <label className="form__label">Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleInputChange}
                className="form__input"
                placeholder="min"
              />
            </div>
            {form.type === "running" && (
              <div className="form__row">
                <label className="form__label">Cadence</label>
                <input
                  name="cadence"
                  value={form.cadence}
                  onChange={handleInputChange}
                  className="form__input"
                  placeholder="step/min"
                />
              </div>
            )}
            {form.type === "cycling" && (
              <div className="form__row">
                <label className="form__label">Elevation Gain</label>
                <input
                  name="elevation"
                  value={form.elevation}
                  onChange={handleInputChange}
                  className="form__input"
                  placeholder="meters"
                />
              </div>
            )}
            <button className="form__btn col-span-2 mt-4 bg-green-600 hover:bg-green-500 text-white py-2 rounded">
              OK
            </button>
          </form>
        )}
      </div>
      <div id="map" className="flex-1"></div>
    </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
