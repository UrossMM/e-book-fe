import { React, useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Navbar from "./components/navbar.js";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const [adminDefault, setAdminDefault] = useState({});
  const test = "uros";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if(token === 'undefined')
      navigate("../login");
    else
    {
      axios.get("https://ebook.herokuapp.com/api/User/adminDefaults", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }}).then((x) => {
        setAdminDefault(x.data);
        console.log(x.data);
      });
    }
  }, []);

  const UpdateAdminDefaults = (e) => {
    console.log("Uso u update");

    const adminDefaultDto = {
      emailAddress: adminDefault.emailAddress,
      emailSubject: adminDefault.emailSubject,
      emailBody: adminDefault.emailBody,
      unpersonalizedText: adminDefault.unpersonalizedText,
      documentName: adminDefault.documentName,
      weightLossText : adminDefault.weightLossText,
      fatteningText : adminDefault.fatteningText,
      keepingFitText: adminDefault.keepingFitText
    };
    const res = axios
      .put("https://ebook.herokuapp.com/api/User/adminDefaults", adminDefaultDto, {
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
    <div className="adminSettingsPage">
      <Navbar />
      <div className="formAdminSettingsPage">
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">Naziv fajla</label>
          <TextField
            value={adminDefault.documentName}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                documentName: e.target.value,
              }))
            }
            //label="Document Name"
            variant="outlined"
          />
        </div>
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">Email</label>
          <TextField
            value={adminDefault.emailAddress}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                emailAddress: e.target.value,
              }))
            }
            //label="Email Address"
            variant="outlined"
          />
        </div>
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">Naslov email-a</label>
          <TextField
            className="emailSubjectAdminSettings"
            value={adminDefault.emailSubject}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                emailSubject: e.target.value,
              }))
            }
            //label="Email Subject"
            variant="outlined"
          />
        </div>
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">Tekst email-a</label>
          <TextField
            className="emailBodyAdminSettings"
            //InputProps={{ sx: { height: 300,  } }}
            value={adminDefault.emailBody}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                emailBody: e.target.value,
              }))
            }
            //label="Email Body"
           // variant="multilined"
           multiline
          />
        </div>
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">
            Tekst za sve korisnike
          </label>
          <TextField
            className="unpersonalizedTextAdminSettings"
            //InputProps={{ sx: { height: 400, textAlign: "left"} }}
           multiline
          
            value={adminDefault.unpersonalizedText}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                unpersonalizedText: e.target.value,
              }))
            }
            //label="Unpersonalized text"
            variant="outlined"
          />
        </div>
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">
            Tekst za korisnike koji zele da mrsave
          </label>
          <TextField
            className="weightLossTextAdminSettings"
            //InputProps={{ sx: { height: 400, textAlign: "left"} }}
           multiline
          
            value={adminDefault.weightLossText}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                weightLossText: e.target.value,
              }))
            }
            //label="Unpersonalized text"
            variant="outlined"
          />
        </div>
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">
            Tekst za korisnike koji zele da se ugoje
          </label>
          <TextField
            className="fatteningTextAdminSettings"
            //InputProps={{ sx: { height: 400, textAlign: "left"} }}
           multiline
          
            value={adminDefault.fatteningText}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                fatteningText: e.target.value,
              }))
            }
            //label="Unpersonalized text"
            variant="outlined"
          />
        </div>
        <div className="adminSettingsRow">
          <label className="labelAdminSettingsPage">
            Tekst za korisnike koji zele da odrze trenutno stanje
          </label>
          <TextField
            className="keepingFitTextAdminSettings"
            //InputProps={{ sx: { height: 400, textAlign: "left"} }}
           multiline
          
            value={adminDefault.keepingFitText}
            onChange={(e) =>
              setAdminDefault((prev) => ({
                ...prev,
                keepingFitText: e.target.value,
              }))
            }
            //label="Unpersonalized text"
            variant="outlined"
          />
        </div>
        <Button
          onClick={UpdateAdminDefaults}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sacuvaj izmene
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
