import { useEffect, useState } from "react";
import { fetchPhones, fetchFilteredPhones } from "../services/service";

export default function SearchResults({
  inputVal,
  setBrands,
  setColors,
  setSortValue,
  colorFilterVal,
  brandFilterVal,
  storageData,
  setStorageData,
  sortValue,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(null);
  const [filteredSearchResults, setFilteredSearchResults] = useState();
  const [searchResults, setSearchResults] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const handlePageNumb = (type) => {
    if (type === "increase" && pageNumber < Math.ceil(totalCount / 12))
      setPageNumber(pageNumber + 1);
    else if (type === "decrease" && pageNumber > 1)
      setPageNumber(pageNumber - 1);
  };

  const getPhones = (val) => {
    fetchPhones(val, (response, totalCount) => {
      setSearchResults(response);
      setFilteredSearchResults(response);
      setTotalCount(totalCount);
    });
  };

  const addBasket = (result) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = [result];
    } else {
      const isExist = basket.find((item) => item.id === result.id);
      if (!isExist) basket.push(result);
      else return;
    }

    setStorageData(basket);
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  useEffect(() => {
    if (sortValue && filteredSearchResults) {
      if (sortValue.value === "highestPrice") {
        const newArr = [...filteredSearchResults].sort(
          (a, b) => b.price - a.price
        );
        setFilteredSearchResults(newArr);
      } else {
        const newArr = [...filteredSearchResults].sort(
          (a, b) => a.price - b.price
        );
        setFilteredSearchResults(newArr);
      }
    }
  }, [sortValue]);

  useEffect(() => {
    let newResults = null;

    if (searchResults) {
      if (colorFilterVal) {
        newResults = searchResults.filter(
          (item) => item.color === colorFilterVal
        );
      }
      if (brandFilterVal) {
        if (newResults)
          newResults = newResults.filter(
            (item) => item.brand === brandFilterVal
          );
        else
          newResults = searchResults.filter(
            (item) => item.brand === brandFilterVal
          );
      }

      if (newResults) setFilteredSearchResults(newResults);
      else setFilteredSearchResults(searchResults);
    } else setFilteredSearchResults();
  }, [colorFilterVal, brandFilterVal, searchResults]);

  useEffect(() => {
    const brands = [];
    const colors = [];
    searchResults?.forEach((result) => {
      if (!brands.includes(result.brand)) brands.push(result.brand);
      if (!colors.includes(result.color)) colors.push(result.color);
    });

    setColors(colors);
    setBrands(brands);
    setSortValue();
  }, [searchResults]);

  useEffect(() => {
    if (pageNumber) getPhones(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const newPages = [];
    if (totalCount) {
      for (let i = 0; i < Math.ceil(totalCount / 12); i++) {
        newPages.push(i + 1);
      }
      setPages(newPages);
    } else setPages(null);
  }, [totalCount]);

  useEffect(() => {
    if (inputVal?.length >= 2) {
      fetchFilteredPhones(inputVal, (response) => {
        setSearchResults(response);
        setFilteredSearchResults(response);
        setTotalCount(null);
      });
    } else if (!inputVal) {
      getPhones(1);
      setPageNumber(1);
    }
  }, [inputVal]);

  return (
    <div className="search__results">
      <div className="search__results__content">
        {filteredSearchResults?.map((result) => (
          <div
            onClick={() => {
              addBasket(result);
            }}
            key={result.id}
            className="search__results__item"
          >
            <img
              className="search__results__item__image"
              src="https://media.istockphoto.com/vectors/smart-phone-realistic-mobile-phone-smartphone-with-blank-screen-on-vector-id834343646"
              alt="Telefon"
            />
            <p className="search__results__item__name">{result.name}</p>
            <div className="search__results__item__brand">
              <strong>Marka:</strong> {result.brand}
            </div>
            <div className="search__results__item__color">
              <strong>Renk:</strong> {result.color}
            </div>
            <div className="search__results__item__price">
              <strong>{result.price} TL</strong>
            </div>

            {storageData?.find((item) => item.id === result.id) ? (
              <div className="search__results__item__basket passive">
                Bu ürünü sepete ekleyemezsiniz.
              </div>
            ) : (
              <div className="search__results__item__basket">Sepete Ekle</div>
            )}
          </div>
        ))}
      </div>

      {pages && (
        <div className="search__results__pages">
          <button onClick={() => handlePageNumb("decrease")}>&#60;</button>

          {pages.map((page) => (
            <button
              className={pageNumber === page ? "active" : ""}
              key={page}
              onClick={() => setPageNumber(page)}
            >
              {page}
            </button>
          ))}

          <button onClick={() => handlePageNumb("increase")}>&#62;</button>
        </div>
      )}
    </div>
  );
}
