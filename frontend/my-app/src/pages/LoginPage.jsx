import { useState } from "react";

function LoginPage() {
  const [form,setForm] = useState({
    email:"",
    password:"",
    role:""
  })
  const handleChange =(e)=>{
    const {name,value}=e.target
    setForm((prev)=>({...prev,[name]:value  } ))
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", form.email);
    console.log("Password:", form.password);
    console.log("Role:", form.role);

    // reset form after submit
    setForm({
      email: "",
      password: "",
      role: ""
    });
  };

  return (
    <>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Role:</label>
          <select
            name="role"
            value={form.role}
            required
            onChange={handleChange}
          >
            <option value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
