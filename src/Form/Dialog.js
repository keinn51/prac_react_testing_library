import React, { useState } from "react";

export default function Dialog({ title, description, onClickClose, onClickSubmit }) {
    const [text, setText] = useState("");

    function handleClickSubmit() {
        const stringOrNumberRegex = /^[a-zA-Z0-9]+$/;
        switch (true) {
            case text === "":
                console.error("입력값이 없는데요..");
                break;
            case stringOrNumberRegex.test(text) === false:
                alert("똑바로 좀 입력해");
                break;
            default:
                onClickSubmit(text);
                console.log("입력 보내기 성공");
        }
    }

    return (
        <div>
            <h2>{title}</h2>
            <div>{description}</div>
            <div>
                <input
                    type="text"
                    placeholder="contents"
                    name="contents"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
            </div>
            <div>
                <button type="button" onClick={onClickClose}>
                    닫기
                </button>
                <button type="button" onClick={handleClickSubmit}>
                    등록
                </button>
            </div>
        </div>
    );
}
