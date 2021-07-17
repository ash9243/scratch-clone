import React from "react";
import { Grid } from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';
import ReplayIcon from '@material-ui/icons/Replay';

import * as Constants from "../Common/Constants";
// import FlagIcon from './FlagIcon';
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
            className: classes.motionBlock
        },
        eventBlockProps: {
            ...eventListeners,
            item: true,
            className: classes.eventBlock
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
export default function Sidebar(props) {

    const classes = useStyles();

    const { motionBlockProps, eventBlockProps, headerText, blockContainer } = tagsProps(classes, props);

    return (
        <Grid container direction="column">
            <Grid {...headerText}>Events</Grid>
            <Grid {...blockContainer}>
                <Grid id="E:F:0" {...eventBlockProps}>
                    When flag Clicked
                </Grid>

                <Grid id="E:S:0" {...eventBlockProps}>
                    When Sprite Clicked
                </Grid>

            </Grid>
            <Grid {...headerText}>Motions</Grid>
            <Grid {...blockContainer}>
                <Grid id="M:L:0" {...motionBlockProps}>Move 10 steps</Grid>
                <Grid id="M:RA:0" {...motionBlockProps}>Move anti 15</Grid>
                <Grid id="M:RC:0" {...motionBlockProps}>Move clock 15</Grid>
            </Grid>

        </Grid>
    );
}


