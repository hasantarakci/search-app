import { useEffect, useState } from "react";

export default function SearchFilters({
  brands,
  colors,
  sortOptions,
  colorFilterVal,
  brandFilterVal,
  sortValue,
  setColorFilterVal,
  setBrandFilterVal,
  setSortValue,
}) {
  const [categories, setCategories] = useState(null);

  const tempCategories = {
    color: {
      id: 1,
      header: "Renk",
      options: [],
    },
    sorting: {
      id: 2,
      header: "Sıralama",
      options: sortOptions,
    },
    brand: { id: 3, header: "Marka", options: [] },
  };

  useEffect(() => {
    const newBrands = [];
    const newColors = [];

    brands.forEach((brand) => {
      newBrands.push(brand);
    });

    colors.forEach((color) => {
      newColors.push(color);
    });

    tempCategories.color.options = newColors;
    tempCategories.brand.options = newBrands;

    setCategories(tempCategories);
  }, [brands, colors]);

  return (
    categories && (
      <div className="search__filters">
        <div>
          <h4>{categories.color.header}</h4>
          {categories.color.options.map((item) => (
            <p
              key={item}
              onClick={() =>
                colorFilterVal === item
                  ? setColorFilterVal()
                  : setColorFilterVal(item)
              }
              className={`search__filters__item${
                colorFilterVal === item ? " active" : ""
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        <div>
          <h4>{categories.sorting.header}</h4>
          {categories.sorting.options.map((item) => (
            <p
              className={`search__filters__item${
                sortValue?.value === item.value ? " active" : ""
              }`}
              onClick={() => setSortValue(item)}
              key={item.value}
            >
              {item.label}
            </p>
          ))}
        </div>

        <div>
          <h4>{categories.brand.header}</h4>
          {categories.brand.options.map((item) => (
            <p
              key={item}
              onClick={() =>
                brandFilterVal === item
                  ? setBrandFilterVal()
                  : setBrandFilterVal(item)
              }
              className={`search__filters__item${
                brandFilterVal === item ? " active" : ""
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    )
  );
}
