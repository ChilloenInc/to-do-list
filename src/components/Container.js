import "../style/list.css";

const Container = ({ todos, onTodoClick }) => {
  return (
    <div className="inner">
      <section className="box_wrap">
        {todos.map((todo, index) => (
          <article className="items" key={`todos=${index}`} onClick={() => onTodoClick(todo.id)}>
              <div className="list_form">
              <span className="list_title">{todo.title}</span>
              <p className="list_text">{todo.body}</p>
              </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Container;
