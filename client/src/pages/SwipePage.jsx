import { useAuth } from "../context/AuthContext";
import { getProfileCompleteness } from "../utils/profileCompleteness";
import { Navigate } from "react-router-dom";


const SwipePage = () => {
  const { user, loading } = useAuth();
const { percent } = getProfileCompleteness(user);

if (loading) return <p>Loading...</p>;

if (percent < 70) {
  return <Navigate to="/home" replace />;
}

  return (
    <div>SwipePage</div>
  )
}

export default SwipePage;
