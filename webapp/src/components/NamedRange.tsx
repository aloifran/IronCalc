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
  onDelete?: (name: string, scope: number) => void;
};

function NamedRange(props: NamedRangeProperties) {
  const [canDelete, setCanDelete] = useState(true); // while creating deleted should be disabled. how to differentiate if it exists in model or not?
  const [name, setName] = useState(props.name || "");
  const [scope, setScope] = useState(props.scope || null); // default should be 0 as Workbook (Global), but does not find it in sheets[]
  const [formula, setFormula] = useState(props.formula);

  const handleChange = (field: keyof DefinedName, value: string) => {
    if (field === "name") {
      setName(value);
      props.onChange("name", value);
    }
    if (field === "scope") {
      setScope(+value);
      props.onChange("scope", +value);
    }
    if (field === "formula") {
      setFormula(value);
      props.onChange("formula", value);
    }
  };

  useEffect(() => {
    // send unchanged formula value to parent
    handleChange("formula", formula);

    // if name does not exist in model, cannot be deleted
    const definedNames = props.model.getDefinedNameList();
    if (!definedNames.find((n) => n.name)) {
      setCanDelete(false);
    }
  }, []);

  const handleDelete = () => {
    props.onDelete?.(name, +scope);
  };

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
          // error={name === ""} // add proper logic
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
          onChange={(event) => handleChange("scope", event.target.value)}
        >
          {props.worksheets.map((option, index) => (
            <MenuItem key={option.sheet_id} value={index}>
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
          error={formula === ""} // add proper logic
          value={formula}
          onChange={(event) => handleChange("formula", event.target.value)}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => event.stopPropagation()}
        />
        <StyledIconButton onClick={handleDelete} disabled={!canDelete}>
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
