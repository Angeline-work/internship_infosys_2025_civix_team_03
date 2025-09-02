// Handles token refresh + authenticated fetch calls

// Refresh the access token using the httpOnly refresh cookie
export async function refreshAccessToken() {
  const res = await fetch("http://localhost:5000/api/auth/refresh", {
    method: "POST",
    credentials: "include", // sends stored refresh cookie
  });
  if (!res.ok) {
    throw new Error("Could not refresh");
  }
  const { accessToken } = await res.json();
  localStorage.setItem("accessToken", accessToken);
  return accessToken;
}

// Wrapper around fetch that auto-injects Authorization header
// and retries once if the access token expired
export async function apiFetch(url, opts = {}) {
  let token = localStorage.getItem("accessToken");
  const headers = { ...(opts.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(url, { ...opts, headers });

  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(url, { ...opts, headers });
    } catch (err) {
      // if refresh also failed, redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw err;
    }
  }

  return res;
}
