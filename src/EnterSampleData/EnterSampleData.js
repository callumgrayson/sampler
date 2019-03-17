import React from 'react'
import './EnterSampleData.css'

const EnterSampleData = (props) => {
	let { stateProps, renderProps } = props
	let sp = stateProps
	let rp = renderProps
	let sampleArr = sp.sampleArr

	return (
		<div className="output">
			<input
				type="button"
				value="New Sample"
				className="btn-back"
				onClick={rp.handleBackOne}
			/>
			<fieldset>
				<input
					type="checkbox"
					name="getRequired"
					id="getRequired"
					value="All inputs required"
					onChange={rp.handleChangeInputsRequired}
					checked={sp.requiredChecked}
				/>
				<label htmlFor="getRequired">All inputs required</label>
			</fieldset>
			<form onSubmit={rp.handleDataCalculation}>
				<table>
					<tbody>
						{sampleArr.map((item) => {
							let key = 'id' + item
							return (
								<tr key={key} className="center">
									<td className="data-sample-id">{item}</td>
									<td>
										<input
											type="number"
											step="any"
											id={key}
											className="data-input"
											onChange={rp.handleDataInput}
											onFocus={rp.handleFocus}
											value={sp.dataInput.key}
											required={sp.requiredChecked}
										/>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<input
					type="submit"
					className="btn-calculate"
					value="Calculate"
				/>
			</form>
		</div>
	)
}

export default EnterSampleData
