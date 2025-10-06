import React from 'react'
import { Fab, Tooltip } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const WhatsAppFloat = ({ phone = '233554343230', message = 'Hello Timoya Farms! I need assistance.' }) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  return (
    <Tooltip title="Chat on WhatsApp" placement="left">
      <Fab
        color="success"
        aria-label="WhatsApp"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
          zIndex: 1500,
          boxShadow: 6
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  )
}

export default WhatsAppFloat