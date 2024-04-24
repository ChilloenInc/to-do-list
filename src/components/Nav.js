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

  useEffect(() => {
    if (isAdding) {
      setTitleText("Add");
    } 
    if (isEditing) {
      setTitleText("Edit");
    } 
    else if(!isAdding && !isEditing){
      setTitleText("Todo");
    }
  }, [isAdding,isEditing,isSearching]);

  const handleSearchTerm = (searchTerm) => {
    onSearchButtonClick();
    onSearch(searchTerm);
  };

  return (
    <nav className="nav">
      {
        (isAdding || isSearching || isEditing ) &&  
      <button onClick={onBack}> 
        <img src={images.back} alt="icon"></img>
      </button>
      }
      
      <div className="textbox">
      {isSearching ? (
        <div className="search-wrap">
          <input type="text" placeholder="검색" onChange={(e) => {
            handleSearchTerm(e.target.value);
          }} />
        </div>
      ) : (
        <span className="titleText">{titleText}</span>
      )}
      </div>
      
      <div className="buttons">
        { !isAdding && !isSearching && !isEditing &&
        <div>
          <button onClick={onSearchButtonClick}> 
            <img src={images.search} alt="icon"></img>
          </button>

          <button onClick={onAdd}>
            <img src={images.add} alt="icon"></img>
          </button>
        </div>
        }
        { (isAdding || isEditing) &&  
          <button onClick={onSave}>
            { isAdding ? 
              <img src={images.check} alt="icon"></img> : 
              <img src={images.submit} alt="icon"></img>
            }
          </button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
