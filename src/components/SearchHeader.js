import Select from "react-select";

export default function SearchHeader({
  inputVal,
  sortOptions,
  sortValue,
  setSortValue,
}) {
  return (
    <div className="search__header">
      <p className="search__header_description">
        Aranan Kelime: <strong>{inputVal}</strong>
      </p>

      <Select
        placeholder="Sıralama"
        value={sortValue}
        isSearchable={false}
        onChange={(el) => setSortValue(el)}
        options={sortOptions}
      />
    </div>
  );
}
