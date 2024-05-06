import { Box, Button, Card, Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { client } from 'src/services/client'
import { SessionDetail } from 'src/types/interfaces'

interface SessionsListCardProps {
  sessions: Array<SessionDetail>
  setSessions: (session: Array<SessionDetail>) => void
}

const SessionsListCard = (props: SessionsListCardProps) => {
  const { accounts } = useSelector((state: any) => state.account)
  const { sessions, setSessions } = props

  useEffect(() => {
    if (accounts.length > 0) {
      client
        .get(`/session?account=${accounts.find((acc: any) => acc.isSelected).address}`)
        .then(res => {
          setSessions(res.ownSession)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [accounts])

  const handleRenounce = (id: string, index: number) => {
    // Contract
    // ...
    // Server
    client
      .del(`/session/${id}`, {})
      .then(res => {
        console.log(res)

        setSessions([...sessions.slice(0, index), ...sessions.slice(index + 1)])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleEdit = (id: string) => {}

  return (
    <Card sx={{ marginBottom: 4, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Session List
      </Typography>
      {sessions &&
        sessions.map((session: SessionDetail, index) => (
          <Paper sx={{ marginBottom: 4, backgroundColor: '#24263D', padding: 3 }} key={session._id}>
            <Typography>Authorized: {session.authorized}</Typography>
            <Typography>Max amount: {session.limit}</Typography>
            <Typography>Token: {session.token}</Typography>
            <Typography>Valid after: {session.validAfter}</Typography>
            <Typography>Valid until: {session.validUntil}</Typography>

            <Typography>Beneficiaries: {session.receiver}</Typography>
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              {/* <Button variant='contained' color='warning' sx={{ marginRight: 2, flex: 1 }}>
                Edit
              </Button> */}
              <Button
                variant='contained'
                color='error'
                sx={{ flex: 1 }}
                onClick={() => handleRenounce(session._id, index)}
              >
                Renounce
              </Button>
            </Box>
          </Paper>
        ))}
    </Card>
  )
}

export default SessionsListCard
