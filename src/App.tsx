import { Button, Grid } from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import {
  InputField,
  InputMaskField,
  SelectField,
  CheckboxField,
  DatePickerField,
} from './FormFields/index';
import moment from 'moment';

const initialValues = {
  name: '',
  firstName: '',
  phone: '',
  birth: '',
  year: '',
  type: '',
  terms: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  firstName: Yup.string().required('Serial Number is required'),
  phone: Yup.string().required('phone is required'),
  birth: Yup.date()
    .nullable()
    .required('Bithday is required')
    .test('expDate', 'You need set between 1990 and 2022', (val) => {
      if (val) {
        const startDate = new Date(1950, 1, 31);
        const endDate = new Date(2022, 12, 31);
        if (moment(val, moment.ISO_8601).isValid()) {
          return moment(val).isBetween(startDate, endDate);
        }
        return false;
      }
      return false;
    }),
  year: Yup.string().required('year is required'),
  type: Yup.string().nullable().required('type is required'),
  terms: Yup.boolean().oneOf([true], 'should be accept terms'),
});

const type = [
  { value: '', label: 'None' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

function App() {
  const handleSubmit = () => {
    alert('Submited!!');
  };

  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        height: '100vh',
        width: '100%',
        // backgroundColor: 'pink',
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formProps) => {
          return (
            <Form>
              <pre>{JSON.stringify(formProps.errors, null, 2)}</pre>
              <Grid container item rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputField name="name" label="name" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField name="firstName" label={'firstName'} fullWidth />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <InputMaskField
                    name={'phone'}
                    label={'Phone Number'}
                    mask={'+{00}(000)000-0000'}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DatePickerField
                    name={'birth'}
                    label="BirthDay"
                    fullWidth
                    field="birth"
                    helper="BirthDay"
                    data={''}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputMaskField
                    name="year"
                    label="Year"
                    placeholder="e.g. 2020"
                    mask="0000"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <SelectField name="type" label="Type" data={type} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputMaskField
                    name={'price'}
                    label={'Price'}
                    mask={'$num'}
                    blocks={{
                      num: {
                        mask: Number,
                        scale: 2,
                        thousandsSeparator: ',',
                        radix: '.',
                        mapToRadix: ['.'],
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CheckboxField
                    label="Acept term and conditions"
                    name="terms"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    disabled={!formProps.dirty || !formProps.isValid}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
}

export default App;
