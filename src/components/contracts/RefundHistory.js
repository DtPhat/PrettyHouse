import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosJWT from '../../api/ConfigAxiosInterceptor';
import Loader from '../loader/Loader';

const RefundHistory = () => {
  const [data, setData] = useState()
  const [refetch, setRefetch] = useState(false)
  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/refund/client`).then((res) => {
      setData(res.data?.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, []);


  console.log(data)



  return (
    <Container sx={{ my: 2 }}>
      <Typography variant='h4' >Refund history</Typography>
      <Typography variant='subtitle2' >Check all the refund transactions</Typography>
      {
        !data
          ? <Loader />
          : <Stack spacing={2} sx={{ mt: 2 }}>
            {
              data.map(item => <Paper sx={{ p: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>ContractId: </Typography>
                  <Typography variant='h6'>{item.contractId}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>Amount: </Typography>
                  <Typography variant='h6'>{item.vnp_Amount} VND</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>Bank: </Typography>
                  <Typography variant='h6'>{item.vnp_BankCode}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>Order info: </Typography>
                  <Typography variant='h6'>{item.vnp_OrderInfo}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>Pay date: </Typography>
                  <Typography variant='h6'>{
                    (
                      new Date(
                        parseInt(item.vnp_PayDate.substring(0, 4)),  // Year
                        parseInt(item.vnp_PayDate.substring(4, 6)) - 1,  // Month (months are 0-indexed in JavaScript)
                        parseInt(item.vnp_PayDate.substring(6, 8)),  // Day
                        parseInt(item.vnp_PayDate.substring(8, 10)),  // Hour
                        parseInt(item.vnp_PayDate.substring(10, 12)),  // Minute
                        parseInt(item.vnp_PayDate.substring(12, 14))  // Second
                      )
                    ).toISOString()
                  }</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>Transaction Status: </Typography>
                  <Typography variant='h6'>{item.vnp_TransactionStatus}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>Transaction Type: </Typography>
                  <Typography variant='h6'>{item.vnp_TransactionType}</Typography>
                </Box>
              </Paper>)
            }
          </Stack>
      }
    </Container >

  )
}

export default RefundHistory