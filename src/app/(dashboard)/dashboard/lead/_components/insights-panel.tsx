"use client";

import { useState, useRef } from "react";
import {
  BookText,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Mail,
} from "lucide-react";
import LeadModal from "./lead-modal";
import LeadCard, { ActivityCard } from "./lead-card";
import ProgressBar from "./lead-progress-bar";

interface Activity {
  title: string;
  company: string;
  amount: string;
  avatar: string;
  daysToClose: number;
  action: string;
  icon?: React.ReactElement;
}

const activities: Activity[] = [
  {
    title: "Cafe A100 for Woodland Bank",
    company: "Woodland Bank",
    avatar: "/images/pic3.jpg",
    amount: "$180,000",
    daysToClose: 8,
    action: "Review draft and reply to Chris Nadio",
    icon: <Mail className="text-gray-500" />,
  },
  {
    title: "Partnership opportunity for Fabrikam",
    company: "Fabrikam",
    avatar: "/images/pic3.jpg",
    amount: "$3,000,000",
    daysToClose: 12,
    action: "Prepare me for Fabrikam's key stakeholder meeting",
    icon: <Mail className="text-gray-500" />,
  },
];

const leads = [
  {
    name: "Jane Reyes",
    title: "COO",
    company: "Northwind Traders",
    avatar: "/images/pic3.jpg",
    suggestion:
      "Jane may be interested in upgrading espresso machines for her in-store coffee shops.",
    actionText: "Engage with Jane Reyes",
    additionalInfo: "Expanded Business • High buying intent",
    icon: <Mail className="text-gray-500" />,
  },
  {
    name: "Allan Munger",
    title: "Head of Real Estate Development",
    company: "Contoso Coffee",
    avatar: "/images/pic1.jpg",
    suggestion:
      "Prepare for high-buying intent meeting Copilot scheduled for 2 PM regarding upgrading service contract.",
    actionText: "Prepare for meeting with Allan",
    additionalInfo: "Upcoming meeting • Due today",
    icon: <BookText className="text-gray-500" />,
  },
];

export default function InsightsPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const mockLead = {
    name: "Jane Reyes",
    title: "COO",
    company: "Northwind Traders",
    avatar: "/images/pic1.jpg",
    suggestion:
      "Jane may be interested in upgrading espresso machines for her in-store coffee shops.",
    decisionMaker: true,
    dealValue: "$1M",
    intent: "High" as const,
    about:
      "Jane Reyes, the Chief Operating Officer of Northwind Traders, is a dynamic leader with a proven track record in optimizing operations and enhancing customer experiences. Under her guidance, Northwind Traders' in-store coffee shops have flourished, becoming a hallmark of quality and innovation. Jane's commitment to excellence makes her an ideal partner for First Coffee. She is always seeking top-tier equipment to elevate her coffee shops' offerings, ensuring consistent, high-quality service.",
  };

  const target = 45000000;
  const totalProgress = target * 0.68; // 68% of target
  const totalPotential = target * 1.2; // 120% of target to show potential beyond

  const segments = [
    { label: "Won", value: 15000000, color: "bg-green-300" },
    { label: "Committed", value: 8000000, color: "bg-blue-500" },
    { label: "Best case 97%", value: 4000000, color: "bg-purple-400" },
    { label: "Qualified 57%", value: 3500000, color: "bg-orange-300" },
    { label: "Leads 17%", value: 200000, color: "bg-gray-200" },
  ];

  // Adjust segment values to total 68% of target
  const adjustedSegments = segments.map((segment) => ({
    ...segment,
    value: (segment.value / totalProgress) * (target * 0.68),
  }));

  return (
    <div className="rounded-2xl border-[3px] mb-4 shadow-2xl border-indigo-500 bg-white overflow-hidden">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-shrink-0">
              <img
                src="/images/copilot-color.svg"
                alt="image"
                className="w-6 h-6"
              />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <h2 className="text-lg font-bold">
                Hi Mona, <span className="text-blue-600">68%</span> of goal
                achieved and rest can be achieved by focusing on 20 top leads
              </h2>
              <ProgressBar
                target={target}
                segments={adjustedSegments}
                totalPotential={totalPotential}
              />
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-50 rounded"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isExpanded && (
          <>
            <div className="flex flex-col xl:flex-row w-full">
              {/* Lead Cards Carousel */}
              <div className="relative px-2 md:px-6 py-4 w-full xl:w-[60%]">
                <p className="text-gray-600 px-2 md:px-6">
                  Copilot has pinpointed 20 key leads that show strong purchase
                  intent and are actively engaging. These leads need your focus.
                </p>
                <div
                  ref={carouselRef}
                  className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth"
                >
                  {leads.map((lead, index) => (
                    <LeadCard
                      key={index}
                      lead={lead}
                      onClick={() => setSelectedLead(lead.name)}
                    />
                  ))}
                </div>

                {/* Carousel Navigation */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Activities Section */}
              <div className="px-2 md:px-6 w-full xl:w-[40%]">
                <p className="text-gray-600 px-2 md:px-6">
                  Other key activities
                </p>
                <ul className="space-y-4">
                  {activities.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} />
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lead Modal */}
      <LeadModal
        isOpen={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
        lead={mockLead}
      />
    </div>
  );
}
