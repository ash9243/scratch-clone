import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

import * as Constants from "./Common/Constants";

export default function App() {

    return (
        <Grid>
            <Sidebar
            />
            <MidArea
            />
            <PreviewArea
            />
        </Grid>
    );
}
