import React, { useEffect } from "react";
import { Field, useForm } from "react-final-form";
import { MenuItem, Select } from "@material-ui/core";
import { FieldArray, useFieldArray } from "react-final-form-arrays";

const Ingredient = ({ indexSastojka, nameSastojka, day, sviSastojci, indexMeal }) => {
  const { mutators, change } = useForm();
  const s = `meals`;
  useEffect(() => {
    //change(`${name}.timeToEat`, index);
    //change(`${name}.day`, day)
  }, []);

  return (
    <div>
      <Field name={`${nameSastojka}name`} component="select" className="selectIngredientElements">
        <option />
        {sviSastojci.map((sastojak) => (
          <option value={sastojak}>{sastojak}</option>
        ))}
      </Field>
      <Field
        name={`${nameSastojka}mass`}
        component="input"
        type="number"
        placeholder="Masa(g)"
        className="masaInputIngredientElement"
      />
      {/* <button
        type="button"
        className="removeIngredientButton"
        onClick={() => {
          console.log(indexSastojka);
          console.log(`${day}.meals.ingredient`);
          mutators.remove(`${day}.meals.ingredient`, indexSastojka);
        }}
      >
        Izbaci 
      </button> */}
    </div>
  );
};
export default Ingredient;
