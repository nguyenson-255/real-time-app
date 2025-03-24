import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const [priority, setPriority] = React.useState('');
    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setPriority(event.target.value);
    };

    const handleStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create New Task
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            formJson.priority = priority;
                            formJson.status = status;

                            console.log(formJson);

                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Create new task item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Priority</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={priority}
                            onChange={handleChange}
                            label="Priority"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'low'}>Low</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'high'}>High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel >Status</InputLabel>
                        <Select
                            id="demo-simple-select-standard"
                            value={status}
                            onChange={handleStatus}
                            label="Status"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Not Started</MenuItem>
                            <MenuItem value={2}>In Progress</MenuItem>
                            <MenuItem value={3}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
