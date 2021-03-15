import React, { Component } from "react";
export default class CuisineFormContainer extends Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/cuisines", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ group: this.state })
        .then((res) => res.json())
        .then((data) => {
          this.props.history.push("/");
        }),
    });
  };
  render() {
    return (
      <form
        onsubmit={this.handleSubmit}
        className="max-w-6xl w-3/4 mx-auto mt-16 shadow-lg px-4 py-6"
      >
        <h1 className="text-center text-3xl font-semibold mb-2">New Cuisine</h1>
        <fieldset>
          <input
            type="text"
            name="name"
            onchange={this.handleChange}
            value={this.state.name}
            placeholder="Name Your Cuisine"
            className="w-full border p-4 my-4"
          />
        </fieldset>

        <button
          className="w-full p-4 bg-blue-300 mt-4 hover:bg-blue-400 transition-all duration-200"
          type="submit"
        >
          Add Cuisine
        </button>
      </form>
    );
  }
}
