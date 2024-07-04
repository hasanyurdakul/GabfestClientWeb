"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Home() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const session = getSession();
  useEffect(() => {
    session.then((res) => {
      if (res) {
        location.href = "/Chat";
      }
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    signIn("credentials", {
      username,
      password,
      redirect: false,
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        location.href = "/Chat";
      } else if (res.error) {
        console.log(res.error);
        setError(res.error);
      }
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        height="100vh"
        direction={"column"}
        container
        justifyContent={"center"}
        alignItems={"center"}
        rowGap={2}
      >
        <Grid
          xs={4}
          xl={3}
          height={"10vh"}
          style={{
            backgroundImage: "url('images/logo-no-background.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid xs={4} xl={3}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            variant="outlined"
          />
        </Grid>
        <Grid xs={4} xl={3}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
          />
        </Grid>
        {error && (
          <Grid xs={4} xl={3}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid xs={4} xl={3}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Log In
          </Button>
          <div className="flex justify-end mt-2 text-blue-500">
            <a href="/register" className="text-sm">
              Register
            </a>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
