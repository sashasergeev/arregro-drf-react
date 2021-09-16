import React, {useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import {
    Container,
    Typography,
    Grid,
    Link,
    TextField,
    Button,
    Avatar
} from '@material-ui/core';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '20%',
        padding:20
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '150%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))




export const Register = (props) => {
    const classes = useStyles();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password != password2) {return null}
        const newUser = {
            username,
            email,
            password
        };
        axios.post('api/auth/register', newUser)
            .then(res => {
                let token = res.data.token;
                localStorage.setItem('token', token)
                props.handleRegistration(token, newUser.username)
            })
            .catch(err => console.log(err))

    }



    return (
        <Container maxWidth="xs" style={{backgroundColor: '#a2a2a2'}}>
        {props.isAuth && <Redirect to="/" />}
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}> {/* form inside */}
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    type='password'
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    type='password'
                    required
                    fullWidth
                    id="password2"
                    label="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                <Link href="#/login" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
  );
}
