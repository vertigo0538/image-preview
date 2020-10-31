import React from "react";
import { render, cleanup } from "@testing-library/react";
import Main from "../../pages/index";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("Main render test", () => {
  const { getByText } = render(<Main />);
  expect(getByText("form")).toBeInTheDocument();
  const test: string = 1;
  expect(test).toBe(1);
});
