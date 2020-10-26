import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Environment } from '../../environment';
import { ErrorScore } from "./ErrorScore";
import { Link, useParams } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';

export function Result() {
    let { gameId } = useParams();
    const [result, setResult] = useState({ errorScore: null, timeInSeconds: 0, loading: false, hasError: false });
    useEffect(() => {
        const getResults = async (gameId) => {
            try {
                setResult(r => { return { ...r, loading: true } });
                var resp = await axios.get(`${Environment.apiServer}/game/room/${gameId}/results`);
                setResult(r => {
                    return { ...r, loading: false, errorScore: resp.data.errorScore, timeInSeconds: resp.data.timeInSeconds }
                });
            } catch (error) {
                // handle error..
                console.error(error);
                setResult(r => { return { ...r, hasError: true, loading: false } });
            }
        };
        getResults(gameId);
    }, [gameId])

    return (<div className="">
        {result.hasError && <p className="alert alert-danger">Error while getting results. Try again.</p>}
        {result.loading && <CircularProgress></CircularProgress>}
        {!result.loading && <div>
            {!result.hasError &&
                <div className="row col-12">
                    <div className="col-12">
                        <ErrorScore errorScore={result.errorScore}></ErrorScore>
                        <label>Time in Seconds: {result.timeInSeconds.toFixed(2)} seconds</label>
                    </div>
                    <div className="col-12">
                        <Link to="/game">Play Again?</Link>
                    </div>
                </div>}
        </div>}
    </div>)
}