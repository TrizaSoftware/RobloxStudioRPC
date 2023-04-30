import React, { useEffect } from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Alert, { AlertColor } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
//import Link from '../components/Link';
import {styled} from '@mui/material';
import io, { Socket } from 'socket.io-client';
import config from '../../config.json';
import Router from 'next/router';

const Root = styled('div')(({theme}) => {
    return {
        textAlign: 'center',
        paddingTop: theme.spacing(4),
    };
})


function Home() {
    const [open, setOpen] = React.useState(false);
    const [alertText, setText] = React.useState("")
    const [alertSeverity, setSeverity] = React.useState("info" as AlertColor)
    const handleClose = () => setOpen(false);
    const handleClick = () => setOpen(true);
    let socket: Socket
    useEffect(() => {
        if (!Router.isReady){
            return;
        }
        socket = io(`http://localhost:${config.port}`);
        socket.on("connect", () => {
            setOpen(true)
            setSeverity("success")
            setText("Successfully Connected To Socket!")
        });
        socket.on("disconnect", () => {
            setOpen(true)
            setSeverity("error")
            setText("Socket Disconnected!")
        })
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Roblox Studio RPC</title>
            </Head>
            <Root>
            <Box sx={{ width: '80%' }} ml={"10%"}>
                <Collapse in={open}>
                    <Alert
                    severity={alertSeverity}
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                        {alertText}
                    </Alert>
                </Collapse>
                </Box>
                <Typography variant='h4' fontFamily={"GothamMedium"}>
                    Roblox Studio RPC
                </Typography>
                <Typography variant='body1' fontFamily={"GothamMedium"}>
                    Created by The T:Riza Corporation
                 </Typography>
            </Root>
        </React.Fragment>
    );
};

export default Home;
