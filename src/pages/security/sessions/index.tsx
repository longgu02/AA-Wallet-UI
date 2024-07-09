import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { SessionDetail } from 'src/types/interfaces'
import SessionsAddCard from 'src/views/sessions/SessionsAddCard'
import SessionsListCard from 'src/views/sessions/SessionsListCard'

const Account = () => {
  const [sessions, setSessions] = useState<Array<SessionDetail>>([])

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Manage Sessions
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SessionsAddCard sessions={sessions} setSessions={setSessions} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SessionsListCard sessions={sessions} setSessions={setSessions} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Account
