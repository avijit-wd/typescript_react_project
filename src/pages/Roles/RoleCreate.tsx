import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/permission";
import { useNavigate } from "react-router-dom";

const RoleCreate = () => {
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("permissions");
      setPermissions(data);
    })();
  }, []);

  const check = (id: number) => {
    if (selected.some((s) => s == id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("roles", {
      name,
      permissions: selected,
    });
    setRedirect(true);
  };

  if (redirect) {
    navigate("/roles");
  }
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Permission</label>
          <div className="col-sm-10">
            {permissions.map((p: Permission) => (
              <div key={p.id} className="form-check form-check-inline col-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={p.id}
                  onChange={() => check(p.id)}
                />
                <label className="form-check-label">{p.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default RoleCreate;
