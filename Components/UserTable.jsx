function UserTable({ users, loading, onToggleStatus }) {
  if (loading) {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "10%" }}>User ID</th>
              <th style={{ width: "10%" }}>User Name</th>
              <th style={{ width: "10%" }}>Phone Number</th>
              <th style={{ width: "13%" }}>Email Id</th>
              <th style={{ width: "12%" }}>Colony</th>
              <th style={{ width: "10%" }}>Status</th>
              <th style={{ width: "35%" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">Loading users...</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "10%" }}>User ID</th>
              <th style={{ width: "10%" }}>User Name</th>
              <th style={{ width: "10%" }}>Phone Number</th>
              <th style={{ width: "13%" }}>Email Id</th>
              <th style={{ width: "12%" }}>Colony</th>
              <th style={{ width: "10%" }}>Status</th>
              <th style={{ width: "35%" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "10%" }}>User ID</th>
              <th style={{ width: "10%" }}>User Name</th>
              <th style={{ width: "10%" }}>Phone Number</th>
              <th style={{ width: "13%" }}>Email Id</th>
              <th style={{ width: "12%" }}>Colony</th>
              <th style={{ width: "10%" }}>Status</th>
              <th style={{ width: "35%" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ fontSize: "12px", wordBreak: "break-all" }}>{user._id}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.colony || "N/A"}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {!user.isBlocked && (
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#28a745",
                          display: "inline-block",
                        }}
                      />
                    )}
                    <button
                      onClick={() => onToggleStatus(user._id)}
                      className={`btn btn-sm ${user.isBlocked ? "btn-success" : "btn-danger"}`}
                      style={{ fontSize: "11px", padding: "2px 6px" }}
                    >
                      {user.isBlocked ? "Restore" : "Block"}
                    </button>
                  </div>
                </td>
                <td>
                  {user.address
                    ? typeof user.address === "string"
                      ? user.address
                      : `${(user.address.street || "")} ${(user.address.city || "")} ${(user.address.state || "")} ${(user.address.country || "")}`.trim()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default UserTable;
