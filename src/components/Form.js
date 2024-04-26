import React from "react";

const Form = ({ content, handleContent }) => {

  return (
    <div className="form">
      <div>
        <input
          type="text"
          name="title"
          value={content.title}
          placeholder="Title"
          onChange={handleContent}
        />
        <textarea
          name="body"
          value={content.body}
          placeholder="Description"
          onChange={handleContent}
        />
      </div>
    </div>
  );
};

export default Form;
