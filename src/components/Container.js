import { useRecoilValue, useResetRecoilState } from "recoil";
import { images } from "../iconImage";
import "../style/list.css";
import TodoList from "./TodoList";
import { todoAtom, searchAtom } from "../store/atom";

const Container = ({ onTodoClick, searchTerm }) => {
  const todoValue = useRecoilValue(todoAtom);
  const searchValue = useRecoilValue(searchAtom);
  const resetTodo = useResetRecoilState(todoAtom);
  // useRecoilValue, useRecoilState, useSetRecoilState, useResetRecoilState

  const currentTodo = searchTerm ? searchValue : todoValue;
  return (
    <div className="inner">
      <button onClick={() => resetTodo()}>Clear</button>
      {Boolean(currentTodo) ? (
        <TodoList todos={currentTodo} onTodoClick={onTodoClick} />
      ) : (
        <div className="emptyFrom">
          <img className="emptyImg" src={images.empty} />
          <span className="emptyTag">You have no to-dos</span>
        </div>
      )}
    </div>
  );
};

export default Container;
