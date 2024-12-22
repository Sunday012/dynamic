"use client";

import { useState } from "react";
import SecondaryNav from "../_components/secondary-nav";
import InsightsPanel from "./_components/insights-panel";
import LeadsTable from "./_components/lead-table";

type Intent = "High" | "Medium" | "Low";

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
  intent: Intent;
  about: string;
}

const mockLeads = [
  {
    id: "1",
    name: "Winford Asher",
    topic: "Cafe A100 for commercial use",
    statusReason: "New",
    createdOn: "2024-04-02T12:00:00",
    title: "Operations Director",
    company: "Asher Coffee Co.",
    avatar: "/images/pic1.jpg",
    suggestion: "Looking to upgrade their commercial coffee equipment for multiple locations",
    decisionMaker: true,
    dealValue: "250000",
    intent: "High" as Intent,
    about: "Winford Asher leads operations at Asher Coffee Co., a rapidly growing chain of premium coffee shops. With their expansion plans, they're looking to standardize their equipment across all locations."
  },
  {
    id: "2",
    name: "Josia Love",
    topic: "Upgrading service plan",
    statusReason: "New",
    createdOn: "2024-03-30T07:45:00",
    title: "Procurement Manager",
    company: "Love's Brew House",
    avatar: "/images/pic2.jpg",
    suggestion: "Interested in comprehensive service coverage for their existing equipment",
    decisionMaker: true,
    dealValue: "75000",
    intent: "Medium" as Intent,
    about: "Josia Love manages procurement for Love's Brew House, focusing on maintaining their equipment quality through premium service plans."
  },
  {
    id: "3",
    name: "Harrison Curtis",
    topic: "Issue with throughput on EspressoMaster",
    statusReason: "New",
    createdOn: "2024-03-28T15:30:00",
    title: "Technical Director",
    company: "Curtis Cafes",
    avatar: "/images/pic3.jpg",
    suggestion: "May be interested in upgrading to newer high-capacity models",
    decisionMaker: false,
    dealValue: "180000",
    intent: "Medium" as Intent,
    about: "Harrison Curtis oversees technical operations at Curtis Cafes, focusing on optimizing coffee production efficiency across their chain."
  },
  {
    id: "4",
    name: "Jermaine Berrett",
    topic: "New roaster in distribution facility",
    statusReason: "New",
    createdOn: "2024-03-25T11:05:00",
    title: "Facility Manager",
    company: "Berrett Distribution",
    avatar: "/images/pic4.jpg",
    suggestion: "Planning to expand roasting capacity with new equipment",
    decisionMaker: true,
    dealValue: "450000",
    intent: "High" as Intent,
    about: "Jermaine Berrett manages Berrett Distribution's main facility, looking to increase their roasting capacity to meet growing demand."
  },
  {
    id: "5",
    name: "Gerald Stephens",
    topic: "Concerns on current machines",
    statusReason: "New",
    createdOn: "2024-03-23T16:50:00",
    title: "CEO",
    company: "Stephens Coffee Group",
    avatar: "/images/pic5.jpg",
    suggestion: "Ready to upgrade entire fleet of machines across multiple locations",
    decisionMaker: true,
    dealValue: "320000",
    intent: "High" as Intent,
    about: "Gerald Stephens leads Stephens Coffee Group, seeking to modernize their equipment across all locations to maintain competitive advantage."
  },
  {
    id: "6",
    name: "Halle Griffiths",
    topic: "Expanding business",
    statusReason: "New",
    createdOn: "2024-03-21T10:20:00",
    title: "Business Development Manager",
    company: "Griffiths Roasters",
    avatar: "/images/pic6.jpg",
    suggestion: "Looking for equipment solutions to support business expansion",
    decisionMaker: false,
    dealValue: "280000",
    intent: "Medium" as Intent,
    about: "Halle Griffiths is driving expansion at Griffiths Roasters, requiring new equipment to support their growth plans."
  },
  {
    id: "7",
    name: "Rachel Michael",
    topic: "Addressing service concerns",
    statusReason: "New",
    createdOn: "2024-03-19T13:15:00",
    title: "Operations Manager",
    company: "Michael's Coffee House",
    avatar: "/images/pic7.jpg",
    suggestion: "Interested in premium service plans for existing equipment",
    decisionMaker: true,
    dealValue: "90000",
    intent: "Medium" as Intent,
    about: "Rachel Michael manages operations at Michael's Coffee House, focusing on maintaining optimal equipment performance through enhanced service coverage."
  },
  {
    id: "8",
    name: "Alex Baker",
    topic: "Premium coffee beans",
    statusReason: "New",
    createdOn: "2024-03-17T08:00:00",
    title: "Sourcing Director",
    company: "Baker's Finest",
    avatar: "/images/pic8.jpg",
    suggestion: "Looking for high-end equipment to match their premium beans",
    decisionMaker: true,
    dealValue: "150000",
    intent: "High" as Intent,
    about: "Alex Baker leads sourcing at Baker's Finest, seeking to pair their premium beans with top-tier equipment."
  },
  {
    id: "9",
    name: "Lilly Pyles",
    topic: "Cafe A100 bulk rate",
    statusReason: "New",
    createdOn: "2024-03-13T14:45:00",
    title: "Purchasing Manager",
    company: "Pyles Coffee Co",
    avatar: "/images/pic9.jpg",
    suggestion: "Interested in bulk purchasing of Cafe A100 models",
    decisionMaker: true,
    dealValue: "420000",
    intent: "High" as Intent,
    about: "Lilly Pyles manages purchasing at Pyles Coffee Co, looking to standardize equipment across their expanding chain of stores."
  },
  {
    id: "10",
    name: "Jane Reyes",
    topic: "Improving cost per cup",
    statusReason: "New",
    createdOn: "2024-03-10T09:30:00",
    title: "CFO",
    company: "Reyes Beverages",
    avatar: "/images/pic10.jpg",
    suggestion: "Seeking efficient equipment solutions to optimize cost per cup",
    decisionMaker: true,
    dealValue: "380000",
    intent: "Medium" as Intent,
    about: "Jane Reyes oversees finances at Reyes Beverages, focused on optimizing operations through efficient equipment investments."
  }
];

export default function LeadPage() {
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
    <main className="flex-1 flex flex-col overflow-auto no-scrollbar bg-gray-50">
      <SecondaryNav />
      <div className="p-6">
        <InsightsPanel />

        <div className="relative flex-1 max-w-lg my-6 border-2 shadow-lg rounded-lg border-indigo-500">
          <input
            type="text"
            placeholder="Sort, filter and search with Copilot"
            className="w-full px-4 py-2 rounded-lg outline-none border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src="/images/copilot-color.svg"
            alt=""
            className="absolute right-3 top-2.5 w-5 h-5"
          />
        </div>

        <LeadsTable
          leads={filteredLeads}
          onLeadSelect={handleLeadSelect}
          selectedLeads={selectedLeads}
        />
      </div>
    </main>
  );
}
