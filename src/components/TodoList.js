import "../style/list.css";

const TodoList = ({todos, onTodoClick}) => {
    return (
        <section className="box_wrap">
        {
        todos.map((todo, index) => (
            <article className="items" key={`todos=${index}`} onClick={() => onTodoClick(todo.id)}>
                <div>
                <span className="list_title">{todo.title}</span>
                <p className="list_text">{todo.body}</p>
                </div>
            </article>))
        }
      </section>
    );

}
export default TodoList;