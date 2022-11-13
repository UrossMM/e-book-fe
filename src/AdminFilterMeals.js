import { React, useEffect, useState } from "react";
import axios from "axios";
import { Theme, useTheme } from "@mui/material/styles";
import {
  Container,
  Typography,
  Grid,
  TextField,
  //Button,
  Chip,
  Box,
  OutlinedInput,
  Select,
  MenuItem,
} from "@material-ui/core";
import Navbar from "./components/navbar.js";
import Collapsible from 'react-collapsible';
import { useNavigate } from "react-router-dom";

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

function getStyles(name, selektovaniSastojci, theme) {
  return {
    fontWeight:
      selektovaniSastojci.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AdminFilterMeals = () => {
  const [sastojci, setSastojci] = useState([]);
  const [selektovaniSastojci, setSelektovaniSastojci] = useState([]);
  const [kalorije, setKalorije] = useState([]);
  const [kalorijeplus, setKalorijeplus] = useState(false);
  const [mealElements, setMealElements] = useState([]);
  const [imeTemplejta, setImeTemplejta] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if(token === 'undefined')
      navigate("../login");
      else{
    const res = axios
      .get("https://localhost:7231/api/Meal/additions", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .then((x) => {
        console.log("Uspesno primio podatke");
        console.log(x.data);
        setSastojci(x.data);
        console.log(sastojci); //tu nece da ih prikaze, prikazuje idalje prazan niz ali sve radi kako treba
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const handleItemChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelektovaniSastojci(
      // On autofill we get a stringified value.
      /*typeof value === "string" ? value.split(",") :*/ value
    );
  };

  const handleChange = (e) => {
    setKalorije(e.target.value);
  };

  const handleChangeImeTemplejta = (e) => {
    setImeTemplejta(e.target.value);
  };
  const theme = useTheme();

  const plus = () => {
    setKalorijeplus(true);
  };
  const minus = () => {
    setKalorijeplus(false);
  };

  const GetFilteredMeals = () => {
    const sastojciString = selektovaniSastojci.join();

    const mealFilter = {
      calories: parseInt(kalorije),
      caloriesPlus: kalorijeplus,
      additions: sastojciString,
      templateName: imeTemplejta
    };
    const res = axios
      .get(
        "https://localhost:7231/api/Meal/filterMeals?" +
          "calories=" +
          mealFilter.calories +
          "&caloriesPlus=" +
          mealFilter.caloriesPlus +
          "&additions=" +
          mealFilter.additions + 
          "&templateName=" +
          mealFilter.templateName,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }})
      .then((x) => {
        let meals = [];
        x.data.forEach((el) => {
          console.log(el);
          meals.push(
            // <Collapsible trigger={el.name} >
            <div className= "filteredMealElement">
              <p><strong>{el.name}</strong></p>
              <p>Sastojci: {el.ingredient}</p>
              <p>Masa: {el.mass}</p>
              <p>Kalorije: {el.calories}</p>
              <p>Recept: {el.recipe}</p>
            </div>
            // </Collapsible>
          );
        });
        setMealElements(meals);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="filterMeals">
      <Navbar />
      <div class="filterContainer">
        <div class="filterCalories">
          
            <TextField
              type="number"
              placeholder="Kalorije"
              label="Kalorije"
              onChange={handleChange}
              //defaultValue={values.godine}
               variant="outlined"
              autoComplete="kalorije"
              //fullWidth
              required
              InputProps={{ inputProps: { min: 0, max: 9000 } }}
              className = "inputCaloriesFilter"
            />
           
          <button
            onClick={plus}
            //type="submit"
            //fullWidths
            //variant="contained"
            //color="primary"
            className= "buttonFilterPlus"
          
          >
            +
          </button>
          <button
            onClick={minus}
            //type="submit"
            //fullWidth
            //variant="contained"
            //color="primary"
            className="buttonFilterMinus"
          >
            -
          </button>
        </div>
        <div className="inputTemplateNameFilterDiv">
        <TextField
              placeholder="Ime templejta"
              label="Ime templejta"
              onChange={handleChangeImeTemplejta}
               variant="outlined"
              autoComplete="ime templejta"
              className = "inputTemplateNameFilter"
            />
        </div>
        <label className="labelSastojciPersonalDetails">Sastojci koji ne treba da se nadju u jelima:</label>
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
        
        <button
          onClick={GetFilteredMeals}
          //type="submit"
          //fullWidth
         // variant="contained"
          //color="primary"
          className="buttonFilterSearch btn btn-danger"
        
        >
          Pronadji jelo
        </button>
      </div>
      <div className ="filteredMealsResult">{mealElements}</div>
      {/* <Collapsible trigger="Start here">
      <p>
        This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
    </Collapsible> */}
    </div>
  );
};

export default AdminFilterMeals;
