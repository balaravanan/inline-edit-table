import React from "react";
import "./App.css";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export default function App() {
  const [state, setState] = React.useState({
    data: [
      { id: 1, name: "Adam", age: 20 },
      { id: 2, name: "Eve", age: 19 },
      { id: 3, name: "Abel", age: 4 },
      { id: 4, name: "Coin", age: 5 }
    ],
    edit: {}
  });

  return (
    <ReactTable
      data={state.data}
      columns={[
        {
          Header: "Name",
          accessor: "name",
          Cell: ({ value, ...props }) => (
            <div
              style={
                state.edit.id === props.original.id
                  ? {
                      backgroundColor: "#ddd",
                      padding: "5px",
                      outline: "1px solid #0000ff"
                    }
                  : {}
              }
              contentEditable={state.edit.id === props.original.id}
              suppressContentEditableWarning
              onBlur={(e) => {
                setState({
                  ...state,
                  edit: { ...state.edit, name: e.target.innerHTML }
                });
              }}
              dangerouslySetInnerHTML={{
                __html:
                  state.edit.id === props.original.id ? state.edit.name : value
              }}
            />
          )
        },
        {
          Header: "Age",
          accessor: "age",
          Cell: ({ value, ...props }) => (
            <div
              style={
                state.edit.id === props.original.id
                  ? {
                      backgroundColor: "#ddd",
                      padding: "5px",
                      outline: "1px solid #0000ff"
                    }
                  : {}
              }
              contentEditable={state.edit.id === props.original.id}
              suppressContentEditableWarning
              onBlur={(e) => {
                setState({
                  ...state,
                  edit: { ...state.edit, age: e.target.innerHTML }
                });
              }}
              dangerouslySetInnerHTML={{
                __html:
                  state.edit.id === props.original.id ? state.edit.age : value
              }}
            />
          )
        },
        {
          Cell: ({ value, ...props }) =>
            Object.keys(state.edit).length > 0 &&
            state.edit.id === props.original.id ? (
              <button
                onClick={(e) => {
                  let newdata = state.data;
                  newdata.map((d) => {
                    if (d.id === state.edit.id) {
                      d.name = state.edit.name; d.age = state.edit.age;
                    }
                    return d;
                  });
                  console.log(newdata);
                  setState({ ...state, data: newdata, edit: {} });
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={(e) => setState({ ...state, edit: props.original })}
              >
                Edit
              </button>
            )
        }
      ]}
      defaultPageSize={5}
    />
  );
}
