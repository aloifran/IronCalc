import type { DefinedName, Model } from "@ironcalc/wasm";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import { t } from "i18next";
import { BookOpen, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import NamedRange from "./NamedRange";
import { getFullRangeToString } from "./util";

type NameManagerDialogProperties = {
  onClose: () => void;
  open: boolean;
  model: Model;
};

function NameManagerDialog(props: NameManagerDialogProperties) {
  const [definedNamesLocal, setDefinedNamesLocal] = useState<DefinedName[]>();
  const [definedName, setDefinedName] = useState<DefinedName>({
    name: "",
    scope: 0,
    formula: "",
  });

  // render named ranges from model
  useEffect(() => {
    const definedNamesModel = props.model.getDefinedNameList();
    setDefinedNamesLocal(definedNamesModel);
    console.log("definedNamesModel EFFECT", definedNamesModel);
  }, []);

  const handleSave = () => {
    try {
      console.log("SAVE", definedName);
      props.model.newDefinedName(
        definedName.name,
        definedName.scope, //null is workbook
        definedName.formula,
      );
    } catch (error) {
      console.log("SAVE FAILED", error);
    }
    props.onClose();
  };

  const handleChange = (field: keyof DefinedName, value: string | number) => {
    setDefinedName((prev: DefinedName) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = (name: string, scope: number) => {
    console.log("DELETE", name, scope);
    props.model.deleteDefinedName(name, scope);
  };

  const formatFormula = (): string => {
    const worksheets = props.model.getWorksheetsProperties();
    const selectedView = props.model.getSelectedView();

    return getFullRangeToString(selectedView, worksheets);
  };

  return (
    <StyledDialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={false}
      scroll="paper"
    >
      <StyledDialogTitle>
        Named Ranges
        <IconButton onClick={() => props.onClose()}>
          <X size={16} />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent dividers>
        <StyledRangesHeader>
          <Box width="171px">{t("name_manager_dialog.name")}</Box>
          <Box width="171px">{t("name_manager_dialog.range")}</Box>
          <Box width="171px">{t("name_manager_dialog.scope")}</Box>
        </StyledRangesHeader>
        {definedNamesLocal?.map((definedName) => (
          <NamedRange
            worksheets={props.model.getWorksheetsProperties()}
            name={definedName.name}
            scope={definedName.scope}
            formula={definedName.formula}
            key={definedName.name}
            model={props.model}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))}
        <NamedRange
          worksheets={props.model.getWorksheetsProperties()}
          formula={formatFormula()}
          onChange={handleChange}
          model={props.model}
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Box display="flex" alignItems="center" gap={"8px"}>
          <BookOpen color="grey" size={16} />
          <span style={{ fontSize: "12px", fontFamily: "Inter" }}>
            {t("name_manager_dialog.help")}
          </span>
        </Box>
        <Box display="flex" gap="8px" width={"155px"}>
          {/* change hover color? */}
          <Button
            onClick={() => props.onClose()}
            variant="contained"
            disableElevation
            color="info"
            sx={{
              bgcolor: (theme): string => theme.palette.grey["200"],
              color: (theme): string => theme.palette.grey["700"],
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disableElevation
            sx={{ textTransform: "none" }}
            startIcon={<Check size={16} />}
            // disabled={} // disable when error
          >
            Save
          </Button>
        </Box>
      </StyledDialogActions>
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    height: "380px",
    minWidth: "620px",
  },
}));

const StyledDialogTitle = styled(DialogTitle)`
padding: 12px 20px;
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: space-between;
`;

const StyledDialogContent = styled(DialogContent)`
display: flex;
flex-direction: column;
gap: 12px;
padding: 20px 12px 20px 20px;
`;

const StyledRangesHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "12px",
  fontFamily: theme.typography.fontFamily,
  fontSize: "12px",
  fontWeight: "700",
  color: theme.palette.info.main,
}));

