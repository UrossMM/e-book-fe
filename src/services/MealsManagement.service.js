const fromBackToForm = (vals) => {
  const { mealsPerDay, name } = vals;
  let ponedeljak = { meals: mealsPerDay.filter((elm) => elm.day === 0) };
  let utorak = { meals: mealsPerDay.filter((elm) => elm.day === 1) };
  let sreda = { meals: mealsPerDay.filter((elm) => elm.day === 2) };
  let cetvrtak = { meals: mealsPerDay.filter((elm) => elm.day === 3) };
  let petak = { meals: mealsPerDay.filter((elm) => elm.day === 4) };
  let subota = { meals: mealsPerDay.filter((elm) => elm.day === 5) };
  let nedelja = { meals: mealsPerDay.filter((elm) => elm.day === 6) };
  return { ponedeljak, utorak, sreda, cetvrtak, petak, subota, nedelja, name };
};

const fromFormToBack = (vals) => {
  const { ponedeljak, utorak, sreda, cetvrtak, petak, subota, nedelja, name } =
    vals;

  let mealsPerDay = [];
  if (ponedeljak)
    mealsPerDay = [...ponedeljak?.meals?.map((elm) => ({ ...elm, day: 0 }))];

  if (utorak)
    mealsPerDay = [
      ...mealsPerDay,
      ...utorak?.meals?.map((elm) => ({ ...elm, day: 1 })),
    ];
  if (sreda)
    mealsPerDay = [
      ...mealsPerDay,
      ...sreda?.meals?.map((elm) => ({ ...elm, day: 2 })),
    ];
  if (cetvrtak)
    mealsPerDay = [
      ...mealsPerDay,
      ...cetvrtak?.meals?.map((elm) => ({ ...elm, day: 3 })),
    ];
  if (petak)
    mealsPerDay = [
      ...mealsPerDay,
      ...petak?.meals?.map((elm) => ({ ...elm, day: 4 })),
    ];
  if (subota)
    mealsPerDay = [
      ...mealsPerDay,
      ...subota?.meals?.map((elm) => ({ ...elm, day: 5 })),
    ];
  if (nedelja)
    mealsPerDay = [
      ...mealsPerDay,
      ...nedelja?.meals?.map((elm) => ({ ...elm, day: 6 })),
    ];

  return {
    name,
    mealsPerDay,
  };
};

export default {
  fromBackToForm,
  fromFormToBack,
};
