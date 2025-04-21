import EditSharpIcon from '@mui/icons-material/EditSharp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { IconButton } from '../../node_modules/@mui/material/index';
import { addTask } from '../services/todo.service';

export default function FormDialogEdit({socket, task}) {    

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
            <IconButton aria-label="delete" onClick={handleClickOpen}>
                <EditSharpIcon />
            </IconButton>
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
                                                        
                            addTask(socket.socket, formJson);
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
                            <MenuItem value={'Not Started'}>Not Started</MenuItem>
                            <MenuItem value={'In Progress'}>In Progress</MenuItem>
                            <MenuItem value={'Completed'}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
