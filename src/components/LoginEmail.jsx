import React, { useState } from "react";

export function NameForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Email ${email} and ${password}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </label>


        <input type="submit" value="Submit" />

      </h1>
    </form>
  );
}