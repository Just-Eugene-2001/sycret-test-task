import { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Button } from '@mui/material';


function Success() {
  const navigate = useNavigate();

  const select = useSelector((state: RootState) => ({
    certificate: state.certificates.selectedCertificate,
  }), shallowEqual);

  useEffect(() => {
    if (!select.certificate) {
      navigate('/');
    }
  }, [select.certificate, navigate]);

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Оплата...</h1>
        <Button component={Link} to="/" variant="contained">На главную</Button>
      </Box>
    </Container>
  );
}

export default Success;