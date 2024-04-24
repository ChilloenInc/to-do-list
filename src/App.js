import React, { useState } from "react";
import Navbar from "./components/Nav";
import Container from "./components/Container";
import Form from "./components/Form";
import "../src/style/form.css";
import "./style/index.css";

const initTodo = [
  {
    id: 1,
    title: "React",
    body: "React is",
  },
  {
    id: 2,
    title: "JS",
    body: "JS is",
  },
  {
    id: 3,
    title: "Todo",
    body: "Todo something...",
  },
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
  //const [title, setTitle] = useState("");
  //const [body, setBody] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [content, setContent] = useState({
    title:'',
    body:'',
  })
  // 상태가 꼬이기 떄문에 전역상태관리 라이브러리 -> Redux, Recoil
  // 컴포넌트 추상화
  const handleContent = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearchButtonClick = () => {
    setIsSearching(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setIsSearching(false);
    setIsEditing(false);
  };

  const handleTodoClick = (id) => {
    setIsEditing(true);
    setIsAdding(true);
    setIsSearching(false);
    setEditTodoId(id);
    const editTodo = todos.find((todo) => todo.id === id);
    const { title, body } = editTodo;
    setContent({title:title, body:body});
  };

  const handleBack = () => {
    if (isSearching) {
      setIsSearching(false);
      setSearchTerm("");
    } else {
      console.log(editTodoId)
      if (editTodoId !== null) {
        const confirmDelete = window.confirm(
          "Are you sure you want to remove everything"
        );
        if (confirmDelete) {
          setEditTodoId(null);
          setIsAdding(false);
          setIsEditing(false);
          setContent({title:"", body:""});
        }
      } 
    }        
    setIsEditing(false)
    setIsAdding(false);
    setContent({title:"", body:""});
  };

  const handleSave = () => {
    console.log(content)
    if (content.title !== '' && content.body !== '') {
      const updatedTodos = [...todos];
      console.log(editTodoId)
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
      {isAdding || isEditing ? 
        <Form content={content}
              handleContent={handleContent}
        /> : (
        <Container
          todos={searchTerm ? searchResults : todos}
          onTodoClick={handleTodoClick}
        />
      )}
    </div>
  );
};

export default App;