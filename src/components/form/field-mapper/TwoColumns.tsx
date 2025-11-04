import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { Grid } from '@mui/material';
import React from 'react';

const TwoColumns = ({ fields }: any) => {
  const { renderForm } = useFormApi();

  return (
    <Grid container spacing={2}>
      {fields.map((field: any) => (
        <Grid key={field.name} item xs={field.columns}>
          {renderForm([field])}
        </Grid>
      ))}
    </Grid>
  );
};

export default TwoColumns;