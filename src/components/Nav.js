import React, { useEffect, useState } from "react";
import "../style/nav.css";
import { images } from "../iconImage";

const Navbar = ({
  onSearchButtonClick,
  onSearch,
  onAdd,
  onBack,
  onSave,
  status
}) => {
  
  const [titleText, setTitleText] = useState("Todo");

  useEffect(() => {
    if (status.isAdding) {
      setTitleText("Add");
    } 
    if (status.isEditing) {
      setTitleText("Edit");
    } 
    else if(!status.isAdding && !status.isEditing){
      setTitleText("Todo");
    }
  }, [status]);

  const handleSearchTerm = (searchTerm) => {
    onSearchButtonClick();
    onSearch(searchTerm);
  };

  return (
    <nav className="nav">
      {
        (status.isAdding || status.isSearching || status.isEditing ) &&  
      <button onClick={onBack}> 
        <img src={images.back} alt="icon"></img>
      </button>
      }
      
      <div className="textbox">
      {
      status.isSearching ? (
        <div className="search-wrap">
          <input type="text" placeholder="검색" onChange={(e) => { handleSearchTerm(e.target.value);}} />
        </div>
      ) : (
        <span className="titleText">{titleText}</span>
      )}
      </div>
      
      <div className="buttons">
        { !status.isAdding && !status.isSearching && !status.isEditing &&
        <div>
          <button onClick={onSearchButtonClick}> 
            <img src={images.search} alt="icon"></img>
          </button>

          <button onClick={onAdd}>
            <img src={images.add} alt="icon"></img>
          </button>
        </div>
        }
        { (status.isAdding || status.isEditing) &&  
          <button onClick={onSave}>
            { status.isAdding ? 
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
