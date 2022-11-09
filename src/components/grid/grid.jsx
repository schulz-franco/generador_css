import { useState } from "react"
import "./grid.scss"

const medidas = require("../../data/medidas.json")

const generarEstilosGrid = (iterable)=> {
	let valor = ""
	iterable.forEach(()=> {
		valor += " 1fr"
	})
	return valor
}

const Grid = () => {

	const [columnas, setColumnas] = useState(Array(4).fill(null))
	const [filas, setFilas] = useState(Array(4).fill(null))
	const [gap, setGap] = useState(0)
	const [gapUnidad, setGapUnidad] = useState("px")

	const onChangeHandlerColumnas = (ev) => {
		setColumnas(Array(parseInt(ev.target.value)).fill(null))
		document.querySelector("#root > div > div.modulo > div.opciones > label:nth-child(1) > input[type=number]").value = parseInt(ev.target.value)	
	}

	const onChangeHandlerFilas = (ev) => {
		setFilas(Array(parseInt(ev.target.value)).fill(null))
		document.querySelector("#root > div > div.modulo > div.opciones > label:nth-child(2) > input[type=number]").value = parseInt(ev.target.value)	
	}

	const onChangeHandlerGap = (ev) => {
		setGap(parseFloat(ev.target.value))
		document.querySelector("#root > div > div.modulo > div.opciones > label:nth-child(3) > input[type=number]").value = parseFloat(ev.target.value)	
	}

	let estilos = {
		gridTemplateColumns: generarEstilosGrid(columnas),
		gridTemplateRows: generarEstilosGrid(filas),
		gap: gap + gapUnidad
	} 

	return (
		<div className="modulo">

			<div className="opciones">
				<label>
					Columnas
					<input defaultValue={4} min={1} max={8} onChange={(ev)=> onChangeHandlerColumnas(ev)} type="range" />
					<input defaultValue={columnas.length} min={1} onChange={(ev)=> onChangeHandlerColumnas(ev)} type="number"/>
				</label>
				<label>
					Filas
					<input defaultValue={4} min={1} max={8} onChange={(ev)=> onChangeHandlerFilas(ev)} type="range" />
					<input defaultValue={filas.length} min={1} onChange={(ev)=> onChangeHandlerFilas(ev)} type="number"/>
				</label>
				<label className="multiple">
					Gap
					<input defaultValue={0} min={0} max={30} onChange={(ev)=> onChangeHandlerGap(ev)} type="range" />
					<input step="0.1" defaultValue={gap} onChange={(ev)=> onChangeHandlerGap(ev)} type="number"/>
					<select onChange={ev => setGapUnidad(ev.target.value)}>
						{medidas.data.map(unidad => {
							return <option>{unidad}</option>
						})}
					</select>
				</label>
			</div>

			<div className="vista">
				<div style={estilos} className="vista-container">
					{filas.map(() => {
						return columnas.map(() => {
							return <div className="caja"></div>
						})
					})}
				</div>
			</div>

		</div>
	)
}

export default Grid