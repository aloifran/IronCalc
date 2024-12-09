import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Box,
	styled,
} from "@mui/material";
import { X, BookOpen } from "lucide-react";
import { t } from "i18next";
import NamedRange from "./NamedRange";
import { useState } from "react";
import { NamedRangeObject } from "./NamedRange";

type NameManagerDialogProperties = {
	onClose: () => void;
	onSave: () => void;
	open: boolean;
	namedRanges: NamedRangeObject[]; // data from model
};

function NameManagerDialog(properties: NameManagerDialogProperties) {
	// initialize with data from model
	const [namedRangesLocal, setNamedRangesLocal] = useState(properties.namedRanges)

	const handleClose = () => {
		properties.onClose();
	};

	// update child component values in model
	const handleSave = () => {
		properties.onSave(); // => onNamedRangesUpdate from toolbar
		properties.onClose();
	};

	//! Why are fields editable only while clicking them?
	// update child component values in UI
	const handleChange = (id: string, field: string, value: string) => {
		// previous array elements, plus updated value 
		setNamedRangesLocal((prev) =>
			prev.map((namedRange) =>
				namedRange.id === id ? { ...namedRange, [field]: value } : namedRange
	)
);
}

return (
	<Dialog
	open={properties.open}
	onClose={properties.onClose}
	maxWidth="lg"
	// fullWidth
	>
			<StyledDialogTitle>
				Named Ranges
				<IconButton onClick={handleClose}>
					<X size={16}/>
				</IconButton>
			</StyledDialogTitle>
			<DialogContent dividers>
				{/* map array of namedRange objects */}
				{namedRangesLocal.map(e => <NamedRange name={e.name} scope={e.scope} range={e.range} id={e.id} key={e.id} onChange={handleChange}/>)}
			</DialogContent>
			<StyledDialogActions>
				<Box display="flex" alignItems="center">
					<BookOpen
						color="grey"
						style={{ width: 16, height: 16, marginLeft: 12, marginRight: 8 }}
					/>
					<span style={{ fontSize: "12px", fontFamily: "Inter" }}>{t("name_manager_dialog.help")}</span>
				</Box>
				<Box display="flex" gap="10px">
					<Button onClick={handleClose} variant="contained" color="info">
						Cancel
					</Button>
					<Button onClick={handleSave} variant="contained">
						Save changes
					</Button>
				</Box>
			</StyledDialogActions>
		</Dialog>
	);
}

// font-weight: 600 is too bold compared to design, should be between 500 & 600
const StyledDialogTitle = styled(DialogTitle)`
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: space-between;
`;

const StyledDialogActions = styled(DialogActions)`
height: 40px;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 12px;
color: #757575;
`;

export default NameManagerDialog;
