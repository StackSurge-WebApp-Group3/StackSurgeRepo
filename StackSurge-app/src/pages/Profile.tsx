import Stack from '@mui/material/Stack'
import { Typography, Button, Avatar, Box, Card, CardContent } from '@mui/material'
import Grid from "@mui/material/Grid2"

import { ScreenContainer } from '../components/ScreenContainer'
import { useAuth } from "../context/AuthContext"

export function Profile() {
  const { user } = useAuth();
  console.log(user)
  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>

      <Box>
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', padding:3, backgroundColor:'secondary.main'}}>
          <Avatar sx={{width: 130, height: 130}}>Profile</Avatar>
          <Box sx={{marginLeft: 3}}>
            <Typography variant="h4">{user?.firstName} {user?.lastName}</Typography>
            <Typography variant="body1">
              ID: {user?._id}<br/> 
              Email: {user?.email}<br/>
              Interests List:<br/>
              {user?.interests?.map((interest, index) => (
                <span key={index}>
                {"-"} {interest}
                {index !== user.interests.length - 1 && <br />}
               </span>
  ))} 
            </Typography>
          </Box>
        </Box>

        <Box sx={{textAlign:'center', backgroundColor:'primary.main', color:'secondary.main', padding:2}}>
          <Typography variant="h6" sx={{color:"secondary.main"}}>You have volunteered for:</Typography>
          <Typography variant="h4" sx={{ bgcolor: 'success.main', marginTop: '10px' }}>
           Volunteer time counter
          </Typography>
        </Box>



      </Box> 
      </Stack>
    </ScreenContainer>
  )
}

//review display  section
/*
<Box sx={{padding:3}}>
<Grid container spacing={2}>
   {[1,2,3].map((_, index) => (
     <Grid key={index} sx={{width:"100%"}}>
       <Card>
         <CardContent>
         <Typography variant="body1">Review</Typography>
         <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
           {[1, 2, 3, 4, 5].map((_, i) => (
             <Typography key={i} color={i < 4 ? "success.main" : "grey.300"}>
               ★
             </Typography>
           ))}
         </Box>
         </CardContent>
       </Card>
     </Grid>
   ))}
</Grid>
</Box>
*/