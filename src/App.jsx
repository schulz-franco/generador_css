import { useState } from "react";
import BoxShadow from "./components/boxShadow/boxShadow";
import Grid from "./components/grid/grid";

const Navbar = ({ setActual }) => {

	const onClickHandler = (ev, actual)=> {
		setActual(actual)
		document.querySelectorAll("#root > div > div.navbar > button").forEach(children => {
			children.classList.remove("actual")
		})
		ev.target.classList.add("actual")
	}

	return (
		<div className="navbar">
			<button className="actual" onClick={(ev)=> onClickHandler(ev, "grid")}>Grid</button>
			<button onClick={(ev)=> onClickHandler(ev, "boxShadow")}>Box shadow</button>
		</div>
	)
}

function App() {

	const [actual, setActual] = useState("grid")

	return (
		<div className="container">
			<Navbar setActual={setActual} />
			{(actual === "grid") && <Grid />}
			{(actual === "boxShadow") && <BoxShadow />}
		</div>
	);
}
	
export default App;
	