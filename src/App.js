import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";

import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useStyles } from './AppStyles';
import * as Constants from "./Common/Constants";


const tagProps = (classes, handleDragStart, handleDrag, handleDragEnd) => {
    return {
        sectionProps: {
            component: Card,
            container: true,
            className: classes.section,
            item: true,
        },
        dragFuncProps: {
            handleDragStart,
            handleDrag,
            handleDragEnd

        }
    }
}
export default function App() {

    const [dragging, setDragging] = useState(false);
    const [diffX, setDiffX] = useState(0)
    const [diffY, setDiffY] = useState(0)


    const classes = useStyles();

    const handleDragStart = (event) => {
        console.log("drag start");

        setDiffX(event.clientX - event.currentTarget.getBoundingClientRect().left);
        setDiffY(event.clientY - event.currentTarget.getBoundingClientRect().top);
        setDragging(true);
    }

    const handleDrag = (event) => {
        if (dragging) {

            let left = event.clientX - diffX;
            let top = event.clientY - diffY;

            if (event.clientX !== 0) {
                event.currentTarget.style.position = "absolute";
                event.currentTarget.style.left = left + "px";
                event.currentTarget.style.top = top + "px";
            }
        }
    }

    const handleDragEnd = (event) => {
        console.log('drag end');
        setDragging(false);
        return false;
    }

    const { sectionProps, dragFuncProps } = tagProps(classes, handleDragStart, handleDrag, handleDragEnd);

    return (
        <Grid container className={classes.mainContainer}>
            <Grid {...sectionProps} style={{ padding: "2px" }}>
                <Sidebar
                    {...dragFuncProps}
                />
            </Grid>
            <Grid {...sectionProps}>
                <MidArea
                />
            </Grid>
            <Grid {...sectionProps} style={{ width: "41.5%" }} >
                <PreviewArea
                    {...dragFuncProps}
                />
            </Grid>
        </Grid>
    );
}
