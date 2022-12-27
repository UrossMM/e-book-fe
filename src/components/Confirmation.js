import { React, useEffect, useState } from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { URL } from '../config';

const Confirmation = ({ prevStep, nextStep, values }) => {
  console.log("Before");
  const [previewValues, setPreviewValues] = useState({
    polPreview: "a",
    nivoPreview: "a",
    ciljPreview: "a",
  });

  var sastojciSaZarezom = values.sastojci.join();

  useEffect(() => {
    const transformValues = () => {
      if (values.pol == 0)
        setPreviewValues((prev) => ({ ...prev, polPreview: "M" }));
      else if (values.pol == 1)
        setPreviewValues((prev) => ({ ...prev, polPreview: "Z" }));
      else setPreviewValues((prev) => ({ ...prev, polPreview: "" }));

      if (values.nivo == 0)
        setPreviewValues((prev) => ({
          ...prev,
          nivoPreview: "Minimalno aktivan/Neaktivan",
        }));
      else if (values.nivo == 1)
        setPreviewValues((prev) => ({ ...prev, nivoPreview: "Malo aktivan" }));
      else if (values.nivo == 2)
        setPreviewValues((prev) => ({
          ...prev,
          nivoPreview: "Srednje aktivan",
        }));
      else if (values.nivo == 3)
        setPreviewValues((prev) => ({ ...prev, nivoPreview: "Veoma aktivan" }));
      else if (values.nivo == 4)
        setPreviewValues((prev) => ({ ...prev, nivoPreview: "Profesionalac" }));
      else setPreviewValues((prev) => ({ ...prev, nivoPreview: "" }));

      if (values.cilj == 0)
        setPreviewValues((prev) => ({ ...prev, ciljPreview: "Mrsavljenje" }));
      else if (values.cilj == 1)
        setPreviewValues((prev) => ({ ...prev, ciljPreview: "Gojenje" }));
      else if (values.cilj == 2)
        setPreviewValues((prev) => ({
          ...prev,
          ciljPreview: "Odrzavanje trenutnog",
        }));
      else setPreviewValues((prev) => ({ ...prev, ciljPreview: "" }));

      console.log(previewValues);
    };
    transformValues();
  }, []);

  const Continue = (e) => {
    ///e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    //e.preventDefault();
    prevStep();
  };

  const AddUserData = (e) => {
    console.log("Uso u adduserdata u Confirmation");
    const sastojciString = values.sastojci.join();

    const userInputData = {
      gender: values.pol,
      age: parseInt(values.godine),
      height: parseInt(values.visina),
      weight: parseInt(values.tezina),
      activityLevel: values.nivo,
      goal: values.cilj,
      dailyNumberOfMeals: parseInt(values.brojObroka),
      additions: sastojciString,
      mail: values.mejl,
      number: values.telefon,
    };
    const res = axios
      .post(`https://${URL}/api/User/create`, userInputData)
      .then((x) => {
        console.log("Uspesno poslao podatke");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fuseFunctions = (e) => {
    console.log("Uso u fusefunctions u Confirmation");
    Continue();
    AddUserData();
  };

  /*useEffect(() => {
  // code to run after render goes here
  console.log('Uso u useeffect u Confirmation');
  console.log(values)
    if(values.pol == 0)
    previewValues.polPreview = "M";
    else
    previewValues.polPreview = "F";

    if(values.nivo == 0 )
    previewValues.nivoPreview = "Minimalno aktivan/Neaktivan" 
    else if(values.nivo == 1)
    previewValues.nivoPreview = "Malo aktivan"
    else if(values.nivo == 2)
      previewValues.nivoPreview = "Srednje aktivan"
    else if(values.nivo == 3)
      previewValues.nivoPreview = "Veoma aktivan"
    else
      previewValues.nivoPreview = "Profesionalac"
    
    if( values.cilj == 0 )
      previewValues.ciljPreview = "Mrsavljenje" 
    else if( values.cilj == 1)
      previewValues.ciljPreview = "Gojenje"
    else if( values.cilj == 2)
      previewValues.ciljPreview = "Odrzavanje trenutnog"

      console.log(previewValues)

}, []);*/

  return (
    <div className="confirmationPage">
      <div className="formConfirmationParent">
        <div className="formConfirmation">
          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={values.mejl} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Telefon" secondary={values.telefon} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Pol"
                secondary={previewValues.polPreview}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Godine" secondary={values.godine} style = {{fontSize: 20}}/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Visina" secondary={values.visina} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tezina" secondary={values.tezina} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Nivo"
                secondary={previewValues.nivoPreview}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Cilj"
                secondary={previewValues.ciljPreview}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Broj obroka"
                secondary={values.brojObroka}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Sastojci" secondary={sastojciSaZarezom} />
            </ListItem>
          </List>

          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={Previous}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Previous
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={fuseFunctions}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Confirm 
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default Confirmation;
