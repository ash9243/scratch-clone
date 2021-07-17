import React, { useState, useEffect, useRef } from "react";
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




    const selectedElement = useRef(null);

    const totalElements = useRef(0);
    const diffX = useRef(0);
    const diffY = useRef(0);
    const dragging = useRef(false);


    const classes = useStyles();



    const handleDragStart = (event) => {
        console.log("drag start");

        // element and provide id
        let targetId = event.currentTarget.id.split(":");

        if (targetId[2] === "0") {
            //clone
            let clone = event.currentTarget.cloneNode(true);
            totalElements.current++;
            console.log('total elements', totalElements);
            clone.id = `${targetId[0]}:${targetId[1]}:${totalElements.current}`;
            clone.key = clone.id;

            //add to mid area
            document.getElementById("MidArea").appendChild(clone);

            //add event listeners
            clone.addEventListener("dragstart", handleDragStart);
            clone.addEventListener("drag", handleDrag);
            clone.addEventListener("dragend", handleDragEnd);

            selectedElement.current = clone;
        }
        else {
            selectedElement.current = event.currentTarget;
        }


        diffX.current = event.clientX - event.currentTarget.getBoundingClientRect().left;
        diffY.current = event.clientY - event.currentTarget.getBoundingClientRect().top;
        dragging.current = true;
    }

    const handleDrag = (event) => {

        if (dragging.current) {

            let left = event.clientX - diffX.current;
            let top = event.clientY - diffY.current;

            if (event.clientX !== 0) {

                selectedElement.current.style.position = "absolute";
                selectedElement.current.style.left = left + "px";
                selectedElement.current.style.top = top + "px";

            }
        }
    }

    const handleDragEnd = (event) => {
        console.log('drag end');
        dragging.current = false
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
