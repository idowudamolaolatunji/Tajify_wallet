import React from 'react'

function WalletInsightCard({ insightIcon, insightTitle, insightFigure, pendingInsightTitle, pendingInsightFigure }) {
  return (
    <div className='wallet insight'>
        <span className='insight--icon'>{insightIcon}</span>
        <div className='insight--infos'>
          <span className='insight--content'>
              <p className='insight--title'>{insightTitle}</p>
              <span className='insight--number'>{insightFigure}</span>
          </span>
          <span className='insight--content escrow'>
              <p className='insight--title escrow'>{pendingInsightTitle}</p>
              <span className='insight--number escrow'>{pendingInsightFigure}</span>
          </span>
        </div>
    </div>
  )
}

export default WalletInsightCard
