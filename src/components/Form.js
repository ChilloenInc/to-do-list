import React from "react";

const Form = ({ content, handleContent }) => {

  return (
    <div className="form">
      <div className="form_box">
        <input
          className="form_title"
          type="text"
          name="title"
          value={content.title}
          placeholder="Title"
          onChange={handleContent}
        />
        <textarea
          name="body"
          className="form_text"
          value={content.body}
          placeholder="Description"
          onChange={handleContent}
        />
      </div>
    </div>
  );
};

export default Form;
