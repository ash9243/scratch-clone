import { makeStyles } from "@material-ui/core";

export const useStyles = () => {

    let styles = makeStyles((theme) => {
        return ({
            block: {
                padding: "10px",
                margin: "10px"
            },
            eventBlock: {
                extend: "block",
                backgroundColor: "rgba(245,158,11)"
            }
        });
    });

    return styles;
}