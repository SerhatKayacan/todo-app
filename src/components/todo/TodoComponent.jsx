import React, { Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoDataService from "./TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id, // ( this.props.history.push(`/todos/${id}`); ) listTodos'da
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD")
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  onSubmit(values) {
    let username = AuthenticationService.getLoggedInUserName();
    // ( this.props.history.push(`/todos/${id}`); )
    if (this.state.id === -1) {
      // addTodo'da ise
      TodoDataService.createTodo(username, {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate
      }).then(() => this.props.history.push(`/todos`));
    } else {
      // updateTodo'da ise
      TodoDataService.updateTodo(username, this.state.id, {
        id: this.state.id,
        description: values.description, // form values
        targetDate: values.targetDate //form values
      }).then(() => this.props.history.push(`/todos`)); // todos sayfasına yönlendir
    }
  }
  componentDidMount() {
    if (this.state.id === -1) {
      // addTodoClicked()
      return;
    }
    // updateTodoClicked
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveTodo(username, this.state.id).then(res =>
      this.setState({
        description: res.data.description, //tıklanan todo'nun değerlerini formun initial values'ine koy
        targetDate: moment(new Date(res.data.targetDate)).format("YYYY-MM-DD")
      })
    );
  }
  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "enter description";
    } else if (values.description.length < 5) {
      errors.description = "enter atleast 5 characters";
    }
    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "enter a valid target date";
    }
    return errors;
  }
  render() {
    let description = this.state.description;
    let targetDate = this.state.targetDate;
    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{
              description: description,
              targetDate: targetDate
            }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default TodoComponent;
