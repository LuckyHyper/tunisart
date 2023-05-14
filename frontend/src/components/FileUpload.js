import React from 'react';
import upload_icon from '../assets/upload-icon.png';

function FileUpload(props) {
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    if (props.setSignUp) props.setSignUp({ ...props.signUp, CV: file });
    if (props.updateSubmit) props.updateSubmit(file);
    if (props.setForm) props.setForm({ ...props.form, icon: file });
  };
  return (
    <div
      className="file-upload"
      style={{ height: props.height, width: props.width }}
    >
      <input type="file" onChange={uploadHandler} />
      <button>
        <img src={upload_icon} alt="" width="30px" height="30px" />
      </button>
    </div>
  );
}

export default FileUpload;
