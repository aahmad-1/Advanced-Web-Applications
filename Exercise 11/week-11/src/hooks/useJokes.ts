import { useState } from "react"

/* examples jokes:
{
  "type": "general",
  "setup": "What time is it?",
  "punchline": "I don't know... it keeps changing.",
  "id": 77
}

{
  "type": "general",
  "setup": "Why did the kid throw the watch out the window?",
  "punchline": "So time would fly.",
  "id": 389
}
*/

export interface IJoke {
    type: string
    setup: string
    punchline: string
    id: number
}

export function useJokes() {
    const [savedJokes, setSavedJokes] = useState<IJoke[]>([]);
    let wasAdded = false;
    const saveJoke = (joke: IJoke) => {
        setSavedJokes((prevJokes) => {
            const alreadySaved = prevJokes.some((j) => j.id === joke.id); // prevents same joke from being saved twice
            if (alreadySaved) {
                return prevJokes; 
            }
            wasAdded = true;
            return [...prevJokes, joke];
        });
        return wasAdded;
    };

    const deleteJoke = (id: number) => {
        setSavedJokes((prevJokes) =>
            prevJokes.filter((joke) => joke.id !== id)
        );
    };

    return { savedJokes, saveJoke, deleteJoke };
}