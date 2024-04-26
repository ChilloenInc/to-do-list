import { useRecoilValue, useResetRecoilState } from "recoil";
import { images } from "../iconImage";
import "../style/list.css";
import TodoList from "./TodoList";
import { todoAtom, searchAtom } from "../store/atom";

const Container = ({ onTodoClick, hasText, todos }) => {
  //const todoValue = useRecoilValue(todoAtom);
  // useRecoilValue, useRecoilState, useSetRecoilState, useResetRecoilState
  const searchValue = useRecoilValue(searchAtom);
  const resetTodo = useResetRecoilState(todoAtom);

  const currentTodo = hasText ? searchValue : todos;

  return (
    <div className="inner">
      <button onClick={() => resetTodo()}>Clear</button>
      {Boolean(currentTodo) ? (
        <TodoList todos={currentTodo} onTodoClick={onTodoClick} />
      ) : (
        <div className="emptyFrom">
          <img src={images.empty} />
          <span>You have no to-dos</span>
        </div>
      )}
    </div>
  );
};

export default Container;
