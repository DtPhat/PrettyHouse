import { Card, CardContent, CardMedia, InputAdornment, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { Box, CircularProgress } from '@mui/material'
import { debounce } from "lodash";
import axiosJWT from '../../api/ConfigAxiosInterceptor';
import { Link } from 'react-router-dom';
import { convertTitleToSlug } from '../../utils';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const debouncedSearch = debounce((debouncedSearchTerm) => {
    setSearchTerm(debouncedSearchTerm);
  }, 1000);

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
  };
  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      axiosJWT.get(`https://kietpt.vn/api/shop/search?furName=${searchTerm}`)
        .then(res => setData(res.data?.data?.furnitures))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
  }, [searchTerm]);
  console.log(data)
  return (
    <div style={{ position: 'relative', zIndex: '99' }}>
      <TextField
        label="Search Product"
        size="small"
        // value={searchTerm}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {
                loading
                  ? <CircularProgress color="inherit" size={24} />
                  : <SearchIcon sx={{ color: "black", cursor: "pointer" }} />
              }
            </InputAdornment>
          ),
          sx: {
            width: { md: "350px" },
            backgroundColor: "white",
            boxShadow: 1,
            "&:hover": {
              boxShadow: 3,
            },
          },
        }}
        onChange={handleSearch}
      />
      {
        searchTerm
        && <div
          style={{
            overflow: 'auto',
            position: 'absolute',
            marginTop: '0.25rem',
            maxHeight: '30rem',
            width: '100%',
            border: '1px solid gray',
            borderRadius: '0.25rem',
            zIndex: '999',
            backgroundColor: 'white',
            opacity: "1",
            color: 'black',
          }}>
          {
            !data
              ? <Box sx={{ p: 2}}>No furniture found</Box>
              : data.map(furniture =>
                <Link key={furniture._id} to={`/furnitures/${convertTitleToSlug(furniture.name)}`} state={{ furnitureId: furniture._id }} style={{ textDecoration: 'inherit'}}>
                  <Card sx={{ display: 'flex', my: 1, ml: 0.5, height: '5rem', '&:hover': { backgroundColor: 'lightgray'} }} onClick={()=> setSearchTerm('')}>
                    <Box sx={{ display: 'flex' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: '5rem' }}
                        image={furniture.imgURL[0] || ""}
                        alt="Live from space album cover"
                      />
                      <CardContent >
                        <Typography component="div" variant="body2">
                          {furniture.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          {furniture.price} VND
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Link>
              )
          }
        </div>
      }
    </div >
  )
}

export default ProductSearch