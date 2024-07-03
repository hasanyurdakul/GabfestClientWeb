"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState({});
  function loginButtonClicked() {
    console.log("User: ", user);
  }
  return (
    <Grid
      height="100vh"
      direction={"column"}
      container
      justifyContent={"center"}
      alignItems={"center"}
      rowGap={2}
    >
      <Grid
        xs={3}
        height={"10vh"}
        style={{
          backgroundImage: "url('images/logo-no-background.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Grid xs={3}>
        <TextField
          fullWidth
          id="username"
          label="Username"
          variant="outlined"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </Grid>
      <Grid xs={3}>
        <TextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </Grid>
      <Grid xs={3}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={loginButtonClicked}
        >
          Log In
        </Button>
      </Grid>
    </Grid>
  );
}
