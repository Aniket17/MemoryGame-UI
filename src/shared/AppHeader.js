import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import {
    Link
} from "react-router-dom";
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
export function AppHeader() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <ViewCarouselIcon></ViewCarouselIcon>
                </IconButton>
                <Typography variant="h6">
                    <Link to="/" className="menu-link">Memory Game</Link>
                </Typography>
                <Link to="/game" className="menu-link">Play Game</Link>
            </Toolbar>
        </AppBar>
    )
}