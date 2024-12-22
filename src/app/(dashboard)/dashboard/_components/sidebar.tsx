"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Clock,
  Pin,
  Zap,
  LayoutDashboard,
  ClipboardList,
  Users,
  Building2,
  UserCircle,
  Target,
  FileText,
  Users2,
  ShoppingCart,
  FileBox,
  Receipt,
  Package,
  BookOpen,
  Mail,
  Send,
  BarChart,
  ChevronsUpDown,
  UserCheck,
} from "lucide-react";
import AgentSkillModal from "./agent-skill-modal";

const mainNavItems = [
  { name: "Home", icon: Home, path: "/dashboard" },
  { name: "Recent", icon: Clock, path: "/dashboard/recent", hasSubmenu: true },
  { name: "Pinned", icon: Pin, path: "/dashboard/pinned", hasSubmenu: true },
];

const workItems = [
  { name: "Sales accelerator", icon: Zap, path: "/dashboard/sales-accelerator" },
  { name: "Dashboards", icon: LayoutDashboard, path: "/dashboards" },
  { name: "Activities", icon: ClipboardList, path: "/dashboard/activities" },
];

const customerItems = [
  { name: "Accounts", icon: Building2, path: "/dashboard/accounts" },
  { name: "Contacts", icon: UserCircle, path: "/dashboard/contacts" },
];

const salesItems = [
  { name: "Leads", icon: Target, path: "/dashboard/lead" },
  { name: "Opportunities", icon: FileText, path: "/dashboard/opportunities" },
  { name: "Competitors", icon: Users2, path: "/dashboard/competitors" },
];

const collateralItems = [
  { name: "Quotes", icon: ShoppingCart, path: "/dashboard/quotes" },
  { name: "Orders", icon: FileBox, path: "/dashboard/orders" },
  { name: "Invoices", icon: Receipt, path: "/dashboard/invoices" },
  { name: "Products", icon: Package, path: "/dashboard/products" },
  { name: "Sales Literature", icon: BookOpen, path: "/dashboard/sales-literature" },
];

const marketingItems = [
  { name: "Marketing lists", icon: Mail, path: "/dashboard/marketing-lists" },
  { name: "Quick Campaigns", icon: Send, path: "/dashboard/quick-campaigns" },
];

const performanceItems = [
  { name: "Sales", icon: BarChart, path: "/dashboard/sales" },
];

type InsightsPanel = {
  name: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
};

type InsightsPanelData = {
  item: InsightsPanel;
  indent?: boolean;
};

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Recent",
    "Sales",
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAgentSkillModalOpen, setIsAgentSkillModalOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const NavItem = ({ item, indent = false }: InsightsPanelData) => (
    <Link
      href={item.path}
      className={`flex items-center px-4 py-2 text-sm truncate group ${
        item.isActive ? "bg-white" : "hover:bg-white"
      } ${indent ? "pl-8" : ""}`}
    >
      <item.icon className="w-4 h-4 mr-3" />
      <span>{item.name}</span>
      {item.hasSubmenu && (
        <svg
          className={`w-4 h-4 ml-auto transform transition-transform ${
            expandedSections.includes(item.name) ? "rotate-180" : ""
          }`}
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
      )}
    </Link>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="px-4 py-2 text-xs font-medium uppercase">{title}</div>
  );

  return (
    <div className="md:w-52 bg-gray-100 border-r border-r-gray-300 text-black lg:flex hidden flex-col">
      <button
        className="md:hidden p-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <ChevronsUpDown className="w-6 h-6" />
      </button>
      <div className={`flex-1 overflow-y-auto no-scrollbar ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <div key={item.name}>
              <NavItem item={item} />
            </div>
          ))}

          <SectionTitle title="My work" />
          {workItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <SectionTitle title="Customers" />
          {customerItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <SectionTitle title="Sales" />
          {salesItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <SectionTitle title="Collateral" />
          {collateralItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <SectionTitle title="Marketing" />
          {marketingItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <SectionTitle title="Performance" />
          {performanceItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <SectionTitle title="Agent Skill" />
          <button
            className="flex items-center px-4 py-3 w-full text-sm group bg-gradient-to-r from-blue-300 to-purple-300 text-white hover:bg-white"
            onClick={() => setIsAgentSkillModalOpen(true)}
          >
            <UserCheck className="w-4 h-4 mr-3" />
            <span>Agent Skill</span>
          </button>
        </nav>
      </div>

      {/* Fixed bottom section */}
      <div className="border-t h-16 flex items-center p-2 justify-between w-full border-gray-200">
        <div className="flex items-center gap-2">
          <div className="bg-purple-500 text-white h-10 w-10 flex items-center justify-center rounded-md">
            <p>S</p>
          </div>
          <h1>Sale</h1>
        </div>
        <ChevronsUpDown />
      </div>

      {/* Agent Skill Modal */}
      {isAgentSkillModalOpen && (
        <AgentSkillModal onClose={() => setIsAgentSkillModalOpen(false)} />
      )}
    </div>
  );
}