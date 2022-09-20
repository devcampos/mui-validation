import { useState, useEffect } from "react";
import { useField } from "formik";
import { FormHelperText, Grid, TextField } from "@mui/material";
import moment, { Moment } from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

type Props = {
  label: string;
  name: string;
  field: any;
  data: any;
  helper: any;
  [x: string]: any;
};

export const DatePickerField = (props: Props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && (error || "").length > 0 && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);


  const renderHelperText = () => {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
    return null;
  };

  useEffect(() => {
    if (value) {
      const date = moment(new Date(value));
      setSelectedDate(date);
    }
  }, [value]);

  function _onChange(date: Moment | null) {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  }

  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label={label}
          value={selectedDate}
          onChange={_onChange}
          renderInput={(props) => (
            <TextField
              {...field}
              {...props}
              error={isError}
              helperText={renderHelperText()}
            />
          )}
        />
      </LocalizationProvider>
    </Grid>
  );
};
