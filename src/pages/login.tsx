import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import TextField from "@/components/formik/TextField";
import useLogin, { LoginFormValues } from "@/hooks/useLogin";
import useUserAuth from "@/hooks/useUserAuth";

function Login() {
  useUserAuth({ redirectTo: "/", redirectIfFound: true });
  const login = useLogin();
  const { t } = useTranslation();
  const validationSchema = yup.object({
    username: yup.string().label("username").required(),
    password: yup.string().label("password").min(4).required(),
  });
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {t("loginPage.title")}
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label={t("loginPage.username")}
              formik={formik}
            />
            <TextField
              fullWidth
              type="password"
              id="password"
              name="password"
              label={t("loginPage.password")}
              formik={formik}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              {t("common.login")}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
