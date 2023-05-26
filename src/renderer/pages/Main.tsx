import Entry from "./Entry";
import React from "react";
import "./css/main.css"
import { AuthenticateMC } from "src/core/Authenticate";
export function MainPage() {
    return (
        <>
        <Entry/>
        <button className="w-48" onClick={AuthenticateMC}> MCAuth </button>
        </>
    )
}