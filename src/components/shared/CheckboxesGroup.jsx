import { useState } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "../../styles/Filter.module.css";
import Checkbox from "@mui/material/Checkbox";

const CheckboxesGroup = ({
  colorState,
  setColorState,
  setColors,
  colorLabel,
  setColorLabel,
}) => {
  const [colorFilter, setColorFilter] = useState(false);
  const colorList = [
    "red",
    "orange",
    "yellow",
    "blue",
    "pink",
    "purple",
    "white",
    "multi-colors",
  ];
  const { red, orange, yellow, blue, pink, purple, white, multi } = colorState;

  const closeColorFilter = (e) => {
    if (
      !e.target.classList.contains("colorFilter") &&
      !e.target.classList.contains("MuiTypography-root") &&
      !e.target.id.startsWith("color")
    ) {
      setColorFilter(false);
      document.removeEventListener("mouseup", closeColorFilter);
    }
  };
  const handleFilterByColors = () => {
    let label = [];
    let colorArr = [];
    let idx = 1;
    for (var key of Object.keys(colorState)) {
      if (colorState[key]) {
        colorArr.push(idx);
        label.push(colorList[idx - 1]);
      }
      idx++;
    }
    if (colorArr.length === 0) {
      setColorLabel("");
      setColors("");
    } else {
      setColors(colorArr.toString().replaceAll(",", "_"));
      setColorLabel("Filter by " + label.toString());
    }
    document.removeEventListener("mouseup", closeColorFilter);
    setColorFilter(false);
  };

  const handleClickColorFilter = () => {
    if (!colorFilter) {
      setColorFilter(true);
      document.addEventListener("mouseup", (e) => closeColorFilter(e));
    } else {
      setColorFilter(false);
      document.removeEventListener("mouseup", closeColorFilter);
    }
  };

  const handleChange = (event) => {
    setColorState({
      ...colorState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => handleClickColorFilter()}
        className={`${styles.ColorFilter} text-left bg-white h-10
          border px-1 border-slate-800 outline-none`}
      >
        {colorLabel?.length > 0 ? (
          colorLabel
        ) : (
          <span className="text-slate-700">filter by colors</span>
        )}
      </button>
      {colorFilter && (
        <Box
          sx={{ display: "flex" }}
          className="absolute z-2 bg-white border border-neutral-600 w-55"
        >
          <FormControl
            sx={{ m: 1 }}
            component="fieldset"
            variant="standard"
            className="colorFilter"
          >
            <FormLabel
              component="legend"
              className="colorFilter text-neutral-700"
            >
              Multiple colors may be selected.
            </FormLabel>
            <FormGroup className="colorFilter">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={red}
                    onChange={handleChange}
                    name="red"
                    id="color-red"
                  />
                }
                label="red"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={orange}
                    onChange={handleChange}
                    name="orange"
                    id="color-orange"
                  />
                }
                label="orange"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={yellow}
                    onChange={handleChange}
                    name="yellow"
                    id="color-yellow"
                  />
                }
                label="yellow"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={blue}
                    onChange={handleChange}
                    name="blue"
                    id="color-blue"
                  />
                }
                label="blue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pink}
                    onChange={handleChange}
                    name="pink"
                    id="color-pink"
                  />
                }
                label="pink"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={purple}
                    onChange={handleChange}
                    name="purple"
                    id="color-purple"
                  />
                }
                label="purple"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={white}
                    onChange={handleChange}
                    name="white"
                    id="color-white"
                  />
                }
                label="white"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={multi}
                    onChange={handleChange}
                    name="multi"
                    id="color-multi"
                  />
                }
                label="multi-color"
              />
            </FormGroup>
            <button
              onClick={() => handleFilterByColors()}
              className="colorFilter w-30 border outline-none border-slate-900 p-1
               hover:text-white hover:bg-slate-800 hover:opacity-50"
            >
              Apply filter
            </button>
          </FormControl>
        </Box>
      )}
    </div>
  );
};

export default CheckboxesGroup;
