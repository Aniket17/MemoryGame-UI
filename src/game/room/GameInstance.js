import React from 'react';
import PlayingCard from '../card/PlayingCard';
import ActionNotification from '../../shared/ActionNotification';
import axios from 'axios';
import { Environment } from "../../environment";
import { withRouter } from 'react-router-dom';

class GameInstance extends React.Component {
    currentPick = null;
    constructor(props) {
        super(props);
        this.state = { cards: this.props.cards, lastPick: null, revealingCard: false, gameOver: false };
    }
    componentDidMount() {
        if (!this.props.gameId) {
            throw new Error("GameId not provided.");
        }
        this.props.gameLoaded();
    }
    pick = (card) => {
        try {
            let stateCards = [...this.state.cards];
            //get picked card from state
            let pickedCard = stateCards.find(x => x.id === card.id);
            //set loading on card
            pickedCard.loading = true;
            //let loading state sync and then update
            this.setState({ ...this.state, cards: stateCards }, () => { this.getCardFromServer(pickedCard, stateCards) });
        } catch (error) {
            console.error(error);
        }
    }
    async getCardFromServer(pickedCard, stateCards) {
        //get card response from server..
        let response = await axios.get(`${Environment.apiServer}/game/room/${this.props.gameId}/pick/${pickedCard.id}`);
        let responseCard = response.data;
        let revealingCard = this.state.lastPick != null;
        let lastPick = this.state.lastPick ?? pickedCard;
        let message = null;
        let showMessage = false;

        //card should always flip
        pickedCard.loading = false;
        pickedCard.picked = true;
        pickedCard.matched = responseCard.matched;
        pickedCard.cardNumber = responseCard.cardNumber;
        pickedCard.gameOver = responseCard.gameOver;

        if (pickedCard.matched) {
            //match found.. remove both
            revealingCard = false;
            lastPick = null;
            message = "Great.. you found a match!!";
            showMessage = true;
            stateCards.filter(x => x.picked === true).forEach(x => x.matched = true);
            if (pickedCard.gameOver) {
                message = "You have successfully completed game, redirecting to results page.";
                setTimeout(() => {
                    this.props.history.push("/game/result/" + this.props.gameId);
                }, 3000);
            }
        } else {
            showMessage = false;
        }
        //else is should reveal the value for 3000 miliseconds
        if (!pickedCard.matched) {
            if (this.state.lastPick != null) {
                setTimeout(() => {
                    //close both
                    stateCards.filter(x => x.picked === true).forEach(x => {
                        x.picked = false;
                    });
                    this.setState({ ...this.state, cards: stateCards, lastPick: null, revealingCard: false });
                }, 3000);
            }
        }

        this.setState({ ...this.state, cards: stateCards, lastPick, revealingCard, gameOver: pickedCard.gameOver, message, showMessage });
    }
    render() {
        return (
            <div>
                {!this.state.gameOver && <div className="row col-12">
                    {this.state?.cards.map(c => <PlayingCard className="col-2 m-10" card={c} disablePick={this.state.revealingCard} pick={this.pick} key={c.id} />)}
                </div>}
                {this.state.showMessage &&
                    <React.Fragment>
                        <ActionNotification severity="success" message={this.state.message}></ActionNotification>
                    </React.Fragment>}
            </div>
        )
    }
}

export default withRouter(GameInstance);