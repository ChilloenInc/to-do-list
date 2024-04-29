import React, { useEffect, useState } from "react";
import "../style/nav.css";
import { images } from "../iconImage";
import { act } from "react-dom/test-utils";

const Navbar = ({
  onSearchButtonClick,
  onSearch,
  onAdd,
  onBack,
  onSave,
  action
}) => {
  
  const [titleText, setTitleText] = useState("Todo");

  useEffect(() => {
    if (action === 'ADD') {
      setTitleText("Add");
    } 
    if (action === 'EDIT') {
      setTitleText("Edit");
    } 
    else if(action === 'DEFAULT'){
      setTitleText("Todo");
    }
  }, [action]);

  const handleSearchTerm = (searchTerm) => {
    onSearchButtonClick();
    onSearch(searchTerm);
  };

  return (
    <nav className="nav">
      {
        (action !== 'DEFAULT') &&  
      <button onClick={onBack}> 
        <img src={images.back} alt="icon"></img>
      </button>
      }
      
      <div className="textbox">
      {
      (action === 'SEARCH') ? (
        <div className="search-wrap">
          <input type="text" placeholder="검색" onChange={(e) => { handleSearchTerm(e.target.value);}} />
        </div>
      ) : (
        <span className="titleText">{titleText}</span>
      )}
      </div>
      
      <div className="buttons">
        { action === 'DEFAULT' &&
        <div>
          <button onClick={onSearchButtonClick}> 
            <img src={images.search} alt="icon"></img>
          </button>

          <button onClick={onAdd}>
            <img src={images.add} alt="icon"></img>
          </button>
        </div>
        }
        { (action === 'ADD' || action === 'EDIT') &&  
          <button onClick={onSave}>
            { action === 'ADD' ? 
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
