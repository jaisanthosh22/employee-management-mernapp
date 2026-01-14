    import { useState } from "react";
    import axios from "axios";

    function LoginPage() {
      const [form,setForm] = useState({
        email:"",
        password:"",
        role:""
      })
      const handleChange =(e)=>{
        const {name,value}=e.target 
        //name=e.target.name
        //value=e.target.name
        setForm((prev)=>({...prev,[name]:value  } )) //email:ja...
      }
      const handleSubmit = async(e) => {

        e.preventDefault();
        try{

          const res = await axios.post(
            "http://localhost:8080/api/v1/auth/login",
            form
          )
          console.log("server response",res.data)
          console.log("successfully login")

      
        // reset form after submit
        setForm({
          email: "",
          password: "",
          role: ""
        });



        }
        catch(err){
          console.log(err.message)
            if (err.response) {
          // Server responded with a status code (4xx or 5xx)
              console.log("STATUS:", err.response.status);
              console.log("DATA:", err.response.data);
            } else if (err.request) {
              // Request made but no response (network issue / CORS)
              console.log("NO RESPONSE FROM SERVER");
            } else {
              // Something else caused error
              console.log("ERROR:", err.message);
            }
            }
      
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
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>

            <button type="submit">Login</button>
          </form>
        </>
      );
    }

    export default LoginPage;
