import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCuisines } from "../actions/cuisines";
import CuisinesList from "../components/CuisinesList";

class CuisineIndexContainer extends Component {
  componentDidMount() {
    this.props.dispatchFetchCuisines();
  }

  render() {
    if (this.props.loadingState === "notStarted") {
      return null;
    }
    return (
      <section className="max-w-6xl mx-auto mt-16">
        {this.props.loadingState === "inProgress" ? (
          "loading spinner"
        ) : (
          <CuisinesList cuisines={this.props.cuisines} />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cuisines: state.cuisines.list,
    loadingState: state.cuisines.loadingState,
  };
};
//can be called via this.props.dispatchFetchCuisines()

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchCuisines: () => dispatch(fetchCuisines()),
    // dispatchFetchCuisines => It's a function that dispatches the return value of the fetch cuisines action creator.
    //dispatch => Calls the reducer and updates the state.
    //fetchCuisines => Action Creator Function that returns a thunk.
    //thunk => Thunk is a function that is returned from an action creator.
  };
};
// The purpose of mapDispatchToProps to props is to give us functions that will dispatch the return values of action creators. It gives us a property that will dispatch the return values of action creator.

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CuisineIndexContainer);
