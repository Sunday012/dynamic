import { useState, ReactNode } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";

interface AgentSkillModalProps {
  onClose: () => void;
}

interface HighlightedTermProps {
  children: ReactNode;
  type: 'vendor' | 'orders' | 'inventory' | 'default';
}

export default function AgentSkillModal({ onClose }: AgentSkillModalProps) {
  const [isSkillExpanded, setIsSkillExpanded] = useState<boolean>(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState<boolean>(false);

  // Mock available emails
  const availableEmails: string[] = [
    'purchasing@contoso.com',
    'sales@contoso.com',
    'support@contoso.com',
    'logistics@contoso.com',
    'accounts@contoso.com',
  ];

  const toggleEmail = (email: string): void => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter((e) => e !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  const removeEmail = (emailToRemove: string): void => {
    setSelectedEmails(selectedEmails.filter((email) => email !== emailToRemove));
  };

  const HighlightedTerm = ({ children, type }: HighlightedTermProps) => {
    const baseClasses = 'px-1.5 py-1 rounded-xl text-sm font-medium';
    const typeColors: Record<string, string> = {
      default: 'bg-blue-50 text-blue-600',
    };

    return (
      <span className={`${baseClasses} ${typeColors[type] || typeColors.default}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-3xl py-8 px-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className='w-full flex items-end justify-end '>
            <X className="text-black hover:text-gray-600 cursor-pointer size-8 p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={onClose} />
          </div>
      <div className="p-6 space-y-6">
        {/* Agent Skill Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <img src="/images/copilot-color.svg" alt="copilot" />
              <h3 className="text-lg font-semibold">Agent skill</h3>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsSkillExpanded(!isSkillExpanded)}
              aria-expanded={isSkillExpanded}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isSkillExpanded ? 'rotate-180' : ''}`} />
              <span className="sr-only">Toggle skill details</span>
            </button>
          </div>

          <div className="text-sm space-y-3 shadow-md rounded-xl p-3">
            <p>Check if on-hand inventory will allow all sales orders to ship without delay</p>
            <p className="space-x-1">
              <span>When</span>
              <HighlightedTerm type="default">any vendor</HighlightedTerm>
              <span>sends an email with changes to</span>
              <HighlightedTerm type="default">confirmed purchase orders</HighlightedTerm>
              <span>, check if the resulting</span>
            </p>
            <p className="space-x-1">
              <HighlightedTerm type="default">on-hand inventory</HighlightedTerm>
              <span>will allow</span>
              <HighlightedTerm type="default">all sales orders</HighlightedTerm>
              <span>to</span>
              <HighlightedTerm type="default">ship without delay</HighlightedTerm>
              <span>. If so,</span>
            </p>
            <p>
              <HighlightedTerm type="default">update the purchase order</HighlightedTerm>
              <span> to reflect the change.</span>
            </p>
          </div>
        </div>

        {/* Email Access Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
          <PiMicrosoftOutlookLogoFill className='size-6 text-blue-400' />
            <h3 className="text-lg font-semibold">Enable email access</h3>
          </div>
          <p className="text-sm text-gray-600">
            Allow the agent to access email inboxes to read mail from known vendors
          </p>

          <div className='flex items-center gap-2 w-full'>
{/* Email Selection Area */}
<div className="relative w-full">
            {/* Selected Emails Display */}
            <div
              className="min-h-10 p-2 border border-gray-300 rounded-lg flex flex-wrap gap-2"
              onClick={() => setIsEmailDropdownOpen(!isEmailDropdownOpen)}
            >
              {selectedEmails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 pl-2 pr-1 py-1 rounded"
                >
                  <span className="h-5 w-5 rounded bg-rose-100 text-rose-500 flex items-center justify-center text-xs font-medium">
                    P
                  </span>
                  <span className="text-sm">{email}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEmail(email);
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="h-3 w-3 text-gray-500" />
                    <span className="sr-only">Remove email</span>
                  </button>
                </div>
              ))}
              {selectedEmails.length === 0 && (
                <span className="text-gray-400 text-sm">Select email addresses to grant access</span>
              )}
            </div>

            {/* Email Selection Dropdown */}
            {isEmailDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                {availableEmails.map((email, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => toggleEmail(email)}
                  >
                    <span className="text-sm">{email}</span>
                    {selectedEmails.includes(email) && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end text-nowrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Allow access
            </button>
          </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Activate
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
