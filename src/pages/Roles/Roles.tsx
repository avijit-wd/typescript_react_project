import axios from "axios";
import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import { Role } from "../../models/role";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
    })();
  }, []);

  const deleteRole = async (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`roles/${id}`);
      setRoles(roles.filter((r: Role) => r.id !== id));
    }
  };
  return (
    <Wrapper>
      <div className="pt-3 pb-2 mr-3 border-bottom">
        <Link to={"/roles/create"} className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/roles/${role.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => deleteRole(role.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Roles;
