import React from "react";
import { Grid } from '@material-ui/core';


import * as Constants from "../Common/Constants";
import { useStyles } from './SidebarStyles';

const tagsProps = (classes, props) => {
    let eventListeners = {
        draggable: true,
        onDragStart: props.handleDragStart,
        onDrag: props.handleDrag,
        onDragEnd: props.handleDragEnd
    }
    return ({
        motionBlockProps: {
            ...eventListeners,
            item: true,
            className: `${classes.motionBlock} draggable`
        },
        eventBlockProps: {
            ...eventListeners,
            item: true,
            className: classes.eventBlock + " draggable"
        },
        headerText: {
            container: true,
            item: true,
            className: classes.headerText
        },
        blockContainer: {
            container: true,
            item: true,
            direction: "column"
        }
    })

}

const tagNames = () => {
    let flagClicked = Constants.TYPE_EVENT + ":" + Constants.SUBTYPE_EVENT_FLAG;
    let spriteClicked = Constants.TYPE_EVENT + ":" + Constants.SUBTYPE_EVENT_SPRITE;
    let motionLinear = Constants.TYPE_MOTION + ":" + Constants.SUBTYPE_MOTION_LINEAR;
    let rotateAnticlockwise = Constants.TYPE_MOTION + ":" + Constants.SUBTYPE_MOTION_ROTATE_ANTICLOCKWISE;
    let rotateClockwise = Constants.TYPE_MOTION + ":" + Constants.SUBTYPE_MOTION_ROTATE_CLOCKWISE;

    return {
        flagClicked,
        spriteClicked,
        motionLinear,
        rotateAnticlockwise,
        rotateClockwise
    }
}
export default function Sidebar(props) {

    const classes = useStyles();

    const { motionBlockProps, eventBlockProps, headerText, blockContainer } = tagsProps(classes, props);

    const {
        flagClicked,
        spriteClicked,
        motionLinear,
        rotateAnticlockwise,
        rotateClockwise
    } = tagNames();


    return (
        <Grid container direction="column" style={{ height: "100%", width: "100%" }}>
            <Grid {...headerText}>Events</Grid>
            <Grid {...blockContainer}>
                <Grid key="E:F:0" id="E:F:0" name={flagClicked} value="" {...eventBlockProps}>
                    When flag Clicked
                </Grid>

                <Grid key="E:S:0" id="E:S:0" name={spriteClicked} value="" {...eventBlockProps}>
                    When Sprite Clicked
                </Grid>

            </Grid>
            <Grid {...headerText}>Motions</Grid>
            <Grid {...blockContainer}>
                <Grid key="M:L:0" id="M:L:0" {...motionBlockProps} name={motionLinear} value="10">Move 10 steps</Grid>
                <Grid key="M:RA:0" id="M:RA:0" {...motionBlockProps} name={rotateAnticlockwise} value="15">Move anti 15</Grid>
                <Grid key="M:RC:0" id="M:RC:0" {...motionBlockProps} name={rotateClockwise} value="15">Move clock 15</Grid>
            </Grid>

        </Grid>
    );
}


