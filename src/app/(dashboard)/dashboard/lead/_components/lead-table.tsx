'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Lead {
  id: string
  name: string
  topic: string
  statusReason: string
  createdOn: string
}

interface LeadsTableProps {
  leads: Lead[]
  onLeadSelect: (leadId: string) => void
  selectedLeads: string[]
}

export default function LeadsTable({ leads, onLeadSelect, selectedLeads }: LeadsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead
    direction: 'asc' | 'desc'
  }>({ key: 'createdOn', direction: 'desc' })

  const sortedLeads = [...leads].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
  })

  const requestSort = (key: keyof Lead) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const SortIcon = ({ columnKey }: { columnKey: keyof Lead }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="w-8 p-4">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                checked={selectedLeads.length === leads.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    onLeadSelect('all')
                  } else {
                    onLeadSelect('none')
                  }
                }}
              />
            </th>
            {[
              { key: 'name', label: 'Name' },
              { key: 'topic', label: 'Topic' },
              { key: 'statusReason', label: 'Status reason' },
              { key: 'createdOn', label: 'Created on' },
            ].map(({ key, label }) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort(key as keyof Lead)}
              >
                <div className="flex items-center gap-1">
                  {label}
                  <SortIcon columnKey={key as keyof Lead} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedLeads.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onLeadSelect(lead.id)}
            >
              <td className="w-8 p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={(e) => {
                    e.stopPropagation()
                    onLeadSelect(lead.id)
                  }}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.topic}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.statusReason}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(lead.createdOn).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}