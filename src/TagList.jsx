import React, { useState, useRef } from "react";
import { Space, Tag, Input } from "antd";

function TagList({ value = [], onChange }) {
  const ref = useRef();
  const [input, setInput] = useState("");
  const [tagList, setTagList] = useState([]);

  const handleNewTag = () => {
    const allTags = [...value];
    if (input && allTags.filter((item) => item.key === input).length === 0) {
      allTags.push({ key: input, label: input });
    }
    onChange?.(allTags);
    setInput("");
    setTagList([]);
  };

  return (
    <Space>
      <div>
        {value.concat(tagList).map((item = {}) => {
          return <Tag key={item.key}>{item.label}</Tag>;
        })}
      </div>
      <Input
        ref={ref}
        value={input}
        type="text"
        size="small"
        placeholder="add tag"
        style={{ width: 78 }}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleNewTag}
        onPressEnter={handleNewTag}
      />
    </Space>
  );
}

export default TagList;
