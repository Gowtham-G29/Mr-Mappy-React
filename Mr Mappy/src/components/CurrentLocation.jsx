/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import NavigationIcon from "@mui/icons-material/Navigation";

export default function CurrentPosition({focusOnCurrentPosition}) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        variant="extended"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={focusOnCurrentPosition}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
    </Box>
  );
}
