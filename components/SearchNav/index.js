import React, { useState } from "react";
import { Input, AutoComplete, Select, Row, Col, Slider } from "antd";
const { Option } = Select;
const { Search } = Input;

export default ({ url, setUrl }) => {
  const [method, setMethod] = useState("POST");
  const OPTIONS = [
    { value: "POST" },
    { value: "GET" },
    { value: "PUT" },
    { value: "PATCH" }
  ];

  return (
    <Row>
      <Col span={2}>
        <Select
          defaultValue={method}
          onChange={newValue => setMethod(newValue)}
          size="large"
          style={{ width: "100%" }}
        >
          {OPTIONS.map(({ value }) => (
            <Option value={value}>{value}</Option>
          ))}
        </Select>
      </Col>
      <Col span={22}>
        <Search
          size="large"
          enterButton="Search"
          className="search-bar"
          onSearch={value => setUrl(value)}
          defaultValue={url}
          placeholder="http://localhost:8080/graphql"
        />
      </Col>
    </Row>
  );
};
