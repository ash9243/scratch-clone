import React, { useState, useEffect, useRef } from "react";
import { Grid, Card } from "@material-ui/core";

import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useStyles } from './AppStyles';
import * as Constants from "./Common/Constants";


const tagProps = (classes, handleCloneDragStart, handleCloneDrag, handleCloneDragEnd) => {
    return {
        sectionProps: {
            component: Card,
            container: true,
            className: classes.section,
            item: true,
        },
        dragFuncProps: {
            handleCloneDragStart,
            handleCloneDrag,
            handleCloneDragEnd

        }
    }
}
export default function App() {

    const [dragging, setDragging] = useState(false);
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [cloneId, setCloneId] = useState(0)

    const totalElements = useRef(0);

    const classes = useStyles();



    const handleCloneDragStart = (event) => {
        console.log("drag start");

        //clone element and provide id
        let targetId = event.currentTarget.id.split(":");
        let clone = event.currentTarget.cloneNode(true);
        totalElements.current++;
        console.log('total elements', totalElements);
        clone.id = `${targetId[0]}:${targetId[1]}:${totalElements.current}`;
        clone.key = clone.id;

        document.getElementById("MidArea").appendChild(clone);


        console.log(clone.id);
        setCloneId(clone.id);
        setDiffX(event.clientX - event.currentTarget.getBoundingClientRect().left);
        setDiffY(event.clientY - event.currentTarget.getBoundingClientRect().top);
        setDragging(true);
    }

    const handleCloneDrag = (event) => {
        if (dragging) {

            let left = event.clientX - diffX;
            let top = event.clientY - diffY;

            if (event.clientX !== 0) {
                document.getElementById(cloneId).style.position = "absolute";
                document.getElementById(cloneId).style.left = left + "px";
                document.getElementById(cloneId).style.top = top + "px";
            }
        }
    }

    const handleCloneDragEnd = (event) => {
        console.log('drag end');
        setDragging(false);
        return false;
    }

    const handleMoveDragStart = (event) => {
        console.log("drag start");

        setDiffX(event.clientX - event.currentTarget.getBoundingClientRect().left);
        setDiffY(event.clientY - event.currentTarget.getBoundingClientRect().top);
        setDragging(true);
    }

    const handleMoveDrag = (event) => {
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

    const handleMoveDragEnd = (event) => {
        console.log('drag end');
        setDragging(false);
        return false;
    }

    const { sectionProps, dragFuncProps } = tagProps(classes, handleCloneDragStart, handleCloneDrag, handleCloneDragEnd);

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
