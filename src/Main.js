import React from "react";
import { Link } from "react-router-dom";

const Main = () => (
    <>
        <h1>
            <Link to={"/text"}>simple text test</Link>
        </h1>
        <h1>
            <Link to={"/form"}>form test</Link>
        </h1>
    </>
);

export default Main;
