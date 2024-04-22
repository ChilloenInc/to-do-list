import React, { useState } from "react";
import Navbar from "./components/Nav";
import Container from "./components/Container";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editIndex, setEditTodoId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 상태가 꼬이기 떄문에 전역상태관리 라이브러리 -> Redux, Recoil
  // 컴포넌트 추상화
  const handleSearchButtonClick = () => {
    setIsSearching(true);
    setIsAdding(false);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
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
    setTitle(title);
    setBody(body);
  };

  const handleBack = () => {
    if (isSearching) {
      setIsSearching(false);
    } else {
      if (editIndex !== null) {
        const confirmDelete = window.confirm(
          "Are you sure you want to remove everything"
        );
        if (confirmDelete) {
          setEditTodoId(null);
          setIsAdding(false);
          setTitle("");
          setBody("");
        }
      } else {
        setIsAdding(false);
        setTitle("");
        setBody("");
      }
    }
  };

  const handleSave = () => {
    if (title !== "" && body !== "") {
      const updatedTodos = [...todos];
      if (editIndex !== null) {
        updatedTodos[editIndex] = { title, body };
        setIsEditing(false);
      } else {
        updatedTodos.push({ title, body });
      }
      setTodos(updatedTodos);
      setIsAdding(false);
      setEditTodoId(null);
      setTitle("");
      setBody("");
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar
        onSearchButtonClick={handleSearchButtonClick}
        onSearch={handleSearchTerm}
        isSearching={isSearching}
        isAdding={isAdding}
        isEditing={isEditing}
        onAdd={handleAdd}
        onBack={handleBack}
        onSave={handleSave}
      />
      {isAdding ? (
        <div className="form">
          <input
            className="form_title"
            type="text"
            value={title}
            placeholder="Tittle"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form_text"
            value={body}
            placeholder="Description"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      ) : (
        <Container
          todos={filteredTodos}
          onTodoClick={handleTodoClick}
          setEditIndex={setEditTodoId}
          onEdit={handleSave}
          editIndex={editIndex}
        />
      )}
    </div>
  );
};

export default App;
