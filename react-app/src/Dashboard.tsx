import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const userId = localStorage.getItem("UserId"); // Replace this with actual userId, maybe from context or localStorage

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/metadata/isAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userId: userId, // Pass userId in header
          },
        });
        const result = await response.json();
        setIsAdmin(result); // Assuming API returns { "isAdmin": true } or { "isAdmin": false }
      } catch (error) {
        console.error("Error fetching admin status:", error);
      }
    };

    fetchAdminStatus();
  });

  if (isAdmin === null) return <div>Loading...</div>;

  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
