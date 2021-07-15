import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:2406");

export interface Note {
  id: string;
  text: string;
  date: string;
}

const App = (): JSX.Element => {
  //localStorage.clear();

  const initialState: Note[] = [
    {
      id: "1",
      text: "This is my first note!",
      date: "15.4.2021"
    },
    {
      id: "2",
      text: "This is my second note!",
      date: "21.4.2021"
    },
    {
      id: "3",
      text: "This is my third note!",
      date: "28.4.2021"
    },
    {
      id: "4",
      text: "This is my new note!",
      date: "30.4.2021"
    }
  ];

  const [notes, setNotes] = useState(initialState);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    client.onopen = () => {
      console.log("New WebSocket client connected!");
    };

    client.onmessage = message => {
      const data: Note[] = JSON.parse(message.data.toString());
      if (data) {
        setNotes(data);
      }
    };

    const savedNotes = JSON.parse(
      localStorage.getItem("react-notes-app-data") || JSON.stringify(notes)
    );
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text: string) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString("fi-FI")
    };

    updateNote([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    updateNote(notes.filter(note => note.id !== id));
  };

  const updateNote = (newNotes: Note[]) => {
    setNotes(newNotes);
    client.send(JSON.stringify(newNotes));
  };

  const handleDefaultClick = () => {
    setNotes(initialState);
    client.send(JSON.stringify(initialState));
  };

  return (
    <div className="container">
      <Search handleSearchNote={setSearchText} />
      <NotesList
        notes={Object.values(notes).filter(note =>
          note.text.toLowerCase().includes(searchText)
        )}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
      <button className="default" onClick={handleDefaultClick}>
        Set default
      </button>
    </div>
  );
};

export default App;
