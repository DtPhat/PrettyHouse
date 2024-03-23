import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        maxWidth: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CircularProgress color="inherit" size={80} />
    </Box>
  )
}
export default Loader