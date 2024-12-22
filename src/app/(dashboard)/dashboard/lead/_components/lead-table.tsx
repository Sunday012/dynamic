"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, DollarSign, UserCheck } from 'lucide-react';
import LeadModal from "./lead-modal";

interface Lead {
  id: string;
  name: string;
  topic: string;
  statusReason: string;
  createdOn: string;
  title: string;
  company: string;
  avatar: string;
  suggestion: string;
  decisionMaker: boolean;
  dealValue: string;
  intent: "High" | "Medium" | "Low";
  about: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onLeadSelect: (leadId: string) => void;
  selectedLeads: string[];
}

export default function LeadsTable({
  leads,
  onLeadSelect,
  selectedLeads,
}: LeadsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  }>({ key: "createdOn", direction: "desc" });

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const sortedLeads = [...leads].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const requestSort = (key: keyof Lead) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Lead }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  // Column definitions
  const columns = [
    { key: "name", label: "Name" },
    { key: "topic", label: "Topic" },
    { key: "statusReason", label: "Status reason" },
    { key: "createdOn", label: "Created on" },
  ];

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200">
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
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
                      onLeadSelect("all");
                    } else {
                      onLeadSelect("none");
                    }
                  }}
                />
              </th>
              {columns.map(({ key, label }) => (
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
                onClick={() => setSelectedLead(lead)}
              >
                <td className="w-8 p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onLeadSelect(lead.id);
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="group relative inline-block">
                    <span className="cursor-help">{lead.name}</span>
                    <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-2">
                        {lead.decisionMaker && <UserCheck className="w-4 h-4 text-green-500" />}
                        <DollarSign className="w-4 h-4 text-yellow-500" />
                        <span>${lead.dealValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
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

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 mr-2"
            checked={selectedLeads.length === leads.length}
            onChange={(e) => {
              if (e.target.checked) {
                onLeadSelect("all");
              } else {
                onLeadSelect("none");
              }
            }}
          />
          <span className="text-sm text-gray-500">Select all</span>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLead(lead)}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 mt-1"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onLeadSelect(lead.id);
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="group relative inline-block">
                    <div className="text-sm font-medium text-gray-900 mb-1 cursor-help">
                      {lead.name}
                    </div>
                    <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-2">
                        {lead.decisionMaker && <UserCheck className="w-4 h-4 text-green-500" />}
                        <DollarSign className="w-4 h-4 text-yellow-500" />
                        <span>${lead.dealValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Topic:</span>
                      {lead.topic}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Status:</span>
                      {lead.statusReason}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Created:</span>
                      {new Date(lead.createdOn).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LeadModal
        isOpen={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
}

