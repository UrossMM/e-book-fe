import { React, useEffect, useState } from "react";
import {
  Grid,
  List,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { URL } from '../config';

const Confirmation = ({ prevStep, nextStep, values }) => {
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
    };
    transformValues();
  }, []);

  const Continue = (e) => {
    nextStep();
  };

  const Previous = (e) => {
    prevStep();
  };

  const AddUserData = (e) => {
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
      .then((x) => { })
      .catch((error) => { });
  };

  const fuseFunctions = (e) => {
    Continue();
    AddUserData();
  };

  return (
    <div className="confirmationPage">
      <div className="formConfirmationParent">
        <div className="formConfirmation">
          <List>
            <p><span className="finalniPodatak">Email</span> - <span className="vrednostFinalnogPodatka">{values.mejl}</span></p>
            <p><span className="finalniPodatak">Telefon</span> - <span className="vrednostFinalnogPodatka">{values.telefon}</span></p>
            <p><span className="finalniPodatak">Pol</span> - <span className="vrednostFinalnogPodatka">{previewValues.polPreview}</span></p>
            <p><span className="finalniPodatak">Godine</span> - <span className="vrednostFinalnogPodatka">{values.godine}</span></p>
            <p><span className="finalniPodatak">Visina</span> - <span className="vrednostFinalnogPodatka">{values.visina}</span></p>
            <p><span className="finalniPodatak">Tezina</span> - <span className="vrednostFinalnogPodatka">{values.tezina}</span></p>
            <p><span className="finalniPodatak">Nivo</span> - <span className="vrednostFinalnogPodatka">{previewValues.nivoPreview}</span></p>
            <p><span className="finalniPodatak">Cilj</span> - <span className="vrednostFinalnogPodatka">{previewValues.ciljPreview}</span></p>
            <p><span className="finalniPodatak">Broj obroka</span> - <span className="vrednostFinalnogPodatka">{values.brojObroka}</span></p>
            <p><span className="finalniPodatak">Sastojci</span> - <span className="vrednostFinalnogPodatka">{sastojciSaZarezom}</span></p>
          </List>
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
