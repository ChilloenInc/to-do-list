import "../style/list.css";

const Container = ({ todos, onTodoClick }) => {
  return (
    <div className="inner">
      <ul className="box_wrap">
        {todos.map((todo, index) => (
          <li key={`todos=${index}`} onClick={() => onTodoClick(todo.id)}>
            <div className="items">
              <span className="list_title">{todo.title}</span>
              <p className="list_text">{todo.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Container;
