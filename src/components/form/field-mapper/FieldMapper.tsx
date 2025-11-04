import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import Grid from '@mui/material/Grid';
const FieldMapper = ({ fields }: any) => {
  const { renderForm } = useFormApi();
  return (
    <Grid container spacing={2}>
      {renderForm(fields)}
    </Grid>
  );
};
export default FieldMapper;
