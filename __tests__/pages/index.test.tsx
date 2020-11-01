import React from "react";
import { render, cleanup } from "@testing-library/react";
import Main from "../../pages/index";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("Main render test", () => {
  const { getByText, debug } = render(<Main />);
  debug();
});