const StyledDialogActions = styled(DialogActions)`
padding: 12px 20px;
height: 40px;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 12px;
color: #757575;
`;

export default NameManagerDialog;
import type { DefinedName, Model } from "@ironcalc/wasm";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import { t } from "i18next";
import { BookOpen, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import NamedRange from "./NamedRange";
import { getShortRangeToString } from "./util";

type NameManagerDialogProperties = {
  onClose: () => void;
  open: boolean;
  model: Model;
};

function NameManagerDialog(props: NameManagerDialogProperties) {
  const [definedNamesLocal, setDefinedNamesLocal] = useState<DefinedName[]>();
  const [definedName, setDefinedName] = useState<DefinedName>({
    name: "",
    scope: 0,
    formula: "",
  });

  // render named ranges from model
  useEffect(() => {
    const definedNamesModel = props.model.getDefinedNameList();
    setDefinedNamesLocal(definedNamesModel);
    console.log("definedNamesModel EFFECT", definedNamesModel);
  });

  const handleSave = () => {
    console.log("SAVE DIALOG", definedName);
    // create newDefinedName and close
    // props.model.newDefinedName(
    // 	definedName.name,
    // 	definedName.scope,
    // 	definedName.formula,
    // );
    props.onClose();
  };

  const handleChange = (field: keyof DefinedName, value: string | number) => {
    setDefinedName((prev: DefinedName) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = () => {
    console.log("definedName marked for deletion");
  };

  const formatFormula = (): string => {
    const selectedView = props.model.getSelectedView();

    return getShortRangeToString(selectedView);
  };

  return (
    <StyledDialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={false}
      scroll="paper"
    >
      <StyledDialogTitle>
        Named Ranges
        <IconButton onClick={() => props.onClose()}>
          <X size={16} />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent dividers>
        <StyledRangesHeader>
          <Box width="171px">{t("name_manager_dialog.name")}</Box>
          <Box width="171px">{t("name_manager_dialog.range")}</Box>
          <Box width="171px">{t("name_manager_dialog.scope")}</Box>
        </StyledRangesHeader>
        {definedNamesLocal?.map((definedName) => (
          <NamedRange
            worksheets={props.model.getWorksheetsProperties()}
            name={definedName.name}
            scope={definedName.scope}
            formula={definedName.formula}
            key={definedName.name}
            model={props.model}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))}
        <NamedRange
          worksheets={props.model.getWorksheetsProperties()}
          formula={formatFormula()}
          onChange={handleChange}
          model={props.model}
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Box display="flex" alignItems="center" gap={"8px"}>
          <BookOpen color="grey" size={16} />
          <span style={{ fontSize: "12px", fontFamily: "Inter" }}>
            {t("name_manager_dialog.help")}
          </span>
        </Box>
        <Box display="flex" gap="8px" width={"155px"}>
          {/* change hover color? */}
          <Button
            onClick={() => props.onClose()}
            variant="contained"
            disableElevation
            color="info"
            sx={{
              bgcolor: (theme): string => theme.palette.grey["200"],
              color: (theme): string => theme.palette.grey["700"],
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disableElevation
            sx={{ textTransform: "none" }}
            startIcon={<Check size={16} />}
          >
            Save
          </Button>
        </Box>
      </StyledDialogActions>
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    height: "380px",
    minWidth: "620px",
  },
}));

const StyledDialogTitle = styled(DialogTitle)`
padding: 12px 20px;
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: space-between;
`;

const StyledDialogContent = styled(DialogContent)`
display: flex;
flex-direction: column;
gap: 12px;
padding: 20px 12px 20px 20px;
`;

const StyledRangesHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "12px",
  fontFamily: theme.typography.fontFamily,
  fontSize: "12px",
  fontWeight: "700",
  color: theme.palette.info.main,
}));

const StyledDialogActions = styled(DialogActions)`
padding: 12px 20px;
height: 40px;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 12px;
color: #757575;
`;

export default NameManagerDialog;
