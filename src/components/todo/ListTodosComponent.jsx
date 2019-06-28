import React, { Component } from "react";
import TodoDataService from "./TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from "moment";

class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
    this.updateTodoDone = this.updateTodoDone.bind(this);
  }
  componentDidMount() {
    this.refreshTodos();
  }
  refreshTodos() {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveAllTodos(username).then(response => {
      this.setState({ todos: response.data });
    });
  }
  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.deleteTodo(username, id).then(response => {
      this.refreshTodos();
    });
  }
  updateTodoClicked(id) {
    console.log(id);
    this.props.history.push(`/todos/${id}`);
  }
  addTodoClicked() {
    this.props.history.push(`/todos/${-1}`);
  }
  updateTodoDone(todo) {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.updateTodo(username, todo.id, {
      id: todo.id,
      description: todo.description,
      targetDate: todo.targetDate,
      done: !todo.done
    }).then(() => this.refreshTodos());
  }
  render() {
    return (
      <div className="container">
        <h1>List Todos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>description</th>
              <th>target date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map(todo => (
              <tr key={todo.id}>
                <td className={todo.done ? "done" : ""}>
                  {todo.description}{" "}
                  <span>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => this.updateTodoDone(todo)}
                    >
                      done?
                    </button>
                  </span>
                </td>
                <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => this.deleteTodoClicked(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => this.updateTodoClicked(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <button className="btn btn-success" onClick={this.addTodoClicked}>
            Add todo
          </button>
        </div>
      </div>
    );
  }
}
export default ListTodosComponent;
