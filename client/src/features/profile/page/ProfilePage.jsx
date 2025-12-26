import { getProfile, updateProfile } from "../api/accessProfile";
import { useState, useEffect } from "react";


function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    getProfile().then(res => setUser(res.data));
  }, []);

    const handleUpdate = async () => {
    await updateProfile({ name });
    alert("Profile updated");
  };

  return user && (
    <div>
      <h2>{user.name}</h2>
      <p>Role: {user.role}</p>
      <p>Rating: ⭐ {user.rating}</p>
      <p>Level: {user.level}</p>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

export default ProfilePage

