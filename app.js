import express from 'express'
import snap from './PaymentGateway.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index.ejs')
})

//api generate token
app.post('/buy', async (req, res) => {
  const parameter = {
    transaction_details: {
      order_id: req.body.item,
      gross_amount: req.body.price
    },
    credit_card: {
      secure: true
    }
  }

  const token = await snap.createTransactionToken(parameter)
  const generatedToken = {
    token
  }
  res.status(200).send(generatedToken)
})

app.listen(8080, () => {
  console.log('running on http://localhost:8080')
})
