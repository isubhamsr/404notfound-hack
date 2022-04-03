import React, { useEffect, useState } from "react";
import Storage from "../../utlity/Storage";

export default function User() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  const detectToken = () => {
    const token = Storage.get("token");

    if (token !== null || token !== undefined) {
      const decodeToken = Storage.decodeToken("token");
      setUserId(decodeToken._id);
      setName(decodeToken.name);
    }
  };

  useEffect(() => {
    detectToken();
    // window.location.reload(false);
  }, []);

  return (
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold">Welcome - {name}</h1>
      <div class="col-lg-6 mx-auto">
      </div>
    </div>
  );
}
