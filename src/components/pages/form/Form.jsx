import './Form.css';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import SitesSelect from '../../common/sitesSelect/SitesSelect';
import axios from 'axios';
import LoadingSpinner from '../../common/loadingSpinner/LoadingSpinner';
import { useState } from 'react';
import FormToast from '../../common/formToast/FormToast';

const Form = () => {
  let initialValues = {
    name: '',
    age: '',
    site: '',
  };

  const [submitting, setSubmitting] = useState(false);
  const [toastType, setToastType] = useState('');

  const onSubmit = (data) => {
    setSubmitting(true);
    console.log(data);
    const GAS_URL =
      'https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbyQX7V9R8g1VEMAww_G8UMW9iTQyewe1CcZi90-SU0YFne3xTg5Qa_40lbqWp2w6Tlu/exec';

    const formattedData = {
      actionType: 'add',
      values: [data.name, data.age, data.site],
    };

    console.log(formattedData);

    axios
      .post(GAS_URL, JSON.stringify(formattedData), {
        headers: {
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
        },
      })
      .then((response) => {
        if (response.data.result === 'success') {
          console.log('Data sent successfully');
          setToastType('success');
          setSubmitting(false);
        } else {
          console.error('Error in sending data:', response.data.message);
          setToastType('error');
          setSubmitting(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setToastType('error');
        setSubmitting(false);
      });
  };

  const { handleSubmit, handleChange, errors, values, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        name: Yup.string().required('Please enter a name.'),
        age: Yup.number().required('Please enter an age.').positive().integer(),
        site: Yup.string().required('Please select a Site.'),
      }),
      onSubmit,
    });

  const handleSiteSelection = (selectedSite) => {
    setFieldValue('site', selectedSite);
  };

  return (
    <div className="body">
      {submitting ? (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="title">Add a New Student</h2>
            <TextField
              className="text-field"
              name="name"
              label="Name"
              variant="outlined"
              type="text"
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              className="text-field"
              name="age"
              label="Age"
              variant="outlined"
              type="number"
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
            />
            <SitesSelect
              onSiteSelected={handleSiteSelection}
              error={!!errors.site}
              helperText={errors.site}
              selectedSiteValue={values.site}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            >
              Add
            </Button>
          </form>

          <div className="toast-container">
            {toastType === 'success' && (
              <div className="your-toast-wrapper-class">
                <FormToast type={toastType} />
              </div>
            )}
            {toastType === 'error' && (
              <div className="your-toast-wrapper-class">
                <FormToast type={toastType} />
              </div>
            )}
          </div>

          <div className="button-container">
            <Link to="/">
              <Button
                variant="contained"
                size="small"
                style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
              >
                Back
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
