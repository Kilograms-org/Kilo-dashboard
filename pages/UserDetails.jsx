import { useState, useEffect } from "react";
import Searchbox from "../Components/searchbox";
import UserTable from "../Components/UserTable";
import axios from "axios";
import API_BASE from "../src/api.js";
import Button from "@mui/material/Button";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/user/all`);
      if (res.status === 200) {
        const allUsers = res.data.users || [];
        setUsers(allUsers);
        setDisplayedUsers(allUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    if (!window.confirm("Are you sure you want to change this user's status?")) {
      return;
    }

    try {
      const adminKey = localStorage.getItem("adminToken") || import.meta.env.VITE_ADMIN_SECRET_KEY || "admin-secret-123";

      const res = await axios.put(
        `${API_BASE}/admin/user/${userId}/toggle-status`,
        {},
        { headers: { "x-admin-key": adminKey } }
      );

      if (res.status === 200) {
        alert(`User ${res.data.user.isBlocked ? "blocked" : "restored"} successfully`);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Error updating user status");
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/user/search`,
        { params: { query } }
      );
      setDisplayedUsers(res.data.users || []);
    } catch (error) {
      console.error("Error searching users:", error);
      setDisplayedUsers([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDisplayedUsers(users);
  };

  return (
    <>
      <div className="rightdashboardarea">
        <div className="dashboardwrappewr">
          <h4 style={{ marginBottom: "0px" }}>All Users</h4>
        </div>

        <div className="dashboardcontent">
          <div className="matrix w-100">
            <div className="dashbox">Total Users: {displayedUsers.length}</div>
          </div>
          <div className="allproducts">
            <Searchbox text="Search Users by Phone, Email, or User ID" onSearch={handleSearch} />
            {searchQuery && !searchLoading && (
              <Button
                onClick={handleClearSearch}
                variant="outlined"
                size="small"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Clear Search
              </Button>
            )}
            {searchLoading && (
              <p style={{ textAlign: "center" }}>Searching...</p>
            )}
            {displayedUsers.length === 0 && !loading && !searchLoading && (
              <p style={{ textAlign: "center" }}>No users found</p>
            )}

            {!searchLoading && (
              <UserTable users={displayedUsers} loading={loading} onToggleStatus={toggleUserStatus} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
