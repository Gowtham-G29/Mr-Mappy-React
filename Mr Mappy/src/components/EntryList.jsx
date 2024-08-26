/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";

function EntryList({
  visibleItems,
  moneySpending,
  workout,
  hangout,
  visiting,
  loadMoreItems,
}) {
  // Calculate total items
  const totalItems =
    moneySpending.length + workout.length + hangout.length + visiting.length;

  return (
    <div className="flex flex-col px-20 py-full bg-gradient-to-l from-sky-500 to-indigo-500  overflow-auto h-full">
      <div>
        {/* Money Spending Section */}
        <List>
          {!totalItems?( <Typography
            className="shadow-xl text-center text-white "
            variant="h6"
            component="h6"
          >
            No logs Found 📝
          </Typography>):(null)}
         
          {moneySpending.slice(0, visibleItems).map((entry, index) => (
            <ListItem key={index} >
              <Card className="bg-slate-300 shadow-md">
                <CardContent className="flex flex-col w-48 bg-blue-200 ">
                  <Typography className="font-bold text-center" variant="">
                    {entry.type}
                  </Typography>
                  <Typography variant="subtitle1">
                    Amount 💸: {entry.amount}
                  </Typography>
                  <Typography variant="subtitle2">
                    For ❓: {entry.investedFor}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Workout Section */}
        <List>
          {/* <Typography
            className="text-center shadow-xl text-white "
            variant="h6"
            component="h6"
          >
            Workout
          </Typography> */}
          {workout.slice(0, visibleItems).map((entry, index) => (
            <ListItem key={index}>
              <Card className="bg-slate-300 shadow-md">
                <CardContent className="flex flex-col w-48 bg-blue-200">
                  <Typography className="font-bold text-center" variant="">
                    {entry.type}
                  </Typography>

                  <Typography variant="subtitle1">
                    Type 🚴🏻‍♂️: {entry.workoutName}
                  </Typography>
                  <Typography variant="subtitle2">
                    Duration 🕒: {entry.workoutDuration}
                  </Typography>
                  <Typography variant="subtitle2">
                    Calories 🥵: {entry.caloriesBurned}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Hangout Section */}
        <List>
          {/* <Typography
            className="text-center shadow-xl text-white "
            variant="h6"
            component="h6"
          >
            Hangout
          </Typography> */}
          {hangout.slice(0, visibleItems).map((entry, index) => (
            <ListItem key={index}>
              <Card className="bg-slate-300 shadow-md">
                <CardContent className="flex flex-col w-48 bg-blue-200">
                  <Typography className="font-bold text-center" variant="">
                    {entry.type}
                  </Typography>

                  <Typography variant="subtitle1">
                    Duration 🕒: {entry.spendingDuration}
                  </Typography>
                  <Typography variant="subtitle2">
                    Moments 😇: {entry.memorableMoments}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Visiting Section */}
        <List>
          {/* <Typography
            className="text-center shadow-xl text-white "
            variant="h6"
            component="h6"
          >
            Visiting
          </Typography> */}
          {visiting.slice(0, visibleItems).map((entry, index) => (
            <ListItem key={index}>
              <Card className="bg-slate-300 shadow-md">
                <CardContent className="flex flex-col w-48 bg-blue-200">
                  <Typography className="font-bold text-center" variant="">
                    {entry.type}
                  </Typography>

                  <Typography variant="subtitle1">
                    Place 📍: {entry.placeName}
                  </Typography>
                  <Typography variant="subtitle2">
                    Duration 🕓: {entry.spendingDuration}
                  </Typography>
                  <Typography variant="subtitle2">
                    Motive 👉🏻: {entry.motive}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Load More Button */}
        <div className="text-center">
          {visibleItems < totalItems && (
            <Button
              onClick={loadMoreItems}
              variant="contained"
              sx={{ margin: 2, backgroundColor: "#7A1CAC" }}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EntryList;
