import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import SearchFilters from "./components/SearchFilters";
import SearchHeader from "./components/SearchHeader";
import SearchResults from "./components/SearchResults";

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorFilterVal, setColorFilterVal] = useState();
  const [brandFilterVal, setBrandFilterVal] = useState();
  const [sortValue, setSortValue] = useState();
  const [storageData, setStorageData] = useState();

  useEffect(() => {
    setStorageData(JSON.parse(localStorage.getItem("basket")));
  }, []);

  const sortOptions = [
    { label: "En Düşük Fiyat", value: "lowestPrice" },
    { label: "En Yüksek Fiyat", value: "highestPrice" },
    { label: "En Yeniler (A-Z)", value: "newestAtoZ" },
    { label: "En Yeniler (Z-A)", value: "newestZtoA" },
  ];

  return (
    <div className="App">
      <Header
        inputVal={inputVal}
        setInputVal={setInputVal}
        storageData={storageData}
        setStorageData={setStorageData}
      />
      <hr />
      <SearchHeader
        inputVal={inputVal}
        sortOptions={sortOptions}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <div className="search__content-wrapper">
        <SearchFilters
          brands={brands}
          colors={colors}
          sortOptions={sortOptions}
          colorFilterVal={colorFilterVal}
          brandFilterVal={brandFilterVal}
          sortValue={sortValue}
          setColorFilterVal={setColorFilterVal}
          setBrandFilterVal={setBrandFilterVal}
          setSortValue={setSortValue}
        />
        <SearchResults
          inputVal={inputVal}
          setBrands={setBrands}
          setColors={setColors}
          setSortValue={setSortValue}
          colorFilterVal={colorFilterVal}
          brandFilterVal={brandFilterVal}
          sortValue={sortValue}
          storageData={storageData}
          setStorageData={setStorageData}
        />
      </div>
    </div>
  );
}
