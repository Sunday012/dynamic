"use client";

import { useState } from "react";
import SecondaryNav from "./_components/secondary-nav";
import InsightsPanel from "./lead/_components/insights-panel";
import LeadsTable from "./lead/_components/lead-table";

const mockLeads = [
  {
    id: "1",
    name: "Winford Asher",
    topic: "Cafe A100 for commercial use",
    statusReason: "New",
    createdOn: "2024-04-02T12:00:00",
  },
  {
    id: "2",
    name: "Josia Love",
    topic: "Upgrading service plan",
    statusReason: "New",
    createdOn: "2024-03-30T07:45:00",
  },
  {
    id: "3",
    name: "Harrison Curtis",
    topic: "Issue with throughput on EspressoMaster",
    statusReason: "New",
    createdOn: "2024-03-28T15:30:00",
  },
  {
    id: "4",
    name: "Jermaine Berrett",
    topic: "New roaster in distribution facility",
    statusReason: "New",
    createdOn: "2024-03-25T11:05:00",
  },
  {
    id: "5",
    name: "Gerald Stephens",
    topic: "Concerns on current machines",
    statusReason: "New",
    createdOn: "2024-03-23T16:50:00",
  },
  {
    id: "6",
    name: "Halle Griffiths",
    topic: "Expanding business",
    statusReason: "New",
    createdOn: "2024-03-21T10:20:00",
  },
  {
    id: "7",
    name: "Rachel Michael",
    topic: "Addressing service concerns",
    statusReason: "New",
    createdOn: "2024-03-19T13:15:00",
  },
  {
    id: "8",
    name: "Alex Baker",
    topic: "Premium coffee beans",
    statusReason: "New",
    createdOn: "2024-03-17T08:00:00",
  },
  {
    id: "9",
    name: "Lilly Pyles",
    topic: "Cafe A100 bulk rate",
    statusReason: "New",
    createdOn: "2024-03-13T14:45:00",
  },
  {
    id: "10",
    name: "Jane Reyes",
    topic: "Improving cost per cup",
    statusReason: "New",
    createdOn: "2024-03-10T09:30:00",
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.statusReason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };

  return (
    <main className="flex-1 flex flex-col bg-gray-50">
      <SecondaryNav />
      <div className="p-6 overflow-auto no-scrollbar">
        <InsightsPanel />
        <LeadsTable
          leads={filteredLeads}
          onLeadSelect={handleLeadSelect}
          selectedLeads={selectedLeads}
        />
      </div>
    </main>
  );
}
