"use client";
import Grid from "@mui/material/Unstable_Grid2";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Autocomplete, Divider, Stack, TextField, Box } from "@mui/material";
import React from "react";

export default function Page() {
  const session = getSession();
  const [searchedUsersAndGroups, setSearchedUsersAndGroups] = useState([]);
  const [usersAndGroups, setUsersAndGroups] = useState([]);
  useEffect(() => {
    session.then((s) => {
      if (s) {
        console.log(s);
      } else {
        location.href = "/";
      }
    });
    //TODO: Veritabanından çekilecek.
    setSearchedUsersAndGroups([
      { label: "hasan", value: 1, type: "U" },
      { label: "AileGrubu", value: 2, type: "G" },
    ]);
  }, []);
  function autoCompleteOnChanged(e, value) {
    //console.log("autoCC", value);
    //TODO: Daha önce eklenmiş ise tekrar eklenmesin.
    if (value) {
      setUsersAndGroups([
        ...usersAndGroups,
        {
          id: value.value,
          name: value.label,
          type: value.type,
          isActive: true,
        },
      ]);
    }
  }
  function searchChanged(e) {
    const value = e.target.value;
    //TODO: Aranan kullanıcıları api'den çekip getirecek.
    setSearchedUsersAndGroups([
      { label: "hasan", value: 1, type: "U" },
      { label: "AileGrubu", value: 2, type: "G" },
    ]);
  }
  function boxClicked(item) {
    const newUsersAndGroups = usersAndGroups.map((x) => {
      if (x.id === item.id) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
      return x;
    });
    setUsersAndGroups(newUsersAndGroups);
  }
  return (
    <Grid container height={"100vh"}>
      <Grid xl={2} borderRadius={1} className={styles.leftPanelGrid}>
        <Grid margin={1}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={searchedUsersAndGroups}
            fullWidth
            onChange={autoCompleteOnChanged}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Users and Groups"
                onChange={searchChanged}
              />
            )}
          />
        </Grid>
        <Divider />
        <Grid className={styles.dividerText}>
          <h3>Kullanıcılar ve Gruplar</h3>
        </Grid>
        <Divider />
        <Grid>
          {usersAndGroups.map((item) => (
            <Box
              key={item.id}
              border="1px solid azure"
              className={[styles.box, item.isActive ? styles.active : ""]}
              boxShadow="1"
              borderRadius={1}
              margin={1}
              padding={1}
              onClick={() => boxClicked(item)}
            >
              <Stack spacing={2} direction="row">
                <h3>{item.type}</h3>
                <h4>{item.name}</h4>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Grid
        xl={10}
        border="solid"
        borderRadius={2}
        className={styles.rightPanelGrid}
      ></Grid>
    </Grid>
  );
}
