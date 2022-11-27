
import './App.css';
import Team from "./viewer/Team";
import GameTimer from "./viewer/GameTimer";
import {Container, Row, Col} from "react-bootstrap";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Viewer from "./viewer/Viewer";
import Remote from "./remote/Remote";

export const serverName = "192.168.86.37";



function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Viewer />,
        },
        {
            path: "/remote",
            element: <Remote />,
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default App;
