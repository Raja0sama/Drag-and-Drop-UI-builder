import React, { useEffect, useState } from "react";
import * as reactnative from "react-native";
import "./assets/style.css";
import Layout from "./components/Layout";
import "antd/dist/antd.css";
import { connect } from "dva";
import { setNodes } from "./model/app";
const App = (props) => {
  const [code, setcode] = [props.nodes, props.setNodes];
  let text = "";
  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev) => {
    text = ev.target.textContent;
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (document.querySelector("#contextMenu"))
        if (document.querySelector("#contextMenu").style.display == "block")
          document.querySelector("#contextMenu").style.display = "none";
    });
  }, []);
  const drop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const config = {
      element: text,
      children: [text == "span" && "Span Is being Created"],
      props: {
        id: btoa(Math.random()).substr(10, 5),
        style: {
          width: 100,
          height: 100,
          border: "1px solid black",
        },
      },
    };
    console.log(ev.target.parentNode.id);
    if (ev.target.parentNode.id) {
      const appendd = (nodes) =>
        nodes.forEach((element, i) => {
          if (ev.target.parentNode.id == element.props.id) {
            nodes[i].children = [...element.children, config];
          }
          if (element.children != 0) {
            appendd(element.children);
          }
          if (i == nodes.length - 1) return nodes;
        });
      console.log(appendd(code));

      setcode([...code]);
      return;
    }
    setcode([...code, config]);

    // ev.target.appendChild(document.getElementById(data).cloneNode(true));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Layout drag={drag} drop={drop} allowDrop={allowDrop}></Layout>
      <ContextMenu />
    </div>
  );
};
const ContextMenu = () => {
  const menu = [
    {
      name: "copy",
    },
    {
      name: "delete",
    },
    {
      name: "duplicate",
    },
    {
      name: "manage style",
    },
  ];

  // min-width: 170px !important;
  //   padding: 3px 15px

  return (
    <div id={"contextMenu"} style={{ display: "none", position: "absolute" }}>
      <div className="list-group">
        {menu.map((e) => (
          <button
            style={{ minWidth: 170, padding: "3px 15px" }}
            type="button"
            className="list-group-item list-group-item-action "
          >
            {e.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default connect(({ app }) => ({ nodes: app.nodes }), { setNodes })(App);
