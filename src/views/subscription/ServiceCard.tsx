import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { formatEther } from 'ethers'
import { subscribeService } from 'src/utils/plugin'
import { useSelector } from 'react-redux'
import { client } from 'src/services/client'

export default function ServiceCard(props: { data: any }) {
  const { data } = props
  const { accounts } = useSelector(state => state.account)

  const handleSubscribe = async () => {
    await subscribeService(
      accounts.find(acc => acc.isSelected)?.address,
      data.address,
      data.amount,
      accounts.find(acc => acc.isSelected)?.logger,
      '12112002',
      accounts.find(acc => acc.isSelected)?.publicKey
    )
      .then(res => {
        client
          .post(`/plugin/subscription/services/${data.address}/subscribe`, {
            address: accounts.find(acc => acc.isSelected)?.address
          })
          .then(response => {
            console.log(res)
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' alt='green iguana' height='140' image={data.logo} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {data.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {data.description}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ marginTop: 3 }}>
          Price: {formatEther(data.amount)} ETH/{data.period} day(s)
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size='small'>Share</Button>
        <Button size='small' onClick={handleSubscribe}>
          Subscribe
        </Button>
      </CardActions>
    </Card>
  )
}
