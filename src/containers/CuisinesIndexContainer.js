import React, { Component } from "react";
import CuisinesList from "../components/CuisinesList";

export default class CuisineIndexContainer extends Component {
  state = {
    cuisines: [],
    loading: true,
  };

  componentDidMount() {
    fetch("https://localhost:3000/cuisines", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("cuisines", data);
        this.setState({ cuisines: data, loading: false });
      });
  }

  render() {
    return (
      <section className="max-w-6xl mx-auto mt-16">
        {this.state.loading ? (
          "loading spinner"
        ) : (
          <CuisinesList groups={this.state.cuisines} />
        )}
      </section>
    );
  }
}
