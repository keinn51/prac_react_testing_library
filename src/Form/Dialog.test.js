import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import context from "jest-plugin-context";
import Dialog from "./Dialog";

describe("Dialog", () => {
    const title = "제목";
    const description = "설명 블라블라블라";
    const handleClickClose = jest.fn();
    const handleClickSubmit = jest.fn();
    const spyOnConsoleError = jest.spyOn(console, "error");

    const renderDialog = () =>
        render(
            <Dialog
                title={title}
                description={description}
                onClickClose={handleClickClose}
                onClickSubmit={handleClickSubmit}
            />
        );

    it("title과 description이 보여야 한다.", () => {
        const { container } = renderDialog();

        expect(container).toHaveTextContent(title);
        expect(container).toHaveTextContent(description);
    });

    context("닫기 버튼을 누르면", () => {
        it("handleClickClose가 호출되어야 한다.", () => {
            renderDialog();

            fireEvent.click(screen.getByText("닫기"));

            expect(handleClickClose).toBeCalled();
        });
    });

    context("등록버튼을 눌렀을 때", () => {
        context("입력된 텍스트가 없다면", () => {
            it('console.error에 "에러가 발생했습니다." 문구가 찍혀야 한다.', () => {
                renderDialog();

                fireEvent.click(screen.getByText("등록"));

                expect(spyOnConsoleError).toBeCalledWith("에러가 발생했습니다.");
            });
        });

        context("입력된 텍스트가 있다면", () => {
            const sampleText = "sample-text";

            it("handleClickSubmit에 입력값이 전달되어야 한다.", () => {
                renderDialog();

                fireEvent.change(screen.getByPlaceholderText("contents"), {
                    target: { name: "contents", value: sampleText },
                });
                fireEvent.click(screen.getByText("등록"));

                expect(handleClickSubmit).toBeCalledWith(sampleText);
            });
        });
    });
});
