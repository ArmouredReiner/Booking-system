import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items, customer } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  if (!customer || !customer.name || !customer.email) {
    return res.status(400).json({ error: 'Customer name and email are required' })
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const itemsList = items.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')

  const emailBody = `
New Coffee Order Received!

Customer Information:
- Name: ${customer.name}
- Email: ${customer.email}

Order Details:
${itemsList}

Total: $${total.toFixed(2)}

${customer.notes ? `Notes: ${customer.notes}` : ''}
  `.trim()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Aaron.topendpanels@gmail.com',
    subject: 'New Coffee Order Received',
    text: emailBody,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Order placed successfully!' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Failed to send order email' })
  }
}
