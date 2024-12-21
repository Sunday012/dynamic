'use client'

import { useEffect, useRef, useState } from 'react'

interface ProgressSegment {
  label: string
  value: number
  color: string
}

interface ProgressBarProps {
  target: number
  segments: ProgressSegment[]
  totalPotential: number
}

export default function ProgressBar({ target, segments = [], totalPotential }: ProgressBarProps) {
  const [barWidth, setBarWidth] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0)
  const percentage = (totalValue / target) * 100

  useEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.offsetWidth)
    }
  }, [])

  // Format number as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)
  }

  const getSegmentWidth = (value: number) => {
    return (value / totalPotential) * 100
  }

  const getTargetPosition = () => {
    return (target / totalPotential) * 100
  }

  return (
    <div className="w-full mt-5">
      <div className="">
        {/* Progress Bar Container */}
        <div className="relative h-2 w-full" ref={barRef}>
          {/* Background (gray for entire bar) */}
          <div className="absolute inset-0 bg-gray-200 rounded-full" />
          
          {/* Target Line */}
          <div 
            className="absolute top-1/2 -translate-y-1/2" 
            style={{ left: `${getTargetPosition()}%` }}
          >
            <div className="relative">
              <div className="absolute left-2 -top-6 whitespace-nowrap text-xs">
                <span className="font-medium">Target: </span>
                <span>{formatCurrency(target)}</span>
              </div>
              <div className="h-4 w-px bg-gray-400" />
            </div>
          </div>

          {/* Progress Segments */}
          <div className="absolute inset-0 flex rounded-full overflow-hidden">
            {segments.map((segment, index) => (
              <div
                key={index}
                className={`h-full ${segment.color}`}
                style={{ width: `${getSegmentWidth(segment.value)}%` }}
              />
            ))}
          </div>

          {/* Percentage Label */}
          {/* <div 
            className="absolute -top-6 text-xs font-medium whitespace-nowrap"
            style={{ left: '100%', transform: 'translateX(-100%)' }}
          >
            68% of target achieved
          </div> */}
        </div>

        {/* Segments Legend */}
        <div className="flex flex-wrap gap-4 text-xs pt-4">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${segment.color}`} />
              <span>{segment.label}</span>
              <span className="font-medium">{formatCurrency(segment.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

