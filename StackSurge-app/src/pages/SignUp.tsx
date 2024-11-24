import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material";

import { AppPath } from "../router/routes";
import { ScreenContainer } from "../components/ScreenContainer";
import { signUp } from "../services/auth";
import { EVENT_CATEGORIES, EventCategory } from "../types/Event";

type FieldErrors = Partial<
  Record<
    "firstName" | "lastName" | "email" | "password" | "passwordConfirmation",
    string
  >
>;

export function SignUp() {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    mutate: signUpMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate(AppPath.Login);
    },
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [interests, setInterests] = useState<EventCategory[]>([]);

  const [errors, setErrors] = useState<FieldErrors>();

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  const handleSubmit = () => {
    setErrors(undefined);

    let newErrors: FieldErrors | undefined;

    // Validate and set errors if necessary
    if (!firstName) {
      newErrors = { ...newErrors, firstName: "First name is required" };
    }
    if (!lastName) {
      newErrors = { ...newErrors, lastName: "Last name is required" };
    }
    if (!email) {
      newErrors = { ...newErrors, email: "Email is required" };
    }
    if (password.length < 6) {
      newErrors = {
        ...newErrors,
        password: "Password should have at least 6 characters",
      };
    }
    if (password !== passwordConfirmation) {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "Passwords do not match",
      };
    }
    // If there are no errors, create the user
    if (!newErrors) {
      resetFields();
      signUpMutation({ firstName, lastName, email, password, interests });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <ScreenContainer>
      <Stack gap={3} style={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          Create an account
        </Typography>
        <Grid container>
          <Grid offset={{ xs: 0, md: 3 }} size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <form autoComplete="off">
                <Stack gap={2}>
                  <Grid container gap={2} sx={{ flexFlow: "nowrap" }}>
                    <Grid size={6}>
                      <TextField
                        label="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        variant="filled"
                        fullWidth
                        value={firstName}
                        error={Boolean(errors?.firstName)}
                        helperText={errors?.firstName}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        label="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        variant="filled"
                        fullWidth
                        value={lastName}
                        error={Boolean(errors?.lastName)}
                        helperText={errors?.lastName}
                      />
                    </Grid>
                  </Grid>
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
                  <TextField
                    label="Confirm your password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    variant="filled"
                    type="password"
                    fullWidth
                    value={passwordConfirmation}
                    error={Boolean(errors?.passwordConfirmation)}
                    helperText={errors?.passwordConfirmation}
                  />
                  <FormControl>
                    <InputLabel id="interests-label">Interests</InputLabel>
                    <Select
                      labelId="interests-label"
                      id="interests"
                      multiple
                      value={interests}
                      onChange={(event) => {
                        const { value } = event.target;

                        setInterests(
                          typeof value === "string"
                            ? (value.split(",") as EventCategory[])
                            : value
                        );
                      }}
                      input={
                        <OutlinedInput
                          id="select-interests"
                          label="Interests"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {EVENT_CATEGORIES.map((category) => (
                        <MenuItem
                          key={category}
                          value={category}
                          style={{
                            fontWeight: interests.includes(category)
                              ? theme.typography.fontWeightMedium
                              : theme.typography.fontWeightRegular,
                          }}
                        >
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    sx={{ ml: "auto" }}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Sign Up
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
