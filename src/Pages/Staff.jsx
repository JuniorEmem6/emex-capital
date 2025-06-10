// src/components/admin/StaffDashboard.jsx
import { useState } from 'react';
import {
  UserGroupIcon,
  UserCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";


export default function StaffDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      name: "Michael Chen",
      role: "Portfolio Manager",
      department: "Quantitative Strategies",
      email: "michael.chen@emexcapital.com",
      status: "active",
      lastActive: "2 hours ago",
      permissions: ["trade_execution", "risk_management"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Risk Analyst",
      department: "Compliance",
      email: "sarah.johnson@emexcapital.com",
      status: "active",
      lastActive: "1 day ago",
      permissions: ["risk_management", "reporting"]
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Developer",
      department: "Technology",
      email: "david.rodriguez@emexcapital.com",
      status: "on_leave",
      lastActive: "1 week ago",
      permissions: ["system_admin"]
    },
    {
      id: 4,
      name: "Emily Wong",
      role: "Trading Associate",
      department: "Global Macro",
      email: "emily.wong@emexcapital.com",
      status: "active",
      lastActive: "30 minutes ago",
      permissions: ["trade_execution"]
    }
  ];

  const filteredStaff = staffMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Staff Management</h1>
          <p className="text-slate-400">Administer your team members and permissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search staff..."
              className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Main Dashboard */}
      <div 
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)'
        }}
      >
        <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
          <TabList className="flex space-x-1 border-b border-white/10 pb-2">
            {[
              { name: "Overview", icon: <ChartBarIcon className="h-5 w-5 mr-2" /> },
              { name: "All Staff", icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
              { name: "Attendance", icon: <ClockIcon className="h-5 w-5 mr-2" /> },
              { name: "Permissions", icon: <ShieldCheckIcon className="h-5 w-5 mr-2" /> },
              { name: "Settings", icon: <CogIcon className="h-5 w-5 mr-2" /> }
            ].map((tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `flex items-center px-4 py-2 rounded-t-lg text-sm font-medium ${
                    selected
                      ? 'bg-amber-500/20 text-amber-400 border-b-2 border-amber-400'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {tab.icon}
                {tab.name}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-6">
            {/* Overview Panel */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">Staff Distribution</h3>
                  <div className="h-64">
                    {/* Placeholder for department chart */}
                    <div className="flex items-center justify-center h-full text-white/30">
                      Department distribution chart
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">Activity Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/70">Active</span>
                      <span className="text-white">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">On Leave</span>
                      <span className="text-white">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Terminated</span>
                      <span className="text-white">0</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="text-sm text-white/80">
                      <p>Emily Wong executed 3 trades</p>
                      <p className="text-xs text-white/50">30 minutes ago</p>
                    </div>
                    <div className="text-sm text-white/80">
                      <p>Michael Chen updated risk parameters</p>
                      <p className="text-xs text-white/50">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* All Staff Panel */}
            <TabPanel>
              <div className="overflow-hidden shadow ring-1 ring-black/5 rounded-lg">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {filteredStaff.map((member) => (
                      <tr key={member.id} className="hover:bg-white/10">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                              <UserCircleIcon className="h-6 w-6 text-amber-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{member.name}</div>
                              <div className="text-sm text-white/60">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{member.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{member.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {member.status === 'active' ? 'Active' : 'On Leave'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{member.lastActive}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-amber-400 hover:text-amber-300 mr-3">Edit</button>
                          <button className="text-rose-400 hover:text-rose-300">Revoke</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabPanel>

            {/* Other Panels... */}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

// Mock icon component
function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}