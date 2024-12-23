import type { DefinedName, Model, WorksheetProperties } from "@ironcalc/wasm";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type NamedRangeProperties = {
  name?: string;
  scope?: number;
  formula: string;
  model: Model;
  worksheets: WorksheetProperties[];
  onChange: (field: keyof DefinedName, value: string | number) => void;
  onDelete?: () => void;
};

function NamedRange(props: NamedRangeProperties) {
  const [canDelete, setCanDelete] = useState(false); // while creating deleted should be disabled
  const [name, setName] = useState(props.name || "");
  const [scope, setScope] = useState(props.scope || ""); // default should be Workbook (Global)
  const [formula, setFormula] = useState(props.formula);

  const handleChange = (field: keyof DefinedName, value: string) => {
    if (field === "name") {
      setName(value);
      props.onChange("name", value);
    }
    if (field === "scope") {
      setScope(value);
      props.onChange("scope", value);
    }
    if (field === "formula") {
      setFormula(value);
      props.onChange("formula", value);
    }
  };

  // send unchanged formula value to parent
  useEffect(() => {
    handleChange("formula", formula);
  });

  //! add validations for name & range
  return (
    <>
      <StyledBox>
        <StyledTextField
          id="name"
          variant="outlined"
          size="small"
          margin="none"
          fullWidth
          value={name}
          onChange={(event) => handleChange("name", event.target.value)}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => event.stopPropagation()}
        />
        <StyledTextField
          id="scope"
          variant="outlined"
          select
          size="small"
          margin="none"
          fullWidth
          value={scope}
          onChange={
            (event) => handleChange("scope", event.target.value) // send sheet_id
          }
        >
          {props.worksheets.map((option) => (
            <MenuItem key={option.sheet_id} value={option.sheet_id}>
              {option.name}
            </MenuItem>
          ))}
        </StyledTextField>
        <StyledTextField
          id="formula"
          variant="outlined"
          size="small"
          margin="none"
          fullWidth
          value={formula}
          onChange={(event) => handleChange("formula", event.target.value)}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => event.stopPropagation()}
        />
        <StyledIconButton onClick={props.onDelete} disabled={canDelete}>
          <Trash2 size={12} />
        </StyledIconButton>
      </StyledBox>
      <Divider />
    </>
  );
}

const StyledBox = styled(Box)`
display: flex;
gap: 12px;
width: 577px;
`;

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    height: "28px",
    margin: 0,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main,
  "&.Mui-disabled": {
    opacity: 0.6,
    color: theme.palette.error.light,
  },
}));

export default NamedRange;
