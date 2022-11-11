import CustomHook from "./hook"
import "./boxShadow.scss"
import { useState } from "react"

const medidas = require("../../data/medidas.json")

const BoxShadow = () => {

	const [colorCaja, setColorCaja] = useState("#288cffe0")
	const [colorSombra, setColorSombra] = useState("#000000")
	const [desplazamiento, setDesplazamiento] = useState([10, 10])
	const [medidasDesplazamiento, setMedidasDesplazamiento] = useState(["px", "px"])
	const [blur, setBlur] = useState([0, "px"])
	const [spread, setSpread] = useState([0, "px"])
	const [opacidad, setOpacidad] = useState(20)
	const [inset, setInset] = useState(0)
	const [tipoCaja, setTipoCaja] = useState("cuadrado")

	const onChangeHandlerDesplazamiento = (ev, tipo) => {
		if (tipo === "x") {
			setDesplazamiento([parseFloat(ev.target.value), desplazamiento[1]])
			document.querySelector("#boxShadow > div.opciones > label:nth-child(1) > input[type=number]").value = parseFloat(ev.target.value)
		} else {
			setDesplazamiento([desplazamiento[0], parseFloat(ev.target.value)])
			document.querySelector("#boxShadow > div.opciones > label:nth-child(2) > input[type=number]").value = parseFloat(ev.target.value)
		}
	}

	const onChangeHandlerBlur = (ev) => {
		setBlur([parseFloat(ev.target.value), blur[1]])
		document.querySelector("#boxShadow > div.opciones > label:nth-child(3) > input[type=number]").value = parseFloat(ev.target.value)
	}

	const onChangeHandlerSpread = (ev) => {
		setSpread([parseFloat(ev.target.value), spread[1]])
		document.querySelector("#boxShadow > div.opciones > label:nth-child(4) > input[type=number]").value = parseFloat(ev.target.value)
	}

	const onChangeHandlerOpacidad = (ev) => {
		setOpacidad(parseFloat(ev.target.value))
		document.querySelector("#boxShadow > div.opciones > label:nth-child(5) > input[type=number]").value = parseFloat(ev.target.value)
	}

	const obtenerRgb = () => {
		let red = parseInt(colorSombra.substring(1, 3), 16);
		let green = parseInt(colorSombra.substring(3, 5), 16);
		let blue = parseInt(colorSombra.substring(5, 7), 16);
		let color = "rgba(" + red + ", " + green + ", " + blue + ", " + opacidad + "%)"
		return color
	}

	let estiloDesplazamientoX = desplazamiento[0] + medidasDesplazamiento[0]
	let estiloDesplazamientoY = desplazamiento[1] + medidasDesplazamiento[1]
	let estiloBlur = blur[0] + blur[1]
	let estiloSpread = spread[0] + spread[1]
	let estiloInset = inset ? " inset" : ""

	let estilos = {
		backgroundColor: colorCaja,
		boxShadow: estiloDesplazamientoX + " " + estiloDesplazamientoY + " " + estiloBlur + " " + estiloSpread + " " + obtenerRgb() + estiloInset
	}

	let sombraExiste = (blur[0] !== 0 || spread[0] !== 0 || desplazamiento[0] !== 0 || desplazamiento[1] !== 0)

    return (
        <div className="modulo" id="boxShadow">

			<div className="opciones">
				<label className="multiple">
					Desplazamiento en X
					<input defaultValue={10} min={-50} max={50} type="range" onChange={(ev)=> onChangeHandlerDesplazamiento(ev, "x")} />
					<input step="0.1" defaultValue={10} type="number" onChange={(ev)=> onChangeHandlerDesplazamiento(ev, "x")} />
					<select onChange={(ev)=> setMedidasDesplazamiento([ev.target.value, medidasDesplazamiento[1]])}>
						{medidas.data.map(unidad => {
							return <option>{unidad}</option>
						})}
					</select>
				</label>
				<label className="multiple">
					Desplazamiento en Y
					<input defaultValue={10} min={-50} max={50} type="range" onChange={(ev)=> onChangeHandlerDesplazamiento(ev, "y")} />
					<input step="0.1" defaultValue={10} type="number" onChange={(ev)=> onChangeHandlerDesplazamiento(ev, "y")} />
					<select onChange={(ev)=> setMedidasDesplazamiento([medidasDesplazamiento[0], ev.target.value])}>
						{medidas.data.map(unidad => {
							return <option>{unidad}</option>
						})}
					</select>
				</label>
				<label className="multiple">
					Blur
					<input defaultValue={0} min={0} max={50} type="range" onChange={(ev)=> onChangeHandlerBlur(ev)} />
					<input step="0.1" defaultValue={0} type="number" onChange={(ev)=> onChangeHandlerBlur(ev)} />
					<select onChange={(ev)=> setBlur([blur[0], ev.target.value])}>
						{medidas.data.map(unidad => {
							return <option>{unidad}</option>
						})}
					</select>
				</label>
				<label className="multiple">
					Spread
					<input defaultValue={0} min={0} max={50} type="range" onChange={(ev)=> onChangeHandlerSpread(ev)} />
					<input step="0.1" defaultValue={0} type="number" onChange={(ev)=> onChangeHandlerSpread(ev)} />
					<select onChange={(ev)=> setSpread([spread[0], ev.target.value])}>
						{medidas.data.map(unidad => {
							return <option>{unidad}</option>
						})}
					</select>
				</label>
				<label>
					Opacidad
					<input step={5} defaultValue={20} min={0} max={100} type="range" onChange={(ev)=> onChangeHandlerOpacidad(ev)} />
					<input defaultValue={20} min={0} type="number" onChange={(ev)=> onChangeHandlerOpacidad(ev)} />
				</label>
				<label className="multiple-select">
					Tipo de sombra
					<select style={{gridColumn: "1/3"}} onChange={(ev)=> setInset(parseInt(ev.target.value))}>
						<option value={0}>externa</option>
						<option value={1}>interna</option>
					</select>
				</label>
				<label className="multiple-select" onChange={(ev)=> setTipoCaja(ev.target.value)}>
					Tipo de caja
					<select style={{gridColumn: "1/3"}}>
						<option>cuadrado</option>
						<option>rectangulo</option>
						<option>circulo</option>
					</select>
				</label>
			</div>

			<div className="vista">
				<div className={tipoCaja} style={estilos}>
					<input defaultValue="#288cff" type="color" onChange={(ev) => setColorCaja(ev.target.value)}/>
					<input defaultValue="#000000" type="color" onChange={(ev)=> setColorSombra(ev.target.value)}/>
				</div>
			</div>

			<div className="codigo">
				{sombraExiste && <span>box-shadow: {estilos.boxShadow};</span>}
			</div>

		</div>
    )
}

export default BoxShadow