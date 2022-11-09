import { useRef, useState } from "react"


const CustomHook = () => {

	const [configCaja, setConfigCaja] = useState("auto")
	const [columnas, setColumnas] = useState(Array(4).fill(null))
	const [filas, setFilas] = useState(Array(4).fill(null))
	const [gapColumna, setGapColumna] = useState([0, "px"])
	const [gapFila, setGapFila] = useState([0, "px"])
	const [items, setItems] = useState(["normal", "normal"])
	const configCajaRef = useRef()
	
	const onChangeHandlerColumnas = (ev) => {
		setColumnas(Array(parseInt(ev.target.value)).fill(null))
		document.querySelector("#root > div > div.modulo > div.opciones > label:nth-child(2) > input[type=number]").value = parseInt(ev.target.value)	
	}

	const onChangeHandlerFilas = (ev) => {
		setFilas(Array(parseInt(ev.target.value)).fill(null))
		document.querySelector("#root > div > div.modulo > div.opciones > label:nth-child(3) > input[type=number]").value = parseInt(ev.target.value)	
	}

	const onChangeHandlerGap = (ev, tipo) => {
		if (tipo === "columna") {
			setGapColumna([parseFloat(ev.target.value), gapColumna[1]])
			document.querySelector("#root > div > div.modulo > div.opciones > label:nth-child(4) > input[type=number]").value = parseFloat(ev.target.value)
		} else {
			setGapFila([parseFloat(ev.target.value), gapFila[1]])
			document.querySelector("#root > div > div.modulo > div.opciones > label:nth-child(5) > input[type=number]").value = parseFloat(ev.target.value)
		}	
	}

	const onChangeHandlerItems = (ev, tipo) => {
		if (tipo === "horizontal") {
			setItems([ev.target.value, items[1]])
		} else {
			setItems([items[0], ev.target.value])
		}
	}

	const generarEstilosGrid = (iterable)=> {
		let valor = ""
		iterable.forEach(()=> {
			valor += " 1fr"
		})
		return valor
	}

	let estilos = {
		gridTemplateColumns: generarEstilosGrid(columnas),
		gridTemplateRows: generarEstilosGrid(filas),
		columnGap: gapColumna[0] + gapColumna[1],
		rowGap: gapFila[0] + gapFila[1],
		justifyItems: items[0],
		alignItems: items[1]
	} 

	let gapExiste = (gapColumna[0] === 0 && gapFila[0] === 0) ? false : true
	let itemsExiste = (items[0] === "normal" && items[1] === "normal") ? false : true

	return {
		configCaja, setConfigCaja,
		columnas,
		filas,
		gapColumna, setGapColumna,
		gapFila, setGapFila,
		configCajaRef,
		onChangeHandlerColumnas,
		onChangeHandlerFilas,
		onChangeHandlerGap,
		onChangeHandlerItems,
		estilos,
		gapExiste, itemsExiste
	}
}
	
export default CustomHook