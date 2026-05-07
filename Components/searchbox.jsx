import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Button from "@mui/material/Button";

function Searchbox(props) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (props.onSearch && query.trim()) {
      props.onSearch(query.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbox">
      <input
        type="text"
        placeholder={props.text}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button className="circle" onClick={handleSearch}>
        <IoIosSearch />
      </Button>
    </div>
  );
}

export default Searchbox;
