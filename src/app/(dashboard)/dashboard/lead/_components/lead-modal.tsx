"use client";

import {
  X,
  Edit2,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Plus,
  Linkedin,
  SendHorizontal,
} from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    name: string;
    title: string;
    company: string;
    avatar: string;
    suggestion?: string;
    decisionMaker?: boolean;
    dealValue?: string;
    intent?: "High" | "Medium" | "Low";
    about?: string;
  } | null;
}

export default function LeadModal({ isOpen, onClose, lead }: LeadModalProps) {
  if (!isOpen || !lead) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-auto no-scrollbar border-[3px] border-indigo-500 bg-white rounded-2xl">
        {/* <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute inset-0 bg-white rounded-lg" />
        </div> */}

        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src="/images/bard.png" alt="bard" className="size-5" />
              <h2 className="text-lg font-semibold">
                Engage with {lead?.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center bg-white rounded-2xl shadow-md border border-gray-200 p-3 gap-3 mb-6">
            <img src={lead?.avatar} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-medium">{lead?.name}</h3>
              <div className="flex items-center gap-2">
                <img
                  src="/images/linkedin.png"
                  alt="linkedin"
                  className="w-4 h-4"
                />
                <p className="text-sm text-gray-600">
                  {lead?.title} • {lead?.company}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white via-white to-blue-50 shadow-sm p-4 rounded-lg">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col lg:flex-row items-center rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-600 ">
                <img src="/images/bard.png" alt="bard" className="size-5" />
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-500">
                  {lead?.suggestion}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-5 lg:mt-0">
                <button className="text-sm flex items-center gap-2 bg-white px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Edit2 className="w-4 h-4" />
                  <span className="">Edit</span>
                </button>
                <button className="px-4 py-2 text-nowrap flex items-center gap-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  <SendHorizontal className="w-4 h-4" />
                  <span>Approve and send</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-xl mb-4">
              <div className="mb-6 bg-gradient-to-b from-slate-100 to-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-500">
                    Why I picked this lead
                  </h3>
                  <button className="p-2 bg-white rounded-bl-2xl -mt-6 -mr-4">
                    <img src="/images/bard.png" alt="bard" className="size-4" />
                  </button>
                </div>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">1</span>
                    Jane is a key decision maker and was browsing 'espresso
                    machines' on First Coffee's website.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">2</span>
                    Multiple people at her company have reported 'slowness'
                    during service requests
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">3</span>
                    Northwind Traders currently see $200M in revenue from their
                    in-store coffee shops.
                  </li>
                </ul>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="p-2 bg-white border w-full lg:w-[204px] rounded-2xl">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/mac-tick.png"
                        alt="pie"
                        className="size-14"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          Decision maker
                        </span>
                        <p className="text-sm text-blue-600">Yes</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white border w-full lg:w-[204px] rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="size-14 flex items-center justify-center rounded-full bg-yellow-100">
                        🎖
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          Potential deal value
                        </span>
                        <p className="text-sm text-blue-600">
                          {lead?.dealValue}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white border w-full lg:w-[204px] rounded-2xl">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/round-pie.svg"
                        alt="pie"
                        className="size-14"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Intent</span>
                        <p className="text-sm text-blue-600">{lead?.intent}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-3">
              <h3 className="font-medium mb-2">About {lead?.name}</h3>
              <p className="text-sm text-gray-600">{lead?.about}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing 1 of 9</span>
              <button className="text-blue-600 hover:underline">
                Show all
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
