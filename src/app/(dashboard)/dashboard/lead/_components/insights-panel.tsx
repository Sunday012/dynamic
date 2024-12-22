"use client";

import { useState, useRef } from "react";
import { BookText, ChevronDown, ChevronRight, ChevronUp, Mail } from 'lucide-react';
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

interface Lead {
  name: string;
  title: string;
  company: string;
  avatar: string;
  actionText: string;
  suggestion: string;
  additionalInfo?: string;
  icon?: React.ReactElement;
  decisionMaker: boolean;
  dealValue: string;
  intent: "High" | "Medium" | "Low";
  about: string;
}

interface ProgressSegment {
  label: string;
  value: number;
  color: string;
}

// Add LeadModalProps interface to match the component's requirements
interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null; // Update to match the actual expected type
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

const leads: Lead[] = [
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
    decisionMaker: true,
    dealValue: "$2M",
    intent: "High",
    about:
      "Jane Reyes, the Chief Operating Officer of Northwind Traders, is a dynamic leader with a proven track record in optimizing operations and enhancing customer experiences. Under her guidance, Northwind Traders' in-store coffee shops have flourished, becoming a hallmark of quality and innovation. Jane's commitment to excellence makes her an ideal partner for First Coffee. She's always seeking top-tier equipment to elevate her coffee shops' offerings.",
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
    decisionMaker: true,
    dealValue: "$1M",
    intent: "Medium",
    about:
      "Jane Reyes, the Chief Operating Officer of Northwind Traders, is a dynamic leader with a proven track record in optimizing operations and enhancing customer experiences. Under her guidance, Northwind Traders' in-store coffee shops have flourished, becoming a hallmark of quality and innovation. Jane's commitment to excellence makes her an ideal partner for First Coffee. She's always seeking top-tier equipment to elevate her coffee shops' offerings.",
  },
];

export default function InsightsPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth <= 640 ? 200 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth <= 640 ? -200 : -400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const target = 45000000;
  const totalProgress = target * 0.68;
  const totalPotential = target * 1.2;

  const segments: ProgressSegment[] = [
    { label: "Won", value: 15000000, color: "bg-green-300" },
    { label: "Committed", value: 8000000, color: "bg-blue-500" },
    { label: "Best case 97%", value: 4000000, color: "bg-purple-400" },
    { label: "Qualified 57%", value: 3500000, color: "bg-orange-300" },
    { label: "Leads 17%", value: 200000, color: "bg-gray-200" },
  ];

  const adjustedSegments = segments.map((segment) => ({
    ...segment,
    value: (segment.value / totalProgress) * (target * 0.68),
  }));

  return (
    <div className="relative p-0.5 rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-700 rounded-lg" />
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg sm:shadow-2xl">
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 sm:gap-3">
                <img
                  src="/images/copilot-color.svg"
                  alt="Copilot"
                  className="w-5 h-5 sm:w-6 sm:h-6 mt-1"
                />
                <h2 className="text-base sm:text-lg font-bold pr-6">
                  Hi Mona, <span className="text-blue-600">68%</span> of goal
                  achieved and rest can be achieved by focusing on 20 top leads
                </h2>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-50 rounded flex-shrink-0"
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
            <div className="w-full">
              <ProgressBar
                target={target}
                segments={adjustedSegments}
                totalPotential={totalPotential}
              />
            </div>
          </div>

          {isExpanded && (
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
              <div className="w-full xl:w-[60%] space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Copilot has pinpointed 20 key leads that show strong purchase
                  intent and are actively engaging. These leads need your focus.
                </p>
                <div className="relative">
                  <div
                    ref={carouselRef}
                    className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth px-2"
                  >
                    {leads.map((lead, index) => (
                      <LeadCard
                        key={index}
                        lead={lead}
                        onClick={() => setSelectedLead(lead)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-lg hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-lg hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="w-full xl:w-[40%] space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Other key activities
                </p>
                <div className="space-y-3 sm:space-y-4 px-2">
                  {activities.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedLead && (
          <LeadModal
            isOpen={selectedLead !== null}
            onClose={() => setSelectedLead(null)}
            lead={{
              name: selectedLead.name,
              title: selectedLead.title,
              company: selectedLead.company,
              avatar: selectedLead.avatar,
              suggestion: selectedLead.suggestion,
              decisionMaker: selectedLead.decisionMaker,
              dealValue: selectedLead.dealValue,
              intent: selectedLead.intent,
              about: selectedLead.about,
            }}
          />
        )}
      </div>
    </div>
  );
}

