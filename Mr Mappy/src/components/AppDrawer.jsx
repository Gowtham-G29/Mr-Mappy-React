import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useState } from "react";

import FloatingActionButtonExtendedSize from "./FloatingLogoutButton";
import CurrentPosition from "./CurrentLocation";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/Auth";



import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import MapComponent from "./MapComponent";
import ActionForm from "./ActionForm";
import EntryList from "./EntryList";
import SideDrawerIcon from "./sideDrawerIcon";





const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));






export default function AppDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [moneySpending, setMoneySpending] = useState({});
  const [workout, setWorkout] = useState({});
  const [hangout, setHangout] = useState({});
  const [visiting, setVisiting] = useState({});
  const [visibleItems, setVisibleItems] = useState(5); // Initial number of visible items
  const [formVisible, setFormVisible] = useState(false);

  const [storedEntries, setStoredEntries] = useState([]);
  const [currentLocation,setCurrentLocation]=useState(false);
  
  const handleCurrentLocation=()=>{
    setCurrentLocation(true);
    setCurrentLocation(false);
  }

  console.log(currentLocation)

  //Read the data from the local storage
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setStoredEntries(storedEntries);
    const moneySpendingEntries = storedEntries.filter(
      (entry) => entry.type === "Money spending"
    );
    const workoutEntries = storedEntries.filter(
      (entry) => entry.type === "Workout"
    );
    const hangoutEntries = storedEntries.filter(
      (entry) => entry.type === "Hangout"
    );
    const visitingEntries = storedEntries.filter(
      (entry) => entry.type === "Visiting"
    );

    setMoneySpending(moneySpendingEntries);
    setWorkout(workoutEntries);
    setHangout(hangoutEntries);
    setVisiting(visitingEntries);
  }, []);

  console.log(storedEntries);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [action, setAction] = useState("");
  const [clickedCoords, setClickedCoords] = useState(null); // State to store coordinates

  const handleAction = (e) => {
    setAction(e.target.value);
  };

  // Handle map click and set coordinates
  const handleMapClick = (coords) => {
    setFormVisible(true);
    setClickedCoords(coords); // Store the coordinates in state
  };

  //logout

  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let newEntry = {};

    // Include coordinates in the form data
    if (clickedCoords) {
      console.log(clickedCoords.lat);

      formData.append("latitude", `${clickedCoords.lat}`);
      formData.append("longitude", `${clickedCoords.lng}`);
    }

    switch (action) {
      case "Money spending":
        newEntry = {
          type: "Money spending",
          amount: formData.get("amount"),
          investedFor: formData.get("investedFor"),
        };
        setMoneySpending((prev) => [...prev, newEntry]);
        break;
      case "Workout":
        newEntry = {
          type: "Workout",
          workoutName: formData.get("workoutName"),
          workoutDuration: formData.get("workoutDuration"),
          caloriesBurned: formData.get("caloriesBurned"),
        };
        setWorkout((prev) => [...prev, newEntry]);
        break;
      case "Hangout":
        newEntry = {
          type: "Hangout",
          spendingDuration: formData.get("spendingDuration"),
          memorableMoments: formData.get("memorableMoments"),
        };
        setHangout((prev) => [...prev, newEntry]);
        break;
      case "Visiting":
        newEntry = {
          type: "Visiting",
          placeName: formData.get("placeName"),
          spendingDuration: formData.get("spendingDuration"),
          motive: formData.get("motive"),
        };
        setVisiting((prev) => [...prev, newEntry]);
        break;
      default:
        break;
    }

    newEntry.lat = formData.get("latitude");
    newEntry.lng = formData.get("longitude");

    // Get existing entries from localStorage
    const existingEntries = JSON.parse(localStorage.getItem("entries")) || [];
    console.log("Existing Entries Before Update:", existingEntries);

    // Add new entry
    existingEntries.push(newEntry);
    console.log("New Entry:", newEntry);

    // Store updated array in localStorage
    localStorage.setItem("entries", JSON.stringify(existingEntries));

    e.target.reset();
    setAction("");
    setFormVisible(false); // Optionally close the form after submission
  };

  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic
    setFormVisible(false); // Hide form after submission
  };

  // Function to load more items
  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 5); // Load 5 more items each time
  };

  return (
    <Box sx={{ display: "flex" }} className="overflow-hidden">
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        className="bg-gradient-to-r from-sky-500 to-indigo-500 shadow-xl"
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mr.Mappy
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="bg-gradient-to-l from-sky-500 to-indigo-500 ">
          <Typography variant="h5" className="text-slate-200 ">
            {" "}
            Your Logs📍
          </Typography>

          <div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </DrawerHeader>

        {/* <Divider /> */}

        {open ? (
          <div className="flex flex-col items-center bg-gradient-to-l from-sky-500 to-indigo-500  overflow-auto overflow-x-hidden h-full  ">
            <EntryList
              visibleItems={visibleItems}
              moneySpending={moneySpending}
              workout={workout}
              hangout={hangout}
              visiting={visiting}
              loadMoreItems={loadMoreItems} // Pass the function here
            />
          </div>
        ) : (
         <SideDrawerIcon/>
        )}
      </Drawer>

      {/* Map container */}
      <Box
        className="w-screen scrollbar-hide"
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden", // Prevent scrolling in the Y direction
          height: "100vh", // Ensure the container takes the full height of the viewport
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden", // Prevent scrolling inside the map container
          }}
        >
          {/* Full-screen map */}
          <MapComponent
            style={{ width: "100%", height: "100%" }}
            handleMapClick={handleMapClick}
            storedMarker={storedEntries}
            navigateCurrentLocation={setCurrentLocation}
          />

          {/* Floating form */}
          {formVisible && (
            <Box
              sx={{
                position: "absolute",
                top: 35, // Adjust positioning as needed
                left: 100, // Adjust positioning as needed
                zIndex: 1000, // Ensure the form is above the map
                backgroundColor: "white", // Optional: background to make form stand out
                padding: 2, // Add padding for better form layout
                borderRadius: 2, // Optional: rounded corners
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow for better visibility
                overflow: "hidden", // Allow scrolling inside the form if content overflows
                maxHeight: "90vh", // Restrict the form's height to fit within the viewport
              }}
            >
              <ActionForm
                action={action}
                handleSubmit={handleSubmit}
                handleAction={handleAction}
                handleFormSubmit={handleFormSubmit}
              />
            </Box>
          )}
        </Box>
      </Box>
      <div onClick={handleCurrentLocation}>
        <CurrentPosition  />
      </div>
      <FloatingActionButtonExtendedSize logoutUser={logoutUser} />
    </Box>
  );
}
