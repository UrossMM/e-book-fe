import { React } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";

const UserDetails = ({ nextStep, handleChange, values }) => {
  const Continue = (e) => {
    nextStep();
  };

  const cannotGoToTheNextStep = () =>{
    if(values.godine<15 || values.godine>90)
    {
      return true;
    }
    if(values.visina<120 || values.visina>260)
    {
      return true;
    }
    if(values.tezina<30 || values.tezina>220)
    {
      return true;
    }
    return false;
  }

  return (
    <div className="userDetailsPage">
      <div className="userDetailsFormParent">
      <form className="formUserDetails">
        <Typography component="h1" variant="h5" align="center">
          Unesite Vase podatke
        </Typography>
        <Grid container spacing={2}>
          {/* email address */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Pol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Pol"
                onChange={handleChange("pol")}
                value={values.pol}
                required
              >
                <MenuItem value={0}>M</MenuItem>
                <MenuItem value={1}>Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Godine"
              label="Godine"
              onChange={handleChange("godine")}
              defaultValue={values.godine}
              // variant="outlined"
              autoComplete="godine"
              fullWidth
              required
              error = {values.godine!=0 && (values.godine<15 || values.godine>90)}
              helperText={values.godine!=0 && (values.godine<15 || values.godine>90) ? "Vrednosti su podrzane od 15 do 90" : ""}
              InputProps={{ inputProps: { min: 15, max: 90 } }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Visina"
              label="Visina"
              onChange={handleChange("visina")}
              defaultValue={values.visina}
              // variant="outlined"
              autoComplete="visina"
              fullWidth
              required
              error = {values.visina!=0 && (values.visina<120 || values.visina>260)}
              helperText={values.visina!=0 && (values.visina<120 || values.visina>260) ? "Vrednosti su podrzane od 120 do 260" : ""}
              InputProps={{ inputProps: { min: 120, max: 260 } }}
              //type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Tezina"
              label="Tezina"
              onChange={handleChange("tezina")}
              defaultValue={values.tezina}
              // variant="outlined"
              autoComplete="tezina"
              fullWidth
              required
              error = {values.tezina!=0 && (values.tezina<30 || values.tezina>220)}
              helperText={values.tezina!=0 && (values.tezina<30 || values.tezina>220) ? "Vrednosti su podrzane od 30 do 220" : ""}
              InputProps={{ inputProps: { min: 30, max: 220 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Nivo aktivnosti
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Nivo aktivnosti"
                onChange={handleChange("nivo")}
                value={values.nivo}
                required
              >
                <MenuItem value={0}>Minimalno aktivan/Neaktivan</MenuItem>
                <MenuItem value={1}>Malo aktivan</MenuItem>
                <MenuItem value={2}>Srednje aktivan</MenuItem>
                <MenuItem value={3}>Veoma aktivan</MenuItem>
                <MenuItem value={4}>Profesionalac</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cilj</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Cilj"
                onChange={handleChange("cilj")}
                value={values.cilj}
                required
              >
                <MenuItem value={0}>Mrsavljenje</MenuItem>
                <MenuItem value={1}>Gojenje</MenuItem>
                <MenuItem value={2}>Odrzavanje trenutnog</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <Button
          onClick={Continue}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled = {cannotGoToTheNextStep()}
        >
          Next
        </Button>
      </form>
      </div>
    </div>
  );
};

export default UserDetails;
