import { React, useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Navbar from "./components/navbar.js";
import { useNavigate } from "react-router-dom";

const AdminAdditions = () => {
  const [adminDefault, setAdminDefault] = useState({});
  const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     console.log(token)
//     if(token === 'undefined')
//       navigate("../login");
//     else
//     {
//       axios.get("https://localhost:7231/api/User/adminDefaults", {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }}).then((x) => {
//         setAdminDefault(x.data);
//         console.log(x.data);
//       });
//     }
//   }, []);

  const AddFoodstuff = (e) => {
    console.log("Uso u add");

    const foodstuffDto = {
      name: adminDefault.name,
      proteins: parseFloat(adminDefault.proteins),
      fats: parseFloat(adminDefault.fats),
      carbohydrates: parseFloat(adminDefault.carbohydrates),
      calories: parseInt(adminDefault.calories),
      grams: parseInt(adminDefault.grams),
    };
    const res = axios
      .post("https://localhost:7231/api/Meal/foodstuff", foodstuffDto, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .then((x) => {
        console.log("Uspesno poslao podatke");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="adminAdditionsPage">
      <Navbar />
      <div className="formAdminAdditionsPage">
        <div className="adminAdditionsRow">
          <label className="labelAdminAdditionsPage">Naziv</label>
          <TextField
            className="nameAdminAdditions"
            value={adminDefault.name}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            //label="Document Name"
            variant="outlined"
          />
        </div>
        <div className="adminAdditionsRow">
          <label className="labelAdminAdditionsPage">Proteini</label>
          <TextField
            className="proteinsAdminAdditions"
            value={adminDefault.proteins}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                proteins: e.target.value,
              }))
            }
            //label="Email Address"
            variant="outlined"
          />
        </div>
        <div className="adminAdditionsRow">
          <label className="labelAdminAdditionsPage">Masti</label>
          <TextField
            className="fatsSubjectAdminAdditions"
            value={adminDefault.fats}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                fats: e.target.value,
              }))
            }
            //label="Email Subject"
            variant="outlined"
          />
        </div>
        <div className="adminAdditionsRow">
          <label className="labelAdminAdditionsPage">Ugljeni hidrati</label>
          <TextField
            className="carbohydratesAdminAdditions"
            //InputProps={{ sx: { height: 300,  } }}
            value={adminDefault.carbohydrates}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                carbohydrates: e.target.value,
              }))
            }
            //label="Email Body"
           // variant="multilined"
           multiline
          />
        </div>
        <div className="adminAdditionsRow">
          <label className="labelAdminAdditionsPage">
            Kalorije
          </label>
          <TextField
            className="caloriesAdminAdditions"
            //InputProps={{ sx: { height: 400, textAlign: "left"} }}
           multiline
          
            value={adminDefault.calories}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                calories: e.target.value,
              }))
            }
            //label="Unpersonalized text"
            variant="outlined"
          />
        </div>
        <div className="adminAdditionsRow">
          <label className="labelAdminAdditionsPage">Unete vrednosti su za </label>
          <TextField
            className="gramsAdminAdditions"
            value={adminDefault.grams}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                grams: e.target.value,
              }))
            }
            //label="Email Subject"
            variant="outlined"
          />
            <label className="gramsLabelAdminAdditionsPage">grama navedene namirnice</label>
        </div>
        <Button
          onClick={AddFoodstuff}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sacuvaj 
        </Button>
      </div>
    </div>
  );
};

export default AdminAdditions;
