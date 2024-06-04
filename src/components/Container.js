import { useRecoilValue, useResetRecoilState } from "recoil";
import "../style/list.css";
import TodoList from "./TodoList";
import { todoAtom, searchAtom } from "../store/atom";
import EmptyForm from "./EmptyForm";

const Container = ({ onTodoClick, hasText, todos }) => {
  //const todoValue = useRecoilValue(todoAtom);
  // useRecoilValue, useRecoilState, useSetRecoilState, useResetRecoilState
  //const resetTodo = useResetRecoilState(todoAtom);
  const searchValue = useRecoilValue(searchAtom);
  const currentTodo = hasText ? searchValue : todos;

  return (
    <div className="inner">
      {/* <button onClick={() => resetTodo()}>Clear</button> */}
      {Boolean(currentTodo.length) ? (
        <TodoList todos={currentTodo} onTodoClick={onTodoClick} />
      ) : (
        <EmptyForm/>
      )}
    </div>
  );
};

export default Container;
