import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders stats, controls and board elements", () => {
  render(<App />);
  const statsElement = screen.getByTestId("stats");
  const controlsElement = screen.getByTestId("controls");
  const boardElement = screen.getByTestId("board");

  expect(statsElement).toBeInTheDocument();
  expect(controlsElement).toBeInTheDocument();
  expect(boardElement).toBeInTheDocument();
});
