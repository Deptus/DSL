import { MCAuthMS } from "auth/MinecraftAuth";
import React from "react";
import "./css/Entry.css"
export function MainPage() {
    return (
        <button className="w-48" onClick={MCAuthMS}> MCAuth </button>
    )
}