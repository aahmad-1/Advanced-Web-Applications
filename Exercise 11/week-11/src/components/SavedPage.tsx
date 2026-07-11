import type {IJoke} from "../hooks/useJokes";
import "../styles/SavedPage.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface SavedPageProps {
    savedJokes: IJoke[];
    deleteJoke: (id: number) => void;
}

function SavedPage({ savedJokes, deleteJoke }: SavedPageProps) {
    if (savedJokes.length === 0) {
        return <h1 className="head">No saved jokes yet.</h1>;
    }

    return (
        <div className="saved-page">
            <h1 className="head">Saved Jokes</h1>
            {savedJokes.map((joke) => (
                <Card key={joke.id}>
                    <CardContent>
                        <Typography variant="h6">
                            {joke.setup}
                        </Typography>
                        <Typography>
                            {joke.punchline}
                        </Typography>
                        <Button variant="contained" onClick={() => deleteJoke(joke.id)}>
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default SavedPage; 