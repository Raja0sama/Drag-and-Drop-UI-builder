import React from "react";
import { Row, Col, PageHeader, Card } from "antd";
import Left from "../Leftbar/index";
import Right from "../Rightbar/index";
import Story from "../story/index";
export default function Layout(props) {
  return (
    <div>
      {/* <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="App Builder"
        subTitle="easy screen maker"
      /> */}
      <Row>
        <Col span={4}>
          <Left {...props} />
        </Col>
        <Col span={16}>
          <Story {...props} />
        </Col>
        <Col span={4}>
          <Right {...props} />
        </Col>
      </Row>
    </div>
  );
}
