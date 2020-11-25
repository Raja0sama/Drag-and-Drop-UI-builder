import React, { useState } from "react";
import * as reactnative from "react-native";
import "./assets/style.css";
import Layout from "./components/Layout";
import "antd/dist/antd.css";

export default function App() {
  const modules = Object.entries(reactnative);
  const [code, setcode] = useState([]);
  let text = "";
  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev) => {
    text = ev.target.textContent;
  };

  const drop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const config = {
      element: text,
      style: {},
      children: [],
      props: {
        title: "Learn More",
        id: btoa(Math.random()).substr(10, 5),
        source: {
          uri: "https://reactnative.dev/img/tiny_logo.png",
        },
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
      <Layout
        code={code}
        drag={drag}
        drop={drop}
        allowDrop={allowDrop}
      ></Layout>
    </div>
  );
}
