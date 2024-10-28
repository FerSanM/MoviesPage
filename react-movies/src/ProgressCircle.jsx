import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{backgroundColor: '#262626', borderRadius: '30px' }} size={60} color='success' variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ 
            color: 'white',
            fontSize: '18px',
           }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export function ProgressCircle({vote}) {
  const value = (vote/10) * 100;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      setProgress((prevProgress) => (prevProgress < value ? prevProgress + 1 : value));
    }, 10);
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
