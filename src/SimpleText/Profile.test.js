import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

describe("<Profile />", () => {
    it("shows the props correctly", () => {
        render(<Profile username="kyungsle" name="이경수" />);
        const linkElement = screen.getByText(/kyungsle/i);
        expect(linkElement).toBeInTheDocument();
    });
});
