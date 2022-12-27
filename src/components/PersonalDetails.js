import { React, Component, useState, useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Box,
  OutlinedInput,
  Select,
  MenuItem,
} from "@material-ui/core";
import { URL } from '../config';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, selektovaniSastojci, theme) {
  return {
    fontWeight:
      selektovaniSastojci.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const PersonalDetails = ({
  prevStep,
  nextStep,
  handleChange,
  values,
  handleChangeSastojci,
}) => {
  const [sastojci, setSastojci] = useState([]);
  const [selektovaniSastojci, setSelektovaniSastojci] = useState([]);

  useEffect(() => {
    console.log("sastojci useeffect");
    console.log(sastojci);

    console.log("selektovanisastojci useeffect");
    console.log(selektovaniSastojci);

    // ovde pozovi func sa back i pribavi sastojeke
    const res = axios
      .get(`https://${URL}/api/Meal/additions`)
      .then((x) => {
        console.log("Uspesno primio podatke");
        console.log(x.data);
        setSastojci(x.data);
        console.log(sastojci); //tu nece da ih prikaze, prikazuje idalje prazan niz ali sve radi kako treba
      })
      .catch((error) => {
        console.log(error);
      });

    // nakon toga
    // setSastojci(["so","secer"])
  }, []);

  const Continue = (e) => {
    // e.preventDefault();
    nextStep();
  };
  const theme = useTheme();

  const Previous = (e) => {
    //e.preventDefault();
    prevStep();
  };

  const handleItemChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelektovaniSastojci(
      // On autofill we get a stringified value.
      /*typeof value === "string" ? value.split(",") :*/ value
    );
  };

  const fuseFunctions = (e) => {
    console.log("Uso u fusefunctions u personal details");
    handleChangeSastojci(selektovaniSastojci);
    Continue();
  };

  const cannotGoToTheNextStep = () =>{
    if(values.mejl.trim().length == 0 || values.mejl.includes("@")==false)
    {
      console.log("los mejl");
      return true;

    }
    if(values.brojObroka<3 || values.brojObroka>6)
    {
      console.log("los roj obroka");
      console.log(values.brojObroka)
            return true;

    }
    console.log(values.brojObroka)
    console.log("sve dobro")
    return false;
  }

  return (
    <div  className="personalDetailsPage">
      <div className="personalDetailsFormParent">
      <form className="formPersonalDetails">
        <Typography component="h1" variant="h5" align="center">
          Unesite Vase podatke
        </Typography>
        <Grid container spacing={2}>
          {/* country of residence */}
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Broj obroka"
              label="Broj obroka"
              onChange={handleChange("brojObroka")}
              defaultValue={values.brojObroka}
              autoComplete="brojObroka"
              fullWidth
              error = {(values.brojObroka<3 || values.brojObroka>5) && values.brojObroka!=""}
              helperText={ (values.brojObroka<3 || values.brojObroka>5)  && values.brojObroka!=""? "Vrednosti su podrzane od 3 do 5" : ""}
              InputProps={{ inputProps: { min: 3, max: 5 } }}
            />
          </Grid>

          {/* level of education */}
          <label className="labelSastojciPersonalDetails">Sastojci koje ne jedete</label>
          <Grid item xs={12}>
            {/* <TextField 
            placeholder="Sastojci"
            label="Sastojci"
            onChange={handleChange('sastojci')}
            defaultValue={values.sastojci}
            autoComplete="Sastojci"
            fullWidth
          /> */}
          
            <Select
              labelId="demo-multiple-chip-label"
              label="Sastojci koje ne jedete"
              id="demo-multiple-chip"
              multiple
              // fullWidth
              //maxHeight
              value={selektovaniSastojci}
              defaultValue={selektovaniSastojci}
              onChange={handleItemChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {sastojci.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, selektovaniSastojci, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Mejl"
              label="Mejl"
              onChange={handleChange("mejl")}
              defaultValue={values.mejl}
              autoComplete="mejl"
              fullWidth
              error = {values.mejl.trim().length != 0 && values.mejl.includes("@")==false }
              helperText={ values.mejl.trim().length != 0 && values.mejl.includes("@")==false ? "Unesite validnu email adresu" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Telefon"
              label="Telefon"
              onChange={handleChange("telefon")}
              defaultValue={values.telefon}
              autoComplete="Telefon"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={Previous}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Previous Step
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={fuseFunctions}
              type="submit"
              s
              fullWidth
              variant="contained"
              color="primary"
              disabled = {cannotGoToTheNextStep()}
            >
              Next Step
            </Button>
          </Grid>
        </Grid>
      </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
