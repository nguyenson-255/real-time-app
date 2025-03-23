import * as React from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Checkbox, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '../../node_modules/@mui/material/index';
import { BorderColor } from '../../node_modules/@mui/icons-material/index';

function not(a, b) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
    return a.filter((value) => b.includes(value));
}

export default function TransferList(todos) {

    const [checked, setChecked] = React.useState({ l: [], m: [], r: [] });
    const [left, setLeft] = React.useState([]);
    const [middle, setMiddle] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [todoitems, setTodoitems] = React.useState([]);

    React.useEffect(() => {
        setTodoitems(Object.values(todos)[0])
    }, [])

    React.useEffect(() => {
        setLeft(todoitems.filter((value) => value.status === 'Pending'));
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
    };

    const handleCheckedLeftMiddel = () => {
        setMiddle(middle.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked['l'], leftChecked));
    };

    const handleCheckedMiddelRight = () => {
        setRight(right.concat(middleChecked));
        setMiddle(not(middle, middleChecked));
        setChecked(not(checked['m'], middleChecked));
    };

    const handleCheckedRightMiddel = () => {
        setMiddle(middle.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked['r'], rightChecked));
    };

    const customList = (listIndex, items) => (
        <Paper sx={{ width: 300, height: 630, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;
                    console.log(value);
                    
                    return (
                        <Card>
                            <CardActionArea
                                key={value.id}
                                role="listitem"
                                onClick={handleToggle(listIndex, value)}
                            >
                                <Grid container direction="row" sx={{ justifyContent: 'space-between' }}>
                                    <CardContent sx={{ height: '100%'}}>
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
                            <Divider sx={{borderWidth: '0.1rem', borderColor: value.priority === 'High' ? 'red' : value.priority  === 'Low' ? 'gray' : 'green'}} />
                        </Card>
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
            <Grid item>{customList('l', left)}</Grid>
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
            <Grid item>{customList('m', middle)}</Grid>
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
            <Grid item>{customList('r', right)}</Grid>
        </Grid>
    );
}
