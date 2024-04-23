import React, { useEffect, useState } from "react";
import "../style/nav.css";
import { images } from "../iconImage";

const Navbar = ({
  onSearchButtonClick,
  onSearch,
  isAdding,
  onAdd,
  onBack,
  onSave,
  isEditing,
  isSearching,
}) => {
  const [titleText, setTitleText] = useState("Todo");
  const [serchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isAdding) {
      setTitleText("Add");
      if (isEditing) {
        setTitleText("Edit");
      }
    } else {
      setTitleText("Todo");
    }
  }, [isAdding, isEditing]);

  const handleSearchTerm = (searchTerm) => {
    onSearchButtonClick();
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
  }

  return (
    <nav className="nav">
      {isSearching ? (
        <div className="search-wrap">
          <input type="text" placeholder="검색" onChange={(e) => {
            handleSearchTerm(e.target.value);
          }} />
        </div>
      ) : (
        <span className="titleText">{titleText}</span>
      )}

      <div className="buttons">
        {!isSearching && !isAdding && (
          <button onClick={onSearchButtonClick}> 
            <img src={images.search} alt="icon"></img>
          </button>
        )}
        {isSearching && (
          <button onClick={onBack}> 
            <img src={images.back} alt="icon"></img>
          </button>
        )}
        {!isSearching && !isAdding && (
          <button onClick={onAdd}>
            <img src={images.add} alt="icon"></img>
          </button>
        )}
        {isAdding && (
          <>
            <button onClick={onSave}>
              <img src={images.submit} alt="icon"></img>
            </button>
            <button onClick={onBack}>
              <img src={images.back} alt="icon"></img>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
