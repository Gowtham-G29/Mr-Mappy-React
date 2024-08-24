/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import LogoutIcon from "@mui/icons-material/Logout";

export default function FloatingActionButtonExtendedSize({logoutUser}) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        variant="extended"
        color="primary"
        onClick={logoutUser}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        <LogoutIcon />
        Logout
      </Fab>
    </Box>
  );
}
