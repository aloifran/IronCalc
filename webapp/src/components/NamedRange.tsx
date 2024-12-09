import { Box, IconButton, MenuItem, styled, TextField } from "@mui/material";
import { Trash2 } from "lucide-react";

export type NamedRangeObject = {
	id: string,
	name: string,
	scope: string,
	range: string
}

type NamedRangeProperties = {
	// come from model
	id: string;
	name: string;
	scope: string;
	range: string;
	// update namedRange in model
	onChange: (id: string, field: string, value: string) => void;
};

function NamedRange(properties: NamedRangeProperties) {
	// define onChange in parent for updating the model and values
	
	// data from model
	const scopes = [
		{ value: "Workbook" },
		{ value: "Sheet 1" },
		{ value: "Invoices" },
	];

	const handleDelete = () => {
		// update model
		console.log('deleted named range');	
	};

	return (
		<StyledBox>
			{/* this is editable only while clicking */}
			<TextField
				id="name"
				variant="outlined"
				size="small"
				margin="normal"
				fullWidth
				value={properties.name}
				onChange={(event) => properties.onChange(properties.id, "name", event.target.value)}
			/>
			<TextField
				id="scope"
				variant="outlined"
				select
				defaultValue="Workbook"
				size="small"
				margin="normal"
				fullWidth
				value={properties.scope}
				onChange={(event) => properties.onChange(properties.id, "scope", event.target.value)}
			>
				{scopes.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.value}
					</MenuItem>
				))}
			</TextField>
			<TextField
				id="range"
				variant="outlined"
				size="small"
				margin="normal"
				fullWidth
				value={properties.range}
				onChange={(event) => properties.onChange(properties.id, "range", event.target.value)}
			/>
			{/* remove round hover animation  */}
			<IconButton onClick={handleDelete}>
				<Trash2 size={16} absoluteStrokeWidth/>
			</IconButton>
		</StyledBox>
	);
}

const StyledBox = styled(Box)`
display: flex;
gap: 15px;
`;

export default NamedRange;
