import React from "react";
import { Form, Field } from "react-final-form";
import { FieldArray, useFieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import Meal from "./Meal";

const OneDayOfMeals = ({sviSastojci, day, dayName, dayNum}) => {
  const Controlls = () => { //controlls je komponenta koja predstavlja button koji na klik kreira inpute za jedan obrok u odredjenom danu (kreira jedan field)
    const {
      fields: { push },     //fields su inputi za jedan obrok u odredjenom danu i oni se mapiraju u Meal
    } = useFieldArray(`${day}.meals`);
    return (
      <div>
        <button
          className="addMealButton"
          type="button"
          onClick={() => {
            push({});
          }}
        >
          + Dodaj obrok
        </button>
      </div>
    );
  };
//fieldarray su svi fields u okviru jednog dana
  return (
    <div className="oneDayOfMeals">
      {/* <span>{dayName}</span> */}
      <Controlls></Controlls>
      <FieldArray className="fieldArrayOneDayOfMeals" name={`${day}.meals`}> 
        {({ fields, meta }) => {
          return fields.map((name, index) => (
            <Meal index={index} name={name} day={day} sviSastojci={sviSastojci} dayNum={dayNum}></Meal> 
            
          ));
        }}
      </FieldArray>
    </div>
  );
};
export default OneDayOfMeals;
