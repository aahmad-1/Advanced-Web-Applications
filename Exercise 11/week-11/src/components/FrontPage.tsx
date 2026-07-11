import {useEffect, useState} from "react";
import type {IJoke} from "../hooks/useJokes";
import "../styles/FrontPage.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface FrontPageProps {
    saveJoke?: (joke: IJoke) => boolean; // "?" makes it optional on frontPage so task 2 doesn't need it to pass
}

function FrontPage({ saveJoke }: FrontPageProps) {
    const [joke, setJoke] = useState<IJoke | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alreadySaved, setAlreadySaved] = useState<boolean>(false); // to warn user about alerady saved jokes, not needed but good to have 

    const fetchJoke = async (signal?: AbortSignal) => { // prevents duplicating fetch code and so button and useEffect can call it
        setLoading(true); // type "AbortSignal" according to AI
        setAlreadySaved(false);

        try {
            const response = await fetch(`https://official-joke-api.appspot.com/random_joke`, {signal});
            if (!response.ok) {
                throw new Error("Failed to fetch joke!");
            }
            const data: IJoke = await response.json();
            setJoke(data);
            setLoading(false); // fetch was done successfully

        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.log("Error:", error.message);
                    setLoading(false); // stop loading if the fetch fails
                }
            }
        }
    };

    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        fetchJoke(abortCtrl.signal);

        return () => abortCtrl.abort(); // cleanup
    }, []);

    const saveCurrJoke = () => {
        if (joke && saveJoke) {
            const wasAdded = saveJoke(joke);
            setAlreadySaved(!wasAdded); // true only if it was already saved
        }
    };

    return (
        <div className="front-page">
            <h1 className="head">Welcome to Joke Generator</h1>
            {loading && <p className="loading">Loading a joke...</p>}

            {!loading && joke && (
                <Card key={joke.id}>
                    <CardContent>
                        <Typography variant="h6">
                            {joke.setup}
                        </Typography>
                        <Typography>
                            {joke.punchline}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            <div className="buttons">
                <Button variant="contained" onClick={() => fetchJoke()}>
                    Get Joke
                </Button>
                <Button variant="contained" onClick={saveCurrJoke}>
                    Save Joke
                </Button>
            </div>
            {alreadySaved && <div className="jokeWarn">Joke already added!</div>} 
        </div>
    );
}
export default FrontPage;