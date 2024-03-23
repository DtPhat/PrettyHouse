// import { Breadcrumbs, Button, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import axiosJWT from '../../../api/ConfigAxiosInterceptor';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UpdateAccount = () => {
//   const { id } = useParams()
//   const [status, setStatus] = useState('ACTIVE');
//   const [data, setData] = useState()
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate()
//   const handleSubmit = () => {
//     axiosJWT.put(`https://kietpt.vn/api/client/ad/${id}`, { status })
//       .then(res => {
//         navigate('/admin/accounts')
//         toast.success("Update successfully");
//       })
//       .catch((error) => {
//         if (error.response && error.response.data && error.response.data.messageError) {
//           toast.error(error.response.data.messageError);
//         } else {
//           toast.error("An error occurred while update the account.");
//         }
//         console.log(error);
//       });
//   }

//   const handleChange = (event) => {
//     setStatus(event.target.value);
//   };

//   useEffect(() => {
//     axiosJWT.get(`https://kietpt.vn/api/account/${id}`).then((res) => {
//       // console.log(res.data?.data)
//       setStatus(res.data?.data?.status)
//       setLoading(false);
//     })
//   }, []);
//   return (
//     <div>
//       <Breadcrumbs separator=">" sx={{ paddingTop: "20px" }}>
//         <Link
//           to="/admin"
//           style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
//         >
//           Dashboard
//         </Link>
//         <Link
//           to="/admin/accounts"
//           style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
//         >
//           Accounts
//         </Link>
//         <Typography sx={{ fontSize: "20px" }}>Update</Typography>
//       </Breadcrumbs>
//       <Typography variant='h5' fontWeight={700} sx={{ pt: 2 }}>Update client</Typography>
//       <Box sx={{
//         py: 2,
//         width: "12rem",
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 2,
//         pt: 2,
//       }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Status</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={loading ? '' : status}
//             label="Status"
//             onChange={handleChange}
//             disabled={loading}
//           >
//             <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
//             <MenuItem value={'INACTIVE'}>INACTIVE</MenuItem>
//           </Select>
//         </FormControl>
//         <div>
//           <Button variant='contained' onClick={() => handleSubmit()}>Submit</Button>
//         </div>
//       </Box>
//     </div>
//   )
// }

// export default UpdateAccount