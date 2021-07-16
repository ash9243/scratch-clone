import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
    let block = {
        padding: "10px",
        margin: "10px",
        fontSize: "14px",
        width: "fit-content",
        color: "white"
    }
    return ({
        block,
        eventBlock: {
            ...block,
            backgroundColor: "rgb(245,158,11)"
        },
        motionBlock: {
            ...block,
            backgroundColor: "rgba(59,130,246)"
        },
        flagIcon: {
            color: "rgba(5,150,105)",
            transform: "translate(0px,6px)"
        }
    });
});