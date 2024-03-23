import React from 'react'
import './SuccessPayment.scss'
export default function SuccessPayment() {
  return (
    <div className='payment-success-container'>
      <div className='payment-success-card'>
        <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
      </div>
    </div>
  )
}
