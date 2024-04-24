import React, { useState } from "react";
import Navbar from "./components/Nav";
import Container from "./components/Container";
import Form from "./components/Form";
import "../src/style/form.css";
import "./style/index.css";

const initTodo = [
  // {
  //   id: 1,
  //   title: "React",
  //   body: "React is",
  // },
  // {
  //   id: 2,
  //   title: "JS",
  //   body: "JS is",
  // },
  // {
  //   id: 3,
  //   title: "Todo",
  //   body: "Todo something...",
  // },
];

// 추상황 -> 재사용성 up, 테스트하기 용이
// 리스트, 검색상태, 조회상태, 수정상태
// 리스트 = 할일을 보여주면 되고
// 검색상태 = 리스트에 필터건 할일 보여주면 되고
// 수정상태 = 선택한 할일 보여주면 되고

// ! 이 방법이 베스트임. 함수 추상화 -> 함수형프로그래밍 -> 단점: 코드량 많아서
// ui - 비지니스 로직 분리를 하자.
//1. react-hooks(custom-hooks), 2.컴포넌트 단에서 나누는 방법

const App = () => {
  const [todos, setTodos] = useState(initTodo);
  const [id, setId] = useState(4);
  const [editTodoId, setEditTodoId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [content, setContent] = useState({
    title:'',
    body:'',
  });

  // 상태가 꼬이기 떄문에 전역상태관리 라이브러리 -> Redux, Recoil
  // 컴포넌트 추상화
  const handleContent = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    })
  };

  const handleSearchButtonClick = () => {
    setIsSearching(true);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setIsSearching(false);
    setIsEditing(false);
  };

  const handleEditTodoClick = (id) => {
    setIsSearching(false);
    setIsAdding(false);
    setIsEditing(true);
    setEditTodoId(id);
    const editTodo = todos.find((todo) => todo.id === id);
    const { title, body } = editTodo;
    setContent({title:title, body:body});
  };

  const handleBack = () => {
    console.log(isAdding, isEditing, isSearching)
    if(isAdding) {
      const confirmDelete  = window.confirm(
        "Are you sure you want to remove everything"
      );
      if(confirmDelete){
        setIsAdding(false);
        setContent({title:"", body:""});
      }
    }
    if(isEditing){
      const confirmDelete  = window.confirm(
        "Are you sure you want to remove everything"
      );
      if(confirmDelete){
        setIsEditing(false);
        setContent({title:"", body:""});
      }
      if(isSearching){
        setIsSearching(false);
        setSearchTerm("");
      }
    }
  };

  const handleSave = () => {
    console.log(content)
    if (content.title !== '' && content.body !== '') {
      const updatedTodos = [...todos];
      if (editTodoId !== null) {
        const index = updatedTodos.findIndex(todo => todo.id === editTodoId);
        updatedTodos[index] = { id: editTodoId, title: content.title , body: content.body }; 
      } else {
        updatedTodos.push({ id: id, title: content.title , body: content.body }); 
        setId(id + 1); 
      }
      setTodos(updatedTodos);
      setIsAdding(false);
      setIsEditing(false);
      setIsSearching(false);
      setSearchTerm(null);
      setEditTodoId(null);
      setContent({title:"", body:""});
    } else {
      alert('내용을 입력하세요')
    }
  };

  const handleFilterTodoList = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredTodos);
  };
  
  return (
    <div className="App">
      <Navbar
        onSearchButtonClick={handleSearchButtonClick}
        onSearch={handleFilterTodoList}
        isSearching={isSearching}
        isAdding={isAdding}
        isEditing={isEditing}
        onAdd={handleAdd}
        onBack={handleBack}
        onSave={handleSave}
      />
      { isAdding || isEditing ? 
        <Form content={content}
              handleContent={handleContent}
        /> : (
        <Container
          todos={searchTerm ? searchResults : todos}
          onTodoClick={handleEditTodoClick}
        />
      )}
    </div>
  );
};

export default App;