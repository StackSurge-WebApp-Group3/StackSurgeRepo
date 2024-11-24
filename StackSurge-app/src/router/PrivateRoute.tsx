import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { ScreenContainer } from "../components/ScreenContainer";
import { AppPath } from "./routes";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <ScreenContainer>
        <CircularProgress />
      </ScreenContainer>
    );
  }

  return user ? children : <Navigate to={AppPath.Login} />;
}
