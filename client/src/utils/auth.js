// Utility to decode JWT token and get user info
export const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    // JWT tokens have 3 parts separated by dots
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload.userId || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

