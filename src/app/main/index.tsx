import { useCallback, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/hook';
import { Link } from 'react-router-dom';
import { selectCertificate } from '../../redux/certificatesSlice';
import { Autocomplete, Backdrop, Box, Button, Container, CircularProgress, TextField } from '@mui/material';
import { Certificate } from '../../types';


function Main() {
  const dispatch = useAppDispatch();

  const select = useSelector((state: RootState) => ({
    loading: state.certificates.loading,
    certificatesList: state.certificates.certificatesList,
    selectedCertificate: state.certificates.selectedCertificate,
    error: state.certificates.error
  }), shallowEqual);

  const callbacks = {
    selectCertificate: useCallback((value: Certificate) => {
      dispatch(selectCertificate(value));
    }, [dispatch])
  };

  const [value, setValue] = useState<Certificate | null>(select.selectedCertificate);

  if (select.loading === true) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={select.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )};

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Autocomplete
          fullWidth
          value={value}
          onChange={(event: any, newValue: Certificate | null) => {
            setValue(newValue);
          }}
          loading={select.loading}
          options={select.certificatesList}
          getOptionLabel={option => option.NAME}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          renderInput={(params) => <TextField {...params} label="Выбор сертификата"/>}
        />
        {select.error && <h1>{select.error}</h1>}
        {value !== null && 
        <>
          <p>Цена - <b>{value.SUMMA}</b></p>
          <Button
            onClick={() => callbacks.selectCertificate(value)}
            component={Link}
            to="/form"
            variant="contained"
          >
            Купить
          </Button>
        </>}
      </Box>
    </Container>
  );
}

export default Main;