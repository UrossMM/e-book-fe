import { Field, Form } from "react-final-form";
import OneDayOfMeals from "./OneDayOfMeals";
import arrayMutators from "final-form-arrays";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "./components/navbar.js";
import { FORM_ERROR } from "final-form";
import { React, useEffect } from "react";
import axios from "axios";
import MealsManagementService from "./services/MealsManagement.service";
import { useNavigate } from "react-router-dom";

const AdminTempate = () => {
  const [templateNames, setTemplateNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [initialValues, setinitialValues] = useState(
    MealsManagementService.fromBackToForm({
      name: "Maxi",
      mealsPerDay: [
        {
          timeToEat: 0,
          day: 0,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 1,
          day: 0,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 2,
          day: 0,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 3,
          day: 0,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },

        {
          timeToEat: 0,
          day: 1,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 1,
          day: 1,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 2,
          day: 1,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 3,
          day: 1,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },

        {
          timeToEat: 0,
          day: 2,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 1,
          day: 2,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 2,
          day: 2,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 3,
          day: 2,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },

        {
          timeToEat: 0,
          day: 3,
        },
        {
          timeToEat: 1,
          day: 3,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 2,
          day: 3,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 3,
          day: 3,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },

        {
          timeToEat: 0,
          day: 4,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 1,
          day: 4,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 2,
          day: 4,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 3,
          day: 4,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },

        {
          timeToEat: 0,
          day: 5,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 1,
          day: 5,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 2,
          day: 5,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 3,
          day: 5,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },

        {
          timeToEat: 0,
          day: 6,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 1,
          day: 6,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 2,
          day: 6,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
        {
          timeToEat: 3,
          day: 6,
          ingredient:[{
            mass: 0,
            name: ""
          }
          ]
        },
      ],
    })
  );
  const [sastojci, setSastojci]= useState([]);
  ////////////////////

  const onSubmit = (vals) => {
    const submitObj = MealsManagementService.fromFormToBack(vals);
    const daysArray = [0, 1, 2, 3, 4, 5, 6];
    let countArray = [];
    let errorFlag = false;
    daysArray.forEach((day) => {
      countArray[day] = submitObj?.mealsPerDay.filter(
        (elm) => elm?.day === day
      ).length;
    });
    errorFlag = countArray.every((val) => val === countArray[0]);

    if (!errorFlag) {
      return {
        [FORM_ERROR]: "Nemaju svi dani isti broj obroka",
      };
    }
    console.log(submitObj);

    axios.post("https://localhost:7231/api/Meal/template",  submitObj, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})
      .then(async (x) => {
        console.log('poslao podatke za templejt');
        window.location.replace("/templates");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if(token === 'undefined')
      navigate("../login");
      else{
    const res = axios
      .get("https://localhost:7231/api/Meal/template", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((x) => {
        console.log("Uspesno primio podatke");
        console.log(x.data);
        setTemplateNames(x.data);
        setSelectedOption(x.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });


      axios
      .get("https://localhost:7231/api/Meal/additions", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .then((x) => {
        console.log("Uspesno primio podatke");
        console.log(x.data);
        setSastojci(x.data);
      })
      .catch((error) => {
        console.log(error);
      });

    }
  }, []);

  let options = [];
  templateNames.forEach((name) => {
    options.push(<option value={name}>{name}</option>);
  });

  const deleteTemplate = () => {
    const res = axios
      .delete("https://localhost:7231/api/Meal/template/" + selectedOption, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((x) => {
        window.location.replace("/templates");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="adminTemplate">
      <Navbar />
      <div className="formAdminTemplate">
        <div className="deleteTemplateDiv">
          <select
            className="selectTemplateDiv"
            value={selectedOption}
            onChange={handleChange}
          >
            {options}
          </select>
          <button
            className="btnDeleteAdminTemplate"
            onClick={() => deleteTemplate()}
          >
            Obrisi sablon
          </button>
        </div>
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            submitError,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* <div className="topDivAdminTemplate"> */}
              <Field
                name={`name`}
                component="input"
                type="text"
                placeholder="Ime sablona"
                className="nameAdminTemplate"
              />

              {/* </div> */}

              {/* <Field
              name="vegeterian"
              component="input"
              type="text"
              placeholder="vegeterian"
            /> */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Ponedeljak</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OneDayOfMeals sviSastojci={sastojci} dayNum={0} day="ponedeljak" ></OneDayOfMeals>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Utorak</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OneDayOfMeals sviSastojci={sastojci} dayNum={1} day="utorak"></OneDayOfMeals>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Sreda</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OneDayOfMeals
                  sviSastojci={sastojci} 
                    day="sreda"
                    dayNum={2} 
                    // dayName="Wendsday"
                  ></OneDayOfMeals>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Cetvrtak</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OneDayOfMeals sviSastojci={sastojci} dayNum={3} day="cetvrtak"></OneDayOfMeals>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Petak</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OneDayOfMeals sviSastojci={sastojci} dayNum={4} day="petak"></OneDayOfMeals>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Subota</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OneDayOfMeals sviSastojci={sastojci} dayNum={5} day="subota"></OneDayOfMeals>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Nedelja</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OneDayOfMeals sviSastojci={sastojci} dayNum={6} day="nedelja"></OneDayOfMeals>
                </AccordionDetails>
              </Accordion>

              <div>
                {submitError && <div className="error">{submitError}</div>}
                <button type="submit" className="submitButtonAdminTemplate">
                  Potvrdi
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    </div>
  );
};
export default AdminTempate;
