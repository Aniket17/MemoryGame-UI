import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import GameInstance from './room/GameInstance';
import GameInstructions from "./common/GameInstructions";
import { DifficultySelector } from "./common/DifficultySelector";
import axios from 'axios';
import { Environment } from '../environment';
import { CardModel } from '../shared/CardModel';
import ActionNotification from '../shared/ActionNotification';


export class MemoryGame extends React.Component {
    constructor() {
        super();
        this.state = { gameId: null, difficulty: '', loading: false, playing: false, cards: [] };
    }
    handleChange = (difficulty) => {
        this.setState({ ...this.state, difficulty })
    }
    startGame = async (event) => {
        try {
            this.setState({ ...this.state, loading: true, hasError: false });
            var resp = await axios.post(`${Environment.apiServer}/game/play/${this.state.difficulty}`);
            let { gameId, cardIds } = resp.data;
            let cards = this.populateCards(cardIds);
            this.setState({ ...this.state, loading: true, playing: true, gameId, cards: [...cards] });
        } catch (error) {
            console.error(error);
            this.setState({ ...this.state, loading: false, hasError: true, errorMessage: "Could not start game, please check your internet connection." });
        }
    }

    populateCards = (cardIds) => {
        return cardIds.map(x => { return new CardModel(x) });
    }

    gameLoaded = () => {
        this.setState({ ...this.state, loading: false, });
    }

    render() {
        return (<div ref={this.wrapper}>
            {this.state.hasError && <ActionNotification severity="error" open={this.state.hasError} message={this.state.errorMessage}></ActionNotification>}
            <h4>Memory Game</h4>
            <GameInstructions />
            {this.state.loading && <CircularProgress />}
            {!this.state.loading && !this.state.playing &&
                <div className="row col-12">
                    <div className="col-sm-3">
                        <DifficultySelector difficulty={this.state.difficulty} handleChange={this.handleChange} />
                    </div>
                    <div className="col-sm-1 margin-t-40">
                        <Button variant="outlined" color="primary" onClick={this.startGame} disabled={!this.state.difficulty} >Play</Button>
                    </div>
                </div>
            }
            {this.state.playing && this.state.gameId && <div>
                <GameInstance gameLoaded={this.gameLoaded} gameId={this.state.gameId} cards={this.state.cards} />
            </div>}
        </div>);
    }
}




