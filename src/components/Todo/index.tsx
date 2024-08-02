import React, { useEffect, useReducer, useState } from "react";
import { Input, Button, List, notification, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const initialState = JSON.parse(localStorage.getItem("todos")) || [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { text: action.payload, completed: false }];
    case "DELETE_TODO":
      return state.filter((_, index: any) => index !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo, index) =>
        index === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      notification.error({
        message: "Xəta",
        description: "Todo boş ola bilməz!",
      });
      return;
    }
    dispatch({ type: "ADD_TODO", payload: inputValue });
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    dispatch({ type: "DELETE_TODO", payload: index });
    notification.success({
      message: "Xəta",
      description: "Todo silindi!",
    });
  };
  const handleToggleTodo = (index) => {
    dispatch({ type: "TOGGLE_TODO", payload: index });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div className="input_wrapper">
        <Input
          placeholder="Todo əlavə et"
          value={inputValue}
          style={{ marginBottom: "10px" }}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAddTodo}
        />
        <Button type="primary" style={{}} onClick={handleAddTodo}>
          Əlavə et
        </Button>
      </div>
      <List
        bordered
        dataSource={state}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                onClick={() => handleDeleteTodo(index)}
                icon={<DeleteOutlined />}
              />,
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggleTodo(index)}
            >
              {todo.text}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Todo;
