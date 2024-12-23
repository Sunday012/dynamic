import React, { useState } from 'react';
import Image from "next/image";

interface Lead {
  name: string;
  title: string;
  company: string;
  avatar: string;
  suggestion: string;
  actionText?: string;
  tags?: string[];
  additionalInfo?: string;
  icon?: React.ReactElement;
  dealValue?: string;
  decisionMaker: boolean;
}

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

export default function LeadCard({ lead, onClick }: LeadCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(lead)}
      className="relative min-w-[500px] shadow-md rounded-2xl p-4 space-y-4 
                 transition-all duration-200 hover:shadow-lg cursor-pointer border border-transparent 
                 hover:border-blue-100"
    >
      {/* Existing card content */}
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image
            src={lead.avatar}
            alt="profile"
            className="object-cover rounded-full"
            fill
            sizes="28px"
          />
        </div>

        <div>
          <h3 className="font-medium">{lead.name}</h3>
          <p className="text-sm text-gray-600">
            {lead.title} • {lead.company}
          </p>
        </div>
      </div>
      
      <div className="bg-slate-100 rounded-lg p-3">
        <div className="flex gap-2">
          {lead.icon}
          <span className="font-medium text-gray-600">{lead.actionText}</span>
        </div>
        <p className="text-gray-500">{lead.suggestion}</p>
      </div>

      {lead.tags && (
        <div className="flex items-center gap-2 text-sm">
          {lead.tags.map((tag, index) => (
            <div key={index}>
              <span className={index % 2 === 0 ? "text-gray-600" : "text-blue-600"}>
                {tag}
              </span>
              {index < lead.tags!.length - 1 && <span>•</span>}
            </div>
          ))}
        </div>
      )}

      {lead.additionalInfo && (
        <p className="text-sm text-gray-500">{lead.additionalInfo}</p>
      )}

      {/* Hover Preview */}
      {isHovered && (
        <div className="absolute left-0 top-0 transform translate-x-full -translate-y-1/4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-4 w-64 border border-gray-200">
            <div className="space-y-3">
              {lead.dealValue && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Deal Value</p>
                  <p className="text-lg font-semibold text-green-600">{lead.dealValue}</p>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Decision Maker</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.decisionMaker 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {lead.decisionMaker ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Activity {
  title: string;
  company: string;
  avatar: string;
  amount: string;
  action: string;
  daysToClose: number;
  actionText?: string;
  tags?: string[];
  additionalInfo?: string;
  icon?: React.ReactElement;
}

interface ActivityCardProps {
  activity: Activity;
  // onClick: (lead: Lead) => void;
}
export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div
      // onClick={() => onClick(activity)}
      className="w-full shadow-md rounded-2xl p-2 space-y-4 h-full 
                   transition-all duration-200 hover:shadow-lg cursor-pointer border border-transparent 
                   hover:border-blue-100"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image
            src={activity.avatar}
            alt={`${activity.company}'s avatar`}
            className="object-cover rounded-full"
            fill
            sizes="28px"
          />
        </div>
        <div>
          <h3 className="font-medium">{activity.title}</h3>
          <p className="text-sm text-gray-600">
            {activity.company} • {activity.amount} • {activity.daysToClose}
          </p>
        </div>
      </div>
      <div className="bg-slate-100 rounded-lg p-3">
        <div className="flex gap-2">
          {activity.icon}
          <span className="text-sm text-gray-600">{activity.action}</span>
        </div>
      </div>

      {activity.tags && (
        <div className="flex items-center gap-2 text-sm">
          {activity.tags.map((tag, index) => (
            <div key={index}>
              <span
                className={index % 2 === 0 ? "text-gray-600" : "text-blue-600"}
              >
                {tag}
              </span>
              {index < activity.tags!.length - 1 && <span>•</span>}
            </div>
          ))}
        </div>
      )}

      {activity.additionalInfo && (
        <p className="text-xs text-gray-500">{activity.additionalInfo}</p>
      )}
    </div>
  );
}
