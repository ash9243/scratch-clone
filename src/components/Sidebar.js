import React from "react";
import { Grid } from '@material-ui/core';

import * as Constants from "../Common/Constants";
import { useStyles } from './SidebarStyles';

export default function Sidebar(props) {

    const classes = useStyles();
    return (
        <Grid container>
            <Grid container>Events</Grid>
            <Grid container>
                <Grid item className={classes.eventBlock}>
                    When FlagIcon Clicked
                </Grid>

                <Grid item className={classes.eventBlock}>
                    When Sprite Clicked
                </Grid>

            </Grid>
            <Grid container>Motions</Grid>
            <Grid container>
                <Grid item>Move 10 steps</Grid>
                <Grid item>Move AntiIcon 15</Grid>
                <Grid item>Move ClockIcon 15</Grid>
            </Grid>

        </Grid>
    );
}
