import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { client } from 'src/services/client'

{
  /* <iframe
  src='https://app.uniswap.org/#/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
  height='660px'
  width='100%'
  // style={{
  //   border: 0,
  //   margin: '0 auto',
  //   display: 'block',
  //   borderRadius: '10px',
  //   maxWidth: '600px',
  //   minWidth: '300px'
  // }}
/> */
}

const AddressBook = () => {
  const { accounts } = useSelector((state: any) => state.account)
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    client
      .get(`/account/${accounts.find((acc: any) => acc.isSelected)?.publicKey}/address-book`)
      .then(res => {
        console.log(res)
        setContacts(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Address Book
      </Typography>
      <Box>
        <Stack spacing={3}>
          {contacts &&
            contacts.map((contact: any) => (
              <Paper key={contact.address} sx={{ padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 500 }}>{contact.name}</Typography>
                  <Typography variant='caption'>{contact.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField label='Amount' />
                  <Button variant='contained' sx={{ marginTop: 2 }}>
                    Send
                  </Button>
                </Box>
              </Paper>
            ))}
        </Stack>
        <Button variant='contained' sx={{ marginTop: 2 }}>
          Add Address
        </Button>
      </Box>
    </Box>
  )
}

export default AddressBook
