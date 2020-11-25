import React from "react";

export default function index(props) {
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <div className={"functions"} style={{ height: "40vh" }}></div>
      <div style={{ height: "40vh", overflow: "auto" }}>
        <pre>{JSON.stringify(props.code, null, 2)}</pre>
      </div>
    </div>
  );
}
