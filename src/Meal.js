import React, { useEffect } from "react";
import { Field, useForm } from "react-final-form";
import {
  MenuItem,
  Select
} from "@material-ui/core";
import { FieldArray, useFieldArray } from "react-final-form-arrays";
import Ingredient from "./Ingredient";

const Meal = ({ index, name, day, sviSastojci, dayNum }) => {
  const { mutators, change } = useForm();
  useEffect(() => {
    change(`${name}.timeToEat`, index);
    change(`${name}.day`, dayNum);

    //change(`${name}.day`, day)
  }, []);

  const Controlls = () => { 
    const {
      fields: { push },     
    } = useFieldArray(`${name}.ingredient`);
    return (
      <div>
        <button
          //className="addMealButton"
          type="button"
          onClick={() => {
            push({});
          }}
        >
          + Dodaj namirnicu
        </button>
      </div>
    );
  };


  return (
    <div className="divMealElement">
      <div className="divMealElementInputs">
      <div className="divMealElementExcludeRecept">
      <Field
        name={`${name}name`}
        component="input"
        type="text"
        placeholder="Ime"
        className="imeInputMealElement"
      />
      {/* <Field
        name={`${name}ingredient`}
        component="input"
        type="text"
        placeholder="Sastojci"
        className="sastojciInputMealElement"
      /> */}
      {/* <Field
        name={`${name}calories`}
        component="input"
        type="number"
        placeholder="Kalorije"
        className="kalorijeInputMealElement"
      /> */} 
      <Controlls></Controlls>
      <FieldArray className="fieldArrayOneDayOfMeals" name={`${name}.ingredient`}> 
        {({ fields, meta }) => {
          return fields.map((ingName, indexSastojka) => (
            <Ingredient indexSastojka={indexSastojka} nameSastojka={ingName} day={day} sviSastojci={sviSastojci} indexMeal={index}></Ingredient> 
          ));
        }}
      </FieldArray>
      
      {/* <Field name = {`${name}ingredient[0].name`} component = "select" >
      <option />
      {
                  sviSastojci.map((sastojak) => (
                    <option value={sastojak}>{sastojak}</option>
                  ))
                }
        
        </Field>
      <Field
        name={`${name}ingredient[0].mass`}
        component="input"
        type="number"
        placeholder="Masa(g)"
        className="masaInputMealElement"
      /> */}
      </div>
      <div className="divMealElementIncludeRecept">
        <Field
          name={`${name}recipe`}
          component="input"
          type="text"
          placeholder="Recept"
          className="receptInputMealElement"
        />
      </div>
        <hr className="hrMealElement"></hr>
      </div>
      <button
        type="button"
        className="removeMealButton"
        onClick={() => {
          console.log(`${day}.meals`);
          mutators.remove(`${day}.meals`, index);
        }}
      >
        Izbaci obrok
      </button>
    </div>
  );
};
export default Meal;
