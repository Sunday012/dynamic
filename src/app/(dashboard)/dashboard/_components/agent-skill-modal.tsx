import { X } from "lucide-react";

interface AgentSkillModalProps {
  onClose: () => void;
}

export default function AgentSkillModal({ onClose }: AgentSkillModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <div>
          <div className="flex gap-2 items-center">
            <img
              src="/images/copilot-color.svg"
              alt="copilot"
              className="size-6"
            />
            <span>Agent Skill</span>
          </div>
          <div>
            <div>
              <p>
                Check if on-hand inventory will allow all sales orders to ship
                without delay
              </p>
              <svg
                className={`w-4 h-4 ml-auto transform transition-transform`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
