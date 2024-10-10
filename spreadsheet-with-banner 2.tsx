import React, { useState } from 'react';
import { ChevronDown, Plus, Mail, Share2, BarChart2, Shuffle, Table, Trello, AlignLeft, Calendar, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bannerStyles = [
  { 
    name: 'Default', 
    class: 'bg-gradient-to-r from-blue-400 to-purple-500',
    actions: [
      { icon: <Mail size={16} />, title: 'Send Campaign' },
      { icon: <Share2 size={16} />, title: 'Share Results' }
    ]
  },
  { 
    name: 'Suggested', 
    class: 'bg-gradient-to-r from-green-400 to-blue-500',
    actions: [
      { icon: <Mail size={16} />, title: 'Approve Draft' },
      { icon: <Share2 size={16} />, title: 'Schedule Send' }
    ]
  },
  { 
    name: 'Alert', 
    class: 'bg-gradient-to-r from-red-400 to-yellow-500',
    actions: [
      { icon: <Mail size={16} />, title: 'Pause Campaign' },
      { icon: <Share2 size={16} />, title: 'Review Metrics' }
    ]
  }
];

const dummyData = [
  { id: 1, task: 'Design Email Template', start: '2023-06-01', end: '2023-06-05', status: 'Completed' },
  { id: 2, task: 'Write Email Copy', start: '2023-06-03', end: '2023-06-07', status: 'In Progress' },
  { id: 3, task: 'Segment Audience', start: '2023-06-05', end: '2023-06-08', status: 'Not Started' },
  { id: 4, task: 'A/B Test Subject Lines', start: '2023-06-08', end: '2023-06-10', status: 'Not Started' },
  { id: 5, task: 'Schedule Campaign', start: '2023-06-11', end: '2023-06-12', status: 'Not Started' },
  { id: 6, task: 'Send Campaign', start: '2023-06-15', end: '2023-06-15', status: 'Not Started' },
  { id: 7, task: 'Analyze Results', start: '2023-06-16', end: '2023-06-20', status: 'Not Started' }
];

const SpreadsheetWithEnhancedHeader = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [bannerContent, setBannerContent] = useState('Email Campaign Planning');
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [viewMode, setViewMode] = useState('dataTable');

  const toggleBanner = () => setIsCollapsed(!isCollapsed);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    setBannerContent(e.dataTransfer.getData('text'));
  };
  const currentStyle = bannerStyles[currentStyleIndex];
  const toggleView = () => setViewMode(prev => prev === 'dataTable' ? 'ganttChart' : prev === 'ganttChart' ? 'cardsBoard' : 'dataTable');

  const renderDataTable = () => (
    <div className="overflow-x-auto relative">
      <div className="bg-gray-200 border-b flex">
        {['', 'A', 'B', 'C', 'D'].map((col, i) => (
          <div key={i} className={`${i === 0 ? 'w-7' : 'flex-1'} p-1 text-center text-xs font-normal text-gray-500 ${i < 4 ? 'border-r' : ''}`}>{col}</div>
        ))}
      </div>
      <div className="bg-black text-white flex">
        {[
          { title: '#', icon: null, type: '' },
          { title: 'Task', icon: <AlignLeft size={12} />, type: 'Text' },
          { title: 'Start Date', icon: <Calendar size={12} />, type: 'Date' },
          { title: 'End Date', icon: <Calendar size={12} />, type: 'Date' },
          { title: 'Status', icon: <List size={12} />, type: 'Dropdown' }
        ].map((col, i) => (
          <div key={i} className={`${i === 0 ? 'w-7' : 'flex-1'} p-2 font-medium text-left`}>
            {col.title}
            {col.icon && (
              <div className="flex items-center mt-1">
                {col.icon}
                <span className="text-xs text-gray-300 ml-1">{col.type}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {dummyData.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="border p-2 text-gray-500 w-7 text-xs text-center">{index + 1}</td>
              <td className="border p-2 flex-1">{row.task}</td>
              <td className="border p-2 flex-1">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{row.start}</span>
              </td>
              <td className="border p-2 flex-1">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{row.end}</span>
              </td>
              <td className="border p-2 flex-1">
                <select className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm" defaultValue={row.status}>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGanttChart = () => (
    <div className="p-4 bg-gray-100 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2">Gantt Chart View</h3>
      <div className="relative h-80 bg-white border rounded p-2" style={{ width: '150%' }}>
        {dummyData.map((task, index) => {
          const startDate = new Date(task.start);
          const endDate = new Date(task.end);
          const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
          const left = `${((startDate - new Date('2023-06-01')) / (1000 * 60 * 60 * 24)) * 5}%`;
          const width = `${duration * 5}%`;
          return (
            <div key={task.id} className="absolute h-8 bg-blue-400 rounded" style={{ top: `${index * 40 + 10}px`, left, width }}>
              <span className="text-xs text-white p-1">{task.task}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCardsBoard = () => (
    <div className="p-4 bg-gray-100 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2">Cards Board View</h3>
      <div className="flex space-x-4" style={{ width: '150%' }}>
        {['Not Started', 'In Progress', 'Completed'].map((status) => (
          <div key={status} className="bg-white rounded shadow p-2 w-1/3">
            <h4 className="font-medium mb-2">{status}</h4>
            {dummyData.filter(task => task.status === status).map((task) => (
              <div key={task.id} className="bg-gray-100 rounded p-2 mb-2">
                <p className="font-medium">{task.task}</p>
                <p className="text-sm text-gray-600">{task.start} - {task.end}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto border rounded shadow bg-white">
      <div className="relative">
        {!showBanner && (
          <div className="bg-gray-100 border-b p-1 flex justify-end">
            <Button onClick={() => setShowBanner(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 text-xs rounded-full p-1" title="Add Banner">
              <Plus size={12} />
            </Button>
          </div>
        )}
        {showBanner && (
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'h-16' : 'h-52'} ${currentStyle.class} rounded-t-lg flex flex-col`} onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="flex justify-between items-center p-2">
              <span className="text-white text-3xl font-bold">Your Title</span>
              <div className="flex items-center space-x-2">
                <Button onClick={() => setCurrentStyleIndex((currentStyleIndex + 1) % bannerStyles.length)} className="bg-transparent hover:bg-white/20 text-white rounded-full p-1" title="Change Theme">
                  <Shuffle size={20} />
                </Button>
                <Button onClick={toggleBanner} className="bg-transparent hover:bg-white/20 text-white rounded-full p-1" title={isCollapsed ? "Expand" : "Collapse"}>
                  <ChevronDown size={20} className={isCollapsed ? '' : 'transform rotate-180'} />
                </Button>
              </div>
            </div>
            {!isCollapsed && (
              <>
                <div className="p-2 text-white text-sm flex-grow">{bannerContent}</div>
                <div className="flex justify-between items-center p-2 bg-black/10">
                  <div className="flex space-x-2">
                    {currentStyle.actions.map((action, index) => (
                      <Button key={index} onClick={() => console.log(`${action.title} clicked`)} className="bg-white/20 hover:bg-white/40 text-white rounded px-3 py-1 flex items-center" title={action.title}>
                        {action.icon}
                        <span className="ml-2 text-sm">{action.title}</span>
                      </Button>
                    ))}
                  </div>
                  <Button onClick={toggleView} className="bg-white/20 hover:bg-white/40 text-white rounded px-3 py-1 flex items-center">
                    {viewMode === 'dataTable' && <Table size={16} />}
                    {viewMode === 'ganttChart' && <BarChart2 size={16} />}
                    {viewMode === 'cardsBoard' && <Trello size={16} />}
                    <span className="ml-2 text-sm">Switch View</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        <div className="bg-gray-100 border-b flex items-center p-1">
          <div className="flex-grow">
            <input type="text" placeholder="fx" className="w-full p-1 border rounded" />
          </div>
        </div>
        <div className="relative">
          {viewMode === 'dataTable' && renderDataTable()}
          {viewMode === 'ganttChart' && renderGanttChart()}
          {viewMode === 'cardsBoard' && renderCardsBoard()}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetWithEnhancedHeader;
