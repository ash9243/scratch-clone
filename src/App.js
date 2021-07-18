import React, { useState, useEffect, useRef } from "react";
import { Grid, Card } from "@material-ui/core";

import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useStyles } from './AppStyles';
import * as Constants from "./Common/Constants";


const tagProps = (classes, handleDragStart, handleDrag, handleDragEnd, handleSpriteDragStart, handleSpriteDrag, handleSpriteDragEnd, performOperations) => {
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
        },
        spriteDragProps: {
            handleClick: performOperations,
            handleSpriteDragStart,
            handleSpriteDrag,
            handleSpriteDragEnd
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

    const currentX = useRef(0);
    const currentY = useRef(0);
    const currentD = useRef(0);

    const spriteX = useRef(0);
    const spriteY = useRef(0);
    const spriteDragging = useRef(false);
    const selectedSprite = useRef(null);

    const [workingSprite, setWorkingSprite] = useState(Constants.CAT_SPRITE);
    const [allSprites, setAllSprites] = useState([Constants.CAT_SPRITE]);

    const classes = useStyles();

    const handleSpriteDragStart = (event) => {
        spriteX.current = event.pageX - event.currentTarget.getBoundingClientRect().left;
        spriteY.current = event.pageY - event.currentTarget.getBoundingClientRect().top;
        spriteDragging.current = true;
        selectedSprite.current = event.currentTarget;
    }

    const handleSpriteDrag = (event) => {

        if (spriteDragging.current) {

            let left = event.pageX - spriteX.current;
            let top = event.pageY - spriteY.current;

            if (event.pageX !== 0) {

                selectedSprite.current.style.position = "absolute";
                selectedSprite.current.style.left = left + "px";
                selectedSprite.current.style.top = top + "px";

            }
        }
    }

    const handleSpriteDragEnd = (event) => {
        spriteDragging.current = false;
        currentX.current = 0;
        currentY.current = 0;
        currentD.current = 0;
    }

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

        // element and provide id
        let targetId = event.currentTarget.id.split(":");

        //clone
        if (targetId[2] === "0") {
            let clone = cloneTargetElement(event.currentTarget, targetId);
            selectedElement.current = clone;
        }

        //move
        else {

            let move = event.currentTarget
            let pos = move.Position;
            let grpName = move.Group;
            let grpArr = [...groups.current[grpName]];
            if (pos === 1 && grpArr.length > 1) {
                //top element

                grpArr = removeFromGroup(grpArr, Constants.REMOVE_FIRST_ELEMENT);
            }
            else if (pos === grpArr.length) {
                //bottom element
                grpArr = removeFromGroup(grpArr, Constants.REMOVE_LAST_ELEMENT);

            }
            else {
                //middle element
                console.log('middle element');
                grpArr = removeFromGroup(grpArr, Constants.REMOVE_MIDDLE_ELEMENT);

            }
            if (grpArr.length === 0) {
                delete groups.current[grpName]
            }
            else {
                groups.current[grpName] = grpArr;
            }



            selectedElement.current = move;
        }


        diffX.current = event.pageX - event.currentTarget.getBoundingClientRect().left;
        diffY.current = event.pageY - event.currentTarget.getBoundingClientRect().top;
        dragging.current = true;
    }

    const removeFromGroup = (group, type) => {
        if (type === Constants.REMOVE_FIRST_ELEMENT) {
            let removedElement = group.shift();
            changePosition(removedElement.Group, Constants.DECREASE_POSITION);
            return group;
        }
        else if (type === Constants.REMOVE_LAST_ELEMENT) {
            group.pop();
            return group;

        }
        else {

        }
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
            newElementOBJ = addDetailsUI(newElementOBJ, 1, "group1");
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

                            currentOBJ = addDetailsUI(currentOBJ, existingOBJ.Position + 1, existingOBJ.Group);

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

                            changePosition(existingOBJ.Group, Constants.INCREASE_POSITION);

                            currentOBJ.Group = existingOBJ.Group;
                            currentOBJ.Position = 1;

                            currentOBJ = addDetailsUI(currentOBJ, 1, existingOBJ.Group);


                            addToGroup(currentOBJ, Constants.START_GROUP);

                            return;
                        }

                    }


                }
            }

            newElementOBJ = addDetailsUI(newElementOBJ, 1, `group${groupsKeys.length + 1}`);
            addToGroup(newElementOBJ, Constants.NEW_GROUP);
        }

        console.log('final groups is ', groups.current);
    }

    const addDetailsUI = (element, pos, group) => {
        element.Position = pos;
        element.Group = group;
        element.UIElement.Position = pos;
        element.UIElement.Group = group;
        return element;
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
    }

    const changePosition = (groupName, type) => {


        let group = [...groups.current[groupName]];

        if (type === Constants.INCREASE_POSITION) {
            for (let i = 0; i < group.length; i++) {
                group[i].Position++;
                group[i].UIElement.Position++;
            }
        }
        else {
            for (let i = 0; i < group.length; i++) {
                group[i].Position--;
                group[i].UIElement.Position--;
            }
        }

        groups.current[groupName] = group;
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

    const performOperations = (eventType, clickedElement) => {

        let groupsObj = { ...groups.current };
        let groupsKeys = Object.keys(groupsObj);

        if (clickedElement !== workingSprite) {
            return;
        }


        for (let i = 0; i < groupsKeys.length; i++) {
            if (
                groupsObj[groupsKeys[i]][0].Type === Constants.TYPE_EVENT &&
                groupsObj[groupsKeys[i]][0].Subtype === eventType
            ) {
                for (let j = 0; j < groupsObj[groupsKeys[i]].length; j++) {

                    performMotion(groupsObj[groupsKeys[i]][j]);
                    // sleep(1000);
                }
            }
        }

    }

    const performMotion = (element) => {
        //motion
        if (element.Type === Constants.TYPE_MOTION) {
            //move steps
            if (element.Subtype === Constants.SUBTYPE_MOTION_LINEAR) {
                performMovement(parseInt(element.Value, 10));
            }
            //rotate anticlockwise
            else if (
                element.Subtype === Constants.SUBTYPE_MOTION_ROTATE_ANTICLOCKWISE
            ) {
                performRotation(
                    parseInt(element.Value, 10) * -1
                );
            }
            //rotate clockwise
            else {
                performRotation(parseInt(element.Value, 10));
            }
        }

        else if (element.Type === Constants.TYPE_LOOKS) {
            if (element.Subtype === Constants.SUBTYPE_LOOKS_HELLO) {
                sayHello();
            }
        }

        else if (element.Type === Constants.TYPE_CONTROLS) {
            if (element.Subtype === Constants.SUBTYPE_CONTROLS_WAIT) {
                wait(parseInt(element.Value, 10) * 1000)
            }
        }
    }

    const performRotation = (degree) => {
        let catSprite = document.getElementById(workingSprite + " DIV");
        let rotation = currentD.current;
        let trans = rotation + degree;
        catSprite.style.transform = `rotate(${trans}deg)`;

        currentD.current = trans;
    }

    const performMovement = (steps) => {
        let catSpriteDiv = document.getElementById(workingSprite + " DIV");


        let catX = catSpriteDiv.getBoundingClientRect().left;
        let catY = catSpriteDiv.getBoundingClientRect().top;
        // let catX = currentX.current;
        // let catY = currentY.current;
        let rotation = currentD.current;
        let cosX = Math.cos(rotation * (Math.PI / 180));
        let sinX = Math.sin(rotation * (Math.PI / 180));

        //need to find using sin and cosin
        let x = steps * cosX;
        let y = steps * sinX;


        // catSpriteDiv.style.transform = `translate(
        //   ${catX + x}px,
        //   ${catY + y}px
        //   )`;

        catSpriteDiv.style.position = "absolute";
        catSpriteDiv.style.top = catY + y + "px";
        catSpriteDiv.style.left = catX + x + "px";

        currentX.current = catX + x;
        currentY.current = catY + y;
    }

    const sayHello = () => {

        let cat = document.getElementById('catSprite');
        let event = new Event("mouseenter");
        let event2 = new Event("mouseleave");
        cat.dispatchEvent(event);

        setTimeout(() => {
            cat.dispatchEvent(event2);
        }, 2000)
    }

    const wait = (milliseconds) => {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            // if (new Date().getTime() - start > milliseconds - 3) {
            //     console.log(' 3 sec complete')
            // }
            if (new Date().getTime() - start > milliseconds) {
                break;
            }
        }
    }


    const { sectionProps, dragFuncProps, spriteDragProps } = tagProps(classes, handleDragStart, handleDrag, handleDragEnd, handleSpriteDragStart, handleSpriteDrag, handleSpriteDragEnd, performOperations);

    return (
        <Grid container className={classes.mainContainer}>
            <Grid {...sectionProps} style={{ padding: "2px" }}>
                <Sidebar
                    workingSprite={[workingSprite, setWorkingSprite]}
                    allSprites={[allSprites, setAllSprites]}
                    {...dragFuncProps}
                />
            </Grid>
            <Grid {...sectionProps}>
                <MidArea
                />
            </Grid>
            <Grid {...sectionProps} style={{ width: "41.5%" }}  >
                <PreviewArea
                    workingSprite={[workingSprite, setWorkingSprite]}
                    allSprites={[allSprites, setAllSprites]}
                    {...spriteDragProps}
                />
            </Grid>
        </Grid>
    );
}
