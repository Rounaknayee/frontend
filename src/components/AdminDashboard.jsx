import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { rooturl } from "../config";
import Fileupload from "./Fileupload";

export default function AdminDashboard() {
    return (
        <div>
        <h1>Admin Dashboard</h1>
        <Fileupload />
        

        </div>
    );
    }