import React from 'react';
import { Card, CardActions, CardContent, Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

export default class PlayingCard extends React.Component {
    componentDidMount() {
    }
    componentDidUpdate(card) {
    }
    pick = () => {
        this.setState({ loading: true });
        this.props.pick(this.props.card)
    };
    render() {
        return (
            <Card className="margin-10">
                <CardContent>
                    <div className="flip-card">
                        <div className={this.props.card.picked && !this.props.card.matched ? "flip-card-inner flip" : " flip-card-inner"}>
                            <div className={this.props.card.matched ? "flip-card-front bg-success" : "flip-card-front"}>
                                {this.props.card.matched ? "Matched" : "Available"}
                            </div>
                            {this.props.card.picked &&
                                <div className={this.props.card.matched ? "flip-card-back bg-success" : this.props.disablePick ? "flip-card-back bg-danger" : "flip-card-back"}>
                                    {this.props.card.picked ? this.props.card.cardNumber : "Hidden"}
                                </div>}
                        </div>
                    </div>
                </CardContent>
                <CardActions>
                    {this.props.card.loading && <CircularProgress></CircularProgress>}
                    {!this.props.card.loading && !this.props.card.picked && !this.props.card.matched && <Button size="small" disabled={this.props.disablePick} onClick={this.pick}>Pick</Button>}
                </CardActions>
            </Card>
        );
    }
}