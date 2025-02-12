import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Users, Mail, Link, Shield, Activity, Power } from 'lucide-react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AdminDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeUsers, setActiveUsers] = useState("0"); // Initialize to 0 or a loading state
  const [totalScan, setTotalScan] = useState("0") ;
  useEffect(() => {
    const fetchTotalRequestCount = async () => {
      try {
        const response = await fetch('http://localhost:8080/metadata/totalRequestCount');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text(); // Assuming the endpoint returns plain text
        setTotalScan(data);
      } catch (error) {
        console.error("Error fetching active users:", error);
        // Handle error, e.g., display a message or set a default value
        setTotalScan("Error"); // Or a more user-friendly message
      }
    };

    const fetchUserCount = async () => {
        try {
            const response = await fetch('http://localhost:8080/metadata/userCount');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text(); // Assuming the endpoint returns plain text
            setActiveUsers(data);
          } catch (error) {
            console.error("Error fetching active users:", error);
            // Handle error, e.g., display a message or set a default value
            setActiveUsers("Error"); // Or a more user-friendly message
          }
    }
    fetchTotalRequestCount();
    fetchUserCount();

  }, [isOnline]); // Fetch whenever isOnline changes


  // Sample data - replace with real data in production
  const scanData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Email Scans',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',  // Lighter blue
      },
      {
        label: 'URL Scans',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(96, 165, 250, 0.8)',  // Lighter medium blue
      },
    ],
  };

  const phishingData = {
    labels: ['Safe', 'Phishing Detected'],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',   // Lighter blue
          'rgba(239, 68, 68, 0.8)',   // Lighter red
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',     // Solid lighter blue
          'rgba(239, 68, 68, 1)',     // Solid lighter red
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleStatusToggle = () => {
    if (isOnline) {
      // Show confirmation dialog before taking the site offline
      const confirm = window.confirm(
        'Are you sure you want to take the website offline? This will make it inaccessible to all users.'
      );
      if (!confirm) return;
    }
    setIsOnline(!isOnline);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="text-blue-600" />
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                Status: {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={handleStatusToggle}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
                  isOnline
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                <Power className="w-4 h-4" />
                {isOnline ? 'Take Offline' : 'Bring Online'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Status Banner when offline */}
      {!isOnline && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <p className="text-red-600 text-sm font-medium text-center">
              ⚠️ Website is currently offline and inaccessible to users
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Users"
            value={activeUsers} // Use the fetched value here
            icon={<Users className="text-blue-600" />}
          />
          <StatCard
            title="Total Scans"
            value={totalScan}
            icon={<Activity className="text-blue-600" />}
          />
          <StatCard
            title="Email Scans"
            value="3,456"
            icon={<Mail className="text-blue-600" />}
          />
          <StatCard
            title="URL Scans"
            value="2,222"
            icon={<Link className="text-blue-600" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Scan Activity</h2>
            <Bar
              data={scanData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Scan Results</h2>
            <div className="w-3/4 mx-auto">
              <Doughnut
                data={phishingData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;