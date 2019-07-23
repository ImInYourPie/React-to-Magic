import Navbar from "../components/Navbar";
import React from "react";
import { shallow } from "enzyme";
import EnzymeSetup from "./setupTests";
import { Provider } from "react-redux";
import store from "../store.js";
import { BrowserRouter } from "react-router-dom";
import { createShallow } from "@material-ui/core/test-utils";

const setUp = () => {
  return shallow(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
};

describe("Navbar", () => {
  //   let component;
  //   beforeEach(() => {
  //     component = setUp();
  //   });

  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it("Should render without failure", () => {
    const component = shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const wrapper = component.find("[data-test='navbar']");
    expect(wrapper.length).toBe(1);
  });
});
