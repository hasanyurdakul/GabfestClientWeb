"use client";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function page() {
  const session = getSession();
  useEffect(() => {
    session.then((res) => {
      if (res) {
        console.log(res);
      } else {
        location.href = "/";
      }
    });
  }, []);
  return <div>Chat Page</div>;
}
