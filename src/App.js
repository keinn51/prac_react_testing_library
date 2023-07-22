import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./SimpleText/Profile";
import Main from "./Main";
import Dialog from "./Form/Dialog";

const App = () => (
    <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/text" element={<Profile username="kyungsle" name="이경수" />}></Route>
        <Route
            path="/form"
            element={
                <Dialog
                    title={"hello world"}
                    description="this is jest test for form"
                    onClickClose={() => {}}
                    onClickSubmit={() => []}
                />
            }
        ></Route>
    </Routes>
);

export default App;
