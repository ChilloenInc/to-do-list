import React, { useEffect, useReducer, useState } from "react";
import Navbar from "./components/Nav";
import Container from "./components/Container";
import Form from "./components/Form";
import "../src/style/form.css";
import "./style/index.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoAtom, searchAtom } from "./store/atom";
import { type } from "@testing-library/user-event/dist/type";

// 추상황 -> 재사용성 up, 테스트하기 용이
// 리스트, 검색상태, 조회상태, 수정상태
// 리스트 = 할일을 보여주면 되고
// 검색상태 = 리스트에 필터건 할일 보여주면 되고
// 수정상태 = 선택한 할일 보여주면 되고

// ! 이 방법이 베스트임. 함수 추상화 -> 함수형프로그래밍 -> 단점: 코드량 많아서
// ui - 비지니스 로직 분리를 하자.
//1. react-hooks(custom-hooks), 2.컴포넌트 단에서 나누는 방법

const App = () => {
  const [todos, setTodos] = useRecoilState(todoAtom);
  const setSearchResults = useSetRecoilState(searchAtom);
  const [id, setId] = useState(3);
  const [editTodoId, setEditTodoId] = useState(null);
  // ! 역이는것은 하나로 모아주는것이 중요하다. => 객체로 관리
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState('DEFAULT');
  const [content, setContent] = useState({
    title: "",
    body: "",
  });
  
  const filterTodo = (action) => {
    const copyTodos =  [...todos]

    const lookupTable = {
    'ADD': [ ...todos, {
          id: id + 1,
          title: content.title, 
          body: content.body 
          }
        ],
    'EDIT': copyTodos.map((todo) => todo.id === editTodoId ? 
            { ...todo, title: content.title, body: content.body } : todo
        ),

    "DEFAULT": todos,
    }
    return lookupTable[['ADD', 'EDIT'].includes(action) ? action : 'DEFAULT']
  };

  // 상태가 꼬이기 떄문에 전역상태관리 라이브러리 -> Redux, Recoil
  // 컴포넌트 추상화
  const handleContent = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setAction('DEFAULT');
    setEditTodoId(null);
    setSearchTerm(null)
    setContent({ title: "", body: "" });
  };

  const handleSearchButtonClick = () => {
    setAction('SEARCH');
  };

  const handleAdd = () => {
    setAction('ADD');
  };

  const handleEditTodoClick = (id) => {
    setAction('EDIT');
    setEditTodoId(id);
    const editTodo = todos.find((todo) => todo.id === id);
    const { title, body } = editTodo;
    setContent({ title: title, body: body });
  };

  const handleBack = () => {
    if (action === 'SEARCH') {
      handleReset();
    } else {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove everything"
      );
      if (confirmDelete) {
        handleReset();
      }
    }
  };

  const handleSave = () => {
    if (content.title !== "" && content.body !== "") {
      const actionType = editTodoId !== null ? 'EDIT' : 'ADD';
      setTodos(filterTodo(actionType, content));
      if (actionType === 'ADD') {
        setId(id + 1);
      }
      handleReset();
    } else {
      alert("내용을 입력하세요");
    }
  };

  const handleFilterTodoList = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const filteredTodos = todos.filter((todo) =>todo.title.toLowerCase()
     .includes(searchTerm.toLowerCase()));
     setSearchResults(filteredTodos);
  };

  return (
    <div className="App">
      <Navbar
        onSearchButtonClick={handleSearchButtonClick}
        onSearch={handleFilterTodoList}
        onAdd={handleAdd}
        onBack={handleBack}
        onSave={handleSave}
        action={action}
      />
      {action === 'ADD' || action === 'EDIT' ? (
        <Form content={content} 
              handleContent={handleContent} />
      ): (
        <Container hasText={searchTerm} 
                  onTodoClick={handleEditTodoClick} 
                  todos={filterTodo(action)} 
        />
      )}
    </div>
  );
};

export default App;
