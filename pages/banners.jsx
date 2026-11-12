import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../src/api.js";
import Button from "@mui/material/Button";

const TABS = {
  app: {
    key: "app",
    label: "App Banners",
    listUrl: `${API_BASE}/banners`,
    createUrl: `${API_BASE}/banners`,
    updateUrl: `${API_BASE}/banners`,
    deleteUrl: `${API_BASE}/banners`,
    imageField: "url",
    activeField: "active",
    supportsTitle: false,
  },
  web: {
    key: "web",
    label: "Web Banners",
    listUrl: `${API_BASE}/banners/web`,
    createUrl: `${API_BASE}/banners/web`,
    updateUrl: `${API_BASE}/banners/web`,
    deleteUrl: `${API_BASE}/banners/web`,
    imageField: "image",
    activeField: "isActive",
    supportsTitle: true,
  },
};

function Banners() {
  const [tab, setTab] = useState("app");
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const config = TABS[tab];

  const fetchBanners = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(config.listUrl);
      setBanners(res.data.banners || []);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load banners");
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFile(null);
    setTitle("");
    setOrder("");
    setActive(true);
    fetchBanners();
  }, [tab]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!file) {
      alert("Please choose an image file");
      return;
    }
    if (config.supportsTitle && !title.trim()) {
      alert("Please enter a banner title");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      if (order !== "") formData.append("order", order);
      if (config.supportsTitle) formData.append("title", title.trim());
      formData.append(config.activeField, String(active));

      await axios.post(config.createUrl, formData);

      form.reset();
      setFile(null);
      setTitle("");
      setOrder("");
      setActive(true);
      await fetchBanners();
      alert("Banner added successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add banner");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (banner) => {
    const field = config.activeField;
    const nextValue = !banner[field];
    try {
      const res = await axios.patch(`${config.updateUrl}/${banner._id}/active`, {
        [field]: nextValue,
      });
      setBanners((prev) =>
        prev.map((item) => (item._id === banner._id ? res.data.banner : item))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update banner");
    }
  };

  const handleDelete = async (banner) => {
    if (
      !window.confirm(
        "Delete this banner? The image will also be removed from Cloudinary."
      )
    ) {
      return;
    }

    try {
      await axios.delete(`${config.deleteUrl}/${banner._id}`);
      setBanners((prev) => prev.filter((item) => item._id !== banner._id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete banner");
    }
  };

  return (
    <div className="rightdashboardarea">
      <div className="dashboardwrappewr">
        <h4 style={{ marginBottom: "0px" }}>Banners</h4>
      </div>

      <div className="dashboardcontent">
        <div className="d-flex gap-2 mb-3">
          {Object.values(TABS).map((item) => (
            <Button
              key={item.key}
              variant={tab === item.key ? "contained" : "outlined"}
              size="small"
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="dashbox mb-3">
          {tab === "app"
            ? "App banners shown inside the mobile app (collection: banners)"
            : "Web banners shown on the website (collection: webbanners)"}
        </div>

        <form
          key={tab}
          onSubmit={handleAdd}
          className="p-3 mb-4"
          style={{
            border: "1px solid #e9ecef",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <h5 style={{ marginBottom: "15px" }}>Add {config.label}</h5>

          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            {config.supportsTitle && (
              <div className="col-md-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Banner title"
                />
              </div>
            )}

            <div className="col-md-2">
              <label className="form-label">Order</label>
              <input
                type="number"
                className="form-control"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="Auto"
              />
            </div>

            <div className="col-md-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="banner-active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="banner-active">
                  {config.activeField === "active" ? "Active" : "Is Active"}
                </label>
              </div>
            </div>

            <div className="col-md-1">
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                style={{ width: "100%" }}
              >
                {submitting ? "..." : "Add"}
              </Button>
            </div>
          </div>
        </form>

        {loading && <p style={{ textAlign: "center" }}>Loading banners...</p>}
        {!loading && error && (
          <p style={{ textAlign: "center", color: "#dc3545" }}>{error}</p>
        )}
        {!loading && !error && banners.length === 0 && (
          <p style={{ textAlign: "center" }}>No banners found</p>
        )}

        {!loading && !error && banners.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {banners.map((banner) => {
              const imageUrl = banner[config.imageField];
              const isActive = banner[config.activeField];
              return (
                <div
                  key={banner._id}
                  style={{
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={banner.title || "Banner"}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      background: "#f8f9fa",
                    }}
                  />
                  <div
                    style={{
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <strong style={{ fontSize: "14px" }}>
                        {banner.title || "App Banner"}
                      </strong>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: isActive ? "#0f5132" : "#842029",
                          backgroundColor: isActive ? "#d1e7dd" : "#f8d7da",
                          padding: "2px 8px",
                          borderRadius: "10px",
                        }}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div style={{ fontSize: "12px", color: "#6c757d" }}>
                      Order: {banner.order}
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        size="small"
                        variant="contained"
                        color={isActive ? "warning" : "success"}
                        onClick={() => handleToggle(banner)}
                      >
                        {isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(banner)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Banners;
