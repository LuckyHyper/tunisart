import React, { useState } from 'react';

function ContactUs() {
  const [message, setMessage] = useState({
    email: '',
    message: '',
  });
  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  return (
    <div className="contact-us" id="contact-us">
      <div className="col-6 box-1">
        <h5>contact us!</h5>
        <p>
          It is a long established fact that a reader will be distracted by the.
        </p>
      </div>

      <div className="col-6 box-2 ">
        <form>
          <input
            placeholder="Email here"
            type="text"
            name="email"
            value={message.email}
            onChange={handleChange}
          />
          <button>send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
