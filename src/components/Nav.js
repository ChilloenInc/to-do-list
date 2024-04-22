import React, { useEffect, useState } from 'react';
import '../style/nav.css';
import {images} from '../iconImage';

const Navbar = ({ onSearchButtonClick, onSearch, isAdding, onAdd, onBack, onSave, isEditing, isSearching }) => {
  
  const [titleText, setTitleText] = useState('Todo');

  useEffect(() => {
    if (isAdding) {
      setTitleText('Add');
      if(isEditing) {
        setTitleText('Edit');
      }
    } else {
      setTitleText('Todo');
    }
  }, [isAdding, isEditing]);

  return (
    <nav className='nav'>

      {isSearching ? (
        <div className='search-wrap'>
          <input 
            type="text"
            placeholder="검색"
            onChange={onSearch}
          />
        </div>
      ): (
        <span className='titleText'>{titleText}</span>
      )}

    <div className='buttons'>
      {!isSearching && !isAdding && (
          <button onClick={onSearchButtonClick}>
            <img src={images.search}></img>
          </button>
      )}
      {
        isSearching && (
          <button onClick={onBack}>
            <img src={images.back}></img>
          </button>
        )
      }
      {!isSearching && !isAdding && (
          <button onClick={onAdd}>
            <img src={images.add}></img>
          </button>
      )}
      {
        isAdding && (
        <>
          <button onClick={onSave}>
            <img src={images.submit}></img>
          </button>
          <button onClick={onBack}>
            <img src={images.back}></img>
          </button>
        </>
      )}
    </div>
  </nav>
  );
};

export default Navbar;
