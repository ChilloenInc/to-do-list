import React from "react";

const Form = ({ title, body, setTitle, setBody }) => {
  return (
    <div className="form">
      <div className="form_box">
        <input
          className="form_title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form_text"
          value={body}
          placeholder="Description"
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Form;
