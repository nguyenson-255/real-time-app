import * as React from 'react';
import { Button, Card, CardActionArea, CardContent, Checkbox, Divider, Grid, List, Paper, Typography } from '../../node_modules/@mui/material/index';
import { updateTask } from '../services/todoService';
import FormDialogEdit from './FormDialogEdit';

function not(a, b) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
    return a.filter((value) => b.includes(value));
}

export default function TransferList(props) {
    console.log("Received socket in TransferList:", props.socket);

    // const { current: socket } = socketRef;

    const [checked, setChecked] = React.useState({ l: [], m: [], r: [] });
    const [left, setLeft] = React.useState([]);
    const [middle, setMiddle] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [todoitems, setTodoitems] = React.useState([]);


    React.useEffect(() => {
        console.log(Object.values(props.todos)[0], props.socket);

        setTodoitems(props.todos);
    }, [props.todos])


    React.useEffect(() => {
        setLeft(todoitems.filter((value) => value.status === 'Not Started'));
        setMiddle(todoitems.filter((value) => value.status === 'In Progress'));
        setRight(todoitems.filter((value) => value.status === 'Completed'));
    }, [todoitems])

    const leftChecked = intersection(checked['l'] || [], left);
    const middleChecked = intersection(checked['m'] || [], middle);
    const rightChecked = intersection(checked['r'] || [], right);

    const handleToggle = (listIndex, value) => () => {
        setChecked((prevChecked) => {
            const currentChecked = prevChecked[listIndex] || []; // Get the correct list's checked items
            const currentIndex = currentChecked.indexOf(value);
            const newChecked = [...currentChecked];

            if (currentIndex === -1) {
                newChecked.push(value); // Add item if not checked
            } else {
                newChecked.splice(currentIndex, 1); // Remove item if already checked
            }
            return { ...prevChecked, [listIndex]: newChecked }; // Update only the affected list
        });
    };


    const handleCheckedMiddleLeft = () => {
        setLeft(left.concat(middleChecked));
        setMiddle(not(middle, middleChecked));
        setChecked(not(checked['m'], middleChecked));

        middleChecked.map((value) => {
            value.status = 'Not Started';
            updateTask(props.socket, value);
        });
    };

    const handleCheckedLeftMiddel = () => {
        setMiddle(middle.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked['l'], leftChecked));

        leftChecked.map((value) => {
            value.status = 'In Progress';
            updateTask(props.socket, value);
        });
    };

    const handleCheckedMiddelRight = () => {
        setRight(right.concat(middleChecked));
        setMiddle(not(middle, middleChecked));
        setChecked(not(checked['m'], middleChecked));

        middleChecked.map((value) => {
            value.status = 'Completed';
            updateTask(props.socket, value);
        });
    };

    const handleCheckedRightMiddel = () => {
        setMiddle(middle.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked['r'], rightChecked));

        rightChecked.map((value) => {
            value.status = 'In Progress';
            updateTask(props.socket, value);
        });

    };

    const customList = (listIndex, items, title) => (
        <Paper sx={{ width: 300, height: 630, overflow: 'auto' }}>
            <Typography variant='h5' sx={{ backgroundColor: 'gray', textAlign: 'center', fontSize: '2.5rem' }} >{title}</Typography>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;
                    return (

                        <React.Fragment>
                            <FormDialogEdit task={value} socket={props.socket} ></FormDialogEdit>
                            <Card>
                                <CardActionArea
                                    key={value.id}
                                    role="listitem"
                                    onClick={handleToggle(listIndex, value)}
                                >
                                    <Grid container direction="row" sx={{ justifyContent: 'space-between' }}>
                                        <CardContent sx={{ height: '100%' }}>
                                            <Typography variant="h5" component="div" className={(value.status === 'Completed') ? 'done' : ''} >
                                                {value.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {value.description}
                                            </Typography>

                                        </CardContent>
                                        <Checkbox
                                            checked={(checked[listIndex] || []).includes(value)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </Grid>
                                </CardActionArea>
                                <Divider sx={{ borderWidth: '0.1rem', borderColor: value.priority === 'high' ? 'red' : value.priority === 'low' ? 'gray' : 'green' }} />
                            </Card>
                        </React.Fragment>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid item>{customList('l', left, 'BackLog')}</Grid>
            <Grid item>
                <Grid container direction="column" sx={{ alignItems: 'center' }}>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeftMiddel}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected middel"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedMiddleLeft}
                        disabled={middleChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('m', middle, 'To Do')}</Grid>
            <Grid item>
                <Grid container direction="column" sx={{ alignItems: 'center' }}>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedMiddelRight}
                        disabled={middleChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRightMiddel}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected middel"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('r', right, 'Done')}</Grid>
        </Grid>
    );
}
