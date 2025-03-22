"use client";

import { useAuthContext } from "@/app/provider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DesignCard from "./_components/DesignCard";

function Design() {
  const { user } = useAuthContext();
  const [wireframes, setWireframes] = useState([]);
  const [wireframesLoading, setWireframesLoading] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      getUserWireframe();
      GetUserCredits();
    }
  }, [user]); // Add user as dependency

  const getUserWireframe = async () => {
    try {
      setWireframesLoading(true);
      // Fetch user wireframe
      const result = await axios.get(
        `/api/wireframe-to-code?email=${user?.email}`
      );
      console.log("🚀 ~ GetRecordInfo ~ result:", result.data);
      setWireframes(result.data);
    } catch (error) {
      console.log("🚀 ~ page.tsx:28 ~ getUserWireframe ~ error:", error);
    } finally {
      setWireframesLoading(false);
    }
  };

  const GetUserCredits = async () => {
    if (!user?.email) return;

    setCreditsLoading(true);
    try {
      const response = await axios.post("/api/check-user-credits", {
        email: user?.email,
      });

      setCredits(response.data.credits);
    } catch (err) {
      setError("Could not load your credits. Please try again later.");
      console.error("Error fetching credits:", err);
    } finally {
      setCreditsLoading(false);
    }
  };

  const handleDesignDeleted = () => {
    // Refresh the wireframes list
    getUserWireframe();
  };

  return (
    <div className="w-full h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">Wireframe & Code</h2>
          <div className="text-right">
            {creditsLoading && (
              <p className="text-lg text-gray-500">Loading credits...</p>
            )}
            {error && <p className="text-lg text-red-500">{error}</p>}
            {!creditsLoading && !error && (
              <p className="text-lg text-gray-500">
                {credits !== null
                  ? `${credits} credits left`
                  : "No credits information available"}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 p-5">
          {wireframesLoading
            ? // Show skeleton cards while loading
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <DesignCard key={`skeleton-${index}`} item={null} />
                ))
            : wireframes.map((item, index) => (
                <DesignCard
                  key={index}
                  item={item}
                  onDelete={handleDesignDeleted}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Design;
