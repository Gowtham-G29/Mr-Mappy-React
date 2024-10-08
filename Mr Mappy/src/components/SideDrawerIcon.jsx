import { List } from "@mui/material"
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";

function SideDrawerIcon() {
    return (
        <div>
             <div className="flex flex-col items-center text-8xl ">
            <List>
              <AccountBalanceWalletRoundedIcon />
            </List>

            <List>
              <FitnessCenterRoundedIcon />
            </List>

            <List>
              <AccessTimeFilledRoundedIcon />
            </List>

            <List>
              <LocationCityRoundedIcon />
            </List>
          </div>
        </div>
    )
}

export default SideDrawerIcon
