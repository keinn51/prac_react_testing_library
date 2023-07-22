import React, { useState } from "react";

export default function Dialog({ title, description, onClickClose, onClickSubmit }) {
    const [state, setState] = useState({ contents: "" });

    function handleChange(event) {
        const { value, name } = event.target;

        setState({
            ...state,
            [name]: value,
        });
    }

    function handleClickSubmit() {
        if (!state.contents) {
            console.error("에러가 발생했습니다.");
            return;
        }

        onClickSubmit(state.contents);
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
                    onChange={handleChange}
                    value={state.contents}
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
