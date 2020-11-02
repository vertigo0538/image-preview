import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Main from "../../pages/index";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("Index test", () => {
  const { getByTestId } = render(<Main />);
  const submitButton = getByTestId("button-test");
  it("submitButton Click", () => {
    fireEvent.click(submitButton);
  });
  it("File Input Test", () => {
    const { getByTestId, debug } = render(<Main />);
    const file = new File(["foo"], "foo.png", {
      type: "image/png",
    });
    const inputFile = getByTestId("input-test");
    const result = getByTestId("result");
    userEvent.upload(inputFile, file);
    expect(result).toHaveTextContent(/^foo.png$/);
    debug();
  });
});
