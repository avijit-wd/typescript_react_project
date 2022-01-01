import { useState, useEffect, SyntheticEvent } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Role } from "../../models/role";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
    })();
  }, []);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("users", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role_id: roleId,
    });

    setRedirect(true);
  };

  if (redirect) {
    navigate("/users");
  }
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <div className="mr-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mr-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mr-3">
          <label> Email</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mr-3">
          <label>Role</label>
          <select
            className="form-control"
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((role: Role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default CreateUser;
