/* eslint-disable react/prop-types */
import { TextField, MenuItem } from '@mui/material';

const ActionForm = ({ action, handleSubmit, handleAction }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-slate-100 p-10 shadow-2xl">
        <div className="flex flex-col space-y-10">
          <TextField
            name="type"
            id="action-select"
            label="Select Action"
            select
            value={action}
            onChange={handleAction}
            helperText="Please select your action type"
            fullWidth
            required
          >
            {[
              { value: 'Money spending', label: 'Money spending 💰' },
              { value: 'Workout', label: 'Workout 🚴🏻' },
              { value: 'Hangout', label: 'Hangout 🕓' },
              { value: 'Visiting', label: 'Visiting 🏢' }
            ].map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {action === 'Hangout' && (
            <>
              <TextField
                label="Spending Duration"
                name="spendingDuration"
                fullWidth
                id="spending-duration"
                required
              />
              <TextField
                label="Memorable Moments"
                name="memorableMoments"
                id="memorable-moments"
                multiline
                rows={4}
                placeholder="Describe memorable moments"
                required
              />
            </>
          )}

          {action === 'Money spending' && (
            <>
              <TextField
                label="Amount"
                name="amount"
                fullWidth
                id="amount"
                required
              />
              <TextField
                label="Invested For"
                name="investedFor"
                id="invested-for"
                multiline
                maxRows={4}
                fullWidth
                required
              />
            </>
          )}

          {action === 'Workout' && (
            <>
              <TextField
                label="Workout Name"
                name="workoutName"
                fullWidth
                id="workout-name"
                required
              />
              <TextField
                label="Workout Duration"
                name="workoutDuration"
                fullWidth
                id="workout-duration"
                required
              />
              <TextField
                label="Calories Burned"
                name="caloriesBurned"
                fullWidth
                id="calories-burned"
                required
              />
            </>
          )}

          {action === 'Visiting' && (
            <>
              <TextField
                label="Place Name"
                name="placeName"
                fullWidth
                id="place-name"
                required
              />
              <TextField
                label="Spending Duration"
                name="spendingDuration"
                fullWidth
                id="visiting-duration"
                required
              />
              <TextField
                label="Motive"
                name="motive"
                fullWidth
                id="motive"
                required
              />
            </>
          )}

          <input className='bg-indigo-600 p-3 w-full text-md text-white rounded-md' type='submit' value={'Submit'}/>

          {/* <Button className='' onClick={handleFormSubmit} type="submit" variant="contained" color="primary">
            Submit
          </Button> */}
        </div>
      </div>
    </form>
  );
};

export default ActionForm;
