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

    const groups = useRef({});

    const classes = useStyles();

    const cloneTargetElement = (element, targetId) => {
        //clone
        let clone = element.cloneNode(true);
        totalElements.current++;
        clone.id = `${targetId[0]}:${targetId[1]}:${totalElements.current}`;
        clone.key = clone.id;

        //add to mid area
        document.getElementById("MidArea").appendChild(clone);

        //add event listeners
        clone.addEventListener("dragstart", handleDragStart);
        clone.addEventListener("drag", handleDrag);
        clone.addEventListener("dragend", handleDragEnd);

        //remove margin
        clone.style.margin = "0px";

        return clone;
    }

    const handleDragStart = (event) => {
        console.log("drag start");

        // element and provide id
        let targetId = event.currentTarget.id.split(":");

        if (targetId[2] === "0") {
            let clone = cloneTargetElement(event.currentTarget, targetId);
            selectedElement.current = clone;
        }
        else {
            selectedElement.current = event.currentTarget;
        }


        diffX.current = event.pageX - event.currentTarget.getBoundingClientRect().left;
        diffY.current = event.pageY - event.currentTarget.getBoundingClientRect().top;
        dragging.current = true;
    }

    const handleDrag = (event) => {

        if (dragging.current) {

            let left = event.pageX - diffX.current;
            let top = event.pageY - diffY.current;

            if (event.pageX !== 0) {

                selectedElement.current.style.position = "absolute";
                selectedElement.current.style.left = left + "px";
                selectedElement.current.style.top = top + "px";

            }
        }
    }

    const handleDragEnd = (event) => {
        dragging.current = false

        let [MAL, MAT, MAR, MAB] = getLTRB(document.getElementById("MidArea"));
        let [CEL, CET, CER, CEB] = getLTRB(selectedElement.current);

        //discard element if out of mid area
        if (MAL > CEL || MAT > CET || MAR < CER || MAB < CEB) {
            selectedElement.current.remove();
            return;
        }


        let newElementUI = selectedElement.current;
        let newElementOBJ = fillElementDetails(newElementUI);
        newElementOBJ.UIElement = newElementUI;
        let groupsObj = { ...groups.current };
        let groupsKeys = Object.keys(groupsObj);



        if (groupsKeys.length === 0) {
            newElementOBJ.Position = 1;
            newElementOBJ.Group = "group1";
            addToGroup(newElementOBJ, Constants.NEW_GROUP);
        }
        else {
            for (let i = 0; i < groupsKeys.length; i++) {
                for (let j = 0; j < groupsObj[groupsKeys[i]].length; j++) {
                    let currentOBJ = newElementOBJ;
                    let currentUI = currentOBJ.UIElement;
                    let existingOBJ = groupsObj[groupsKeys[i]][j];
                    let existingUI = existingOBJ.UIElement;


                    let [CEL, CET, CER, CEB] = getLTRB(currentUI);
                    let [EEL, EET, EER, EEB] = getLTRB(existingUI);
                    let [elHeight, elWidth] = getHeightWidth(currentUI);

                    // check if in range of x direction
                    if (CEL > EEL - elWidth && CEL < EEL + 2 * elWidth) {
                        // check if in range for bottom attachment
                        if (CET > EET + 0.5 * elHeight && CET < EET + 2 * elHeight) {


                            //event type cant be added to the bottom
                            if (currentOBJ.type === Constants.TYPE_EVENT) {
                                currentUI.remove();
                                return;
                            }


                            currentUI.style.top = EEB + 1 + "px";
                            currentUI.style.left = EEL + "px";

                            currentOBJ.Group = existingOBJ.Group;
                            currentOBJ.Position = existingOBJ.Position + 1;


                            addToGroup(currentOBJ, Constants.END_GROUP);

                            return;
                        }

                        // check if in range for top attachment
                        if (CEB > EET - elHeight && CEB < EET + 0.5 * elHeight) {
                            // if (existingElement.elementType === Constants.Type_Event) {
                            //     newElement.remove();
                            //     return;
                            // }

                            // if (groups[existingElement.group][existingElement.position - 2]) {
                            //     newElement.remove();

                            //     return;
                            // }

                            currentUI.style.top = EET - elHeight - 1 + "px";
                            currentUI.style.left = EEL + "px";

                            incrementPosition(existingOBJ.Group);

                            currentOBJ.Group = existingOBJ.Group;
                            currentOBJ.Position = 1;

                            addToGroup(currentOBJ, Constants.START_GROUP);

                            return;
                        }

                    }


                }
            }

            newElementOBJ.Group = `group${groupsKeys.length + 1}`;
            newElementOBJ.Position = 1;

            addToGroup(newElementOBJ, Constants.NEW_GROUP);
        }

    }

    const fillElementDetails = (newElementUI) => {
        let newElementOBJ = {};

        //name =  type:subtype
        let nameArr = newElementUI.getAttribute("name").split(":");
        let value = newElementUI.getAttribute("value");
        let id = newElementUI.getAttribute("id");


        newElementOBJ.Id = id;
        newElementOBJ.Type = nameArr[0];
        newElementOBJ.Subtype = nameArr[1];
        newElementOBJ.Value = value

        return newElementOBJ;

    }

    const addToGroup = (element, type) => {
        let groupObj = { ...groups.current };
        if (type === Constants.NEW_GROUP) {
            let newGroup = [];
            newGroup.push(element);
            groupObj[element.Group] = newGroup;
        }
        else {

            let oldGroup = [...groupObj[element.Group]];
            if (type === Constants.START_GROUP) {
                oldGroup = [element, ...oldGroup];
            }
            else {
                oldGroup = [...oldGroup, element];
            }
            groupObj[element.Group] = oldGroup;
        }
        groups.current = groupObj
        console.log('GROUP CURRENT', groups.current);
    }

    const incrementPosition = (groupName) => {

        console.log("groups ", groups);
        console.log("group name ", groupName);

        let group = [...groups.current[groupName]];

        for (let i = 0; i < group.length; i++) {
            group[i].Position++;
        }

        groups.current[groupName] = group;
        console.log('groups is ', groups.current);
    }

    const getLTRB = (element) => {
        let BR = element.getBoundingClientRect();
        let BRL = BR.left;
        let BRT = BR.top;
        let BRR = BR.right;
        let BRB = BR.bottom;

        return [
            BRL, BRT, BRR, BRB
        ]
    }

    const getHeightWidth = (element) => {
        let BR = element.getBoundingClientRect();
        let height = BR.height;
        let width = BR.width;

        return [height, width];
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
