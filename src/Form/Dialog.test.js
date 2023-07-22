import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import context from "jest-plugin-context";
import Dialog from "./Dialog";

describe("Dialog", () => {
    // window alert를 테스트하기 위해 필요
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const title = "제목제목~";
    const description = "설명설명~";
    const handleClickClose = jest.fn(); // fn : mock up function
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
            it('console.error에 "입력값이 없는데요.." 문구가 찍혀야 한다.', () => {
                renderDialog();

                fireEvent.click(screen.getByText("등록"));

                expect(spyOnConsoleError).toBeCalledWith("입력값이 없는데요..");
            });
        });

        context("입력된 텍스트가 있다면", () => {
            context("제대로 된 입력값이라면(영어/숫자/공백)", () => {
                const sampleText = "sookhyehyungseungbeensoo6junior";

                it("handleClickSubmit에 입력값이 전달되어야 한다.", () => {
                    renderDialog();

                    fireEvent.change(screen.getByPlaceholderText("contents"), {
                        target: { name: "contents", value: sampleText },
                    });
                    fireEvent.click(screen.getByText("등록"));

                    expect(handleClickSubmit).toBeCalledWith(sampleText);
                });
            });
            context("이상한 입력값이 있다면", () => {
                const sampleText = "안녕안녕나는경수야~!~!";

                it('console.error에 "똑바로 좀 입력해" 문구가 찍혀야 한다.', () => {
                    renderDialog();

                    fireEvent.change(screen.getByPlaceholderText("contents"), {
                        target: { name: "contents", value: sampleText },
                    });
                    fireEvent.click(screen.getByText("등록"));

                    expect(window.alert).toBeCalledWith("똑바로 좀 입력해");
                });
            });
        });
    });
});
