import { images } from "../iconImage";
import "../style/list.css";
import TodoList from "./TodoList";

const Container = ({ todos, onTodoClick }) => {

  return (
    <div className="inner">
      {todos.length ?
      <TodoList todos={todos} onTodoClick={onTodoClick} />
      : <div className="emptyFrom">
          <img className="emptyImg" src={images.empty} />
          <span className="emptyTag">You have no to-dos</span>
        </div>
      }
    </div>
  );
};

export default Container;
