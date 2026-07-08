import { useState } from "react";
import MyList from "./MyList";

export interface Item {
    id: string;
    text: string;
    clicked: boolean;
}

function MyContainer() {
    const header: string = "This is list header";
    const [items, setItems] = useState<Item[]>([
        {id: "1", text: "This is first task", clicked: false},
        {id: "2", text: "This is second task", clicked: false}
    ]);

    const [text, setText] = useState<string>("");
    const addItem = (): void => {
        if (text.trim() === "") {
            return;
        }

        const newItem: Item = {id: Date.now().toString(), text: text, clicked: false};
        setItems([...items, newItem]);
        setText("");
    };

    const updateList = (id: string): void => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, clicked: !item.clicked } : item
        );
        
        setItems(updatedItems);
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}/>
            <button onClick={addItem}>Add</button>
            <MyList
                header={header}
                items={items}
                updateList={updateList}/>
        </div>
    );
}

export default MyContainer;