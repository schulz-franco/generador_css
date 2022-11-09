import "./grid.scss"
import CustomHook from "./hook"

const medidas = require("../../data/medidas.json")

const Grid = () => {

	const {
		configCaja, setConfigCaja,
		columnas, filas,
		gapColumna, setGapColumna,
		gapFila, setGapFila,
		configCajaRef,
		onChangeHandlerColumnas,
		onChangeHandlerFilas,
		onChangeHandlerGap,
		onChangeHandlerItems,
		estilos,
		gapExiste, itemsExiste
	} = CustomHook()

	return (
		<div className="modulo">

			<div className="opciones">
				<label className="multiple-select">
					Tamaño de cajas
					<select ref={configCajaRef} style={{gridColumn: "1/3"}} onChange={(ev)=> setConfigCaja(ev.target.value)} >
						<option value="auto">auto</option>
						<option value="20px">pequeño</option>
						<option value="50px">mediano</option>
					</select>
				</label>
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
					Gap (columnas)
					<input defaultValue={0} min={0} max={30} onChange={(ev)=> onChangeHandlerGap(ev, "columna")} type="range" />
					<input step="0.1" defaultValue={gapColumna[0]} onChange={(ev)=> onChangeHandlerGap(ev, "columna")} type="number"/>
					<select onChange={ev => setGapColumna([gapColumna[0], ev.target.value])}>
						{medidas.data.map(unidad => {
							return <option>{unidad}</option>
						})}
					</select>
				</label>
				<label className="multiple">
					Gap (filas)
					<input defaultValue={0} min={0} max={30} onChange={(ev)=> onChangeHandlerGap(ev, "fila")} type="range" />
					<input step="0.1" defaultValue={gapFila[0]} onChange={(ev)=> onChangeHandlerGap(ev, "fila")} type="number"/>
					<select onChange={ev => setGapFila([gapFila[0], ev.target.value])}>
						{medidas.data.map(unidad => {
							return <option>{unidad}</option>
						})}
					</select>
				</label>
				<label className="multiple-select">
					Items
					<select onChange={(ev)=> onChangeHandlerItems(ev, "horizontal")}>
						<option value="normal">horizontal</option>
						<option value="flex-start">izquierda</option>
						<option value="center">centrado</option>
						<option value="flex-end">derecha</option>
					</select>
					<select onChange={(ev)=> onChangeHandlerItems(ev, "vertical")}>
						<option value="normal">vertical</option>
						<option value="flex-start">arriba</option>
						<option value="center">centrado</option>
						<option value="flex-end">abajo</option>
					</select>
				</label>
			</div>

			<div className="vista">
				<div style={estilos} className="vista-container">
					{filas.map(() => {
						return columnas.map(() => {
							return <div style={{width: configCaja, height: configCaja}} className="caja"></div>
						})
					})}
				</div>
			</div>

			<div className="codigo">
				<span>grid-template-columns: {estilos.gridTemplateColumns};</span>
				<span>grid-template-rows: {estilos.gridTemplateRows};</span>
				{gapExiste && <span>gap: {estilos.rowGap} {estilos.columnGap};</span>}
				{itemsExiste && <span>place-items: {estilos.alignItems} {estilos.justifyItems};</span>}
			</div>

		</div>
	)
}

export default Grid