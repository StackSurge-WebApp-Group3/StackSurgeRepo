import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { AppPath } from "../router/routes";
import { ScreenContainer } from "../components/ScreenContainer";
import { signIn } from "../services/auth";
import { useAuth } from "../context/AuthContext";

type FieldErrors = Partial<
  Record<
    "firstName" | "lastName" | "email" | "password" | "passwordConfirmation",
    string
  >
>;

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>();

  const {
    mutate: loginMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: () => signIn(email, password),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate(AppPath.Events);
    },
  });

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    setErrors(undefined);

    let newErrors: FieldErrors | undefined;

    // Validate and set errors if necessary
    if (!email) {
      newErrors = { ...newErrors, email: "Email is required" };
    }
    if (!password) {
      newErrors = { ...newErrors, password: "Password is required" };
    }
    // If there are no errors, sign in
    if (!newErrors) {
      resetFields();
      loginMutation();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <ScreenContainer>
      <Stack gap={3} style={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        <Grid container>
          <Grid offset={{ xs: 0, md: 3 }} size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <form autoComplete="off">
                <Stack gap={2}>
                  <TextField
                    label="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="filled"
                    type="email"
                    fullWidth
                    value={email}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email}
                  />
                  <TextField
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="filled"
                    type="password"
                    fullWidth
                    value={password}
                    error={Boolean(errors?.password)}
                    helperText={errors?.password}
                  />
                  <Button
                    sx={{ ml: "auto" }}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                  {isError && (
                    <Typography color="error">
                      An error occurred. Please try again.
                    </Typography>
                  )}
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </ScreenContainer>
  );
}
