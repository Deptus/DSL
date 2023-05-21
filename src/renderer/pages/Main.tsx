import { MCAuthMS } from "auth/MinecraftAuth";
import Entry from "./Entry";
import React from "react";
import "./css/Entry.css"
export function MainPage() {
    return (
        <>
        <Entry/>
        <button className="w-48" onClick={MCAuthMS}> MCAuth </button>
        </>
    )
}