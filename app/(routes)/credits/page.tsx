"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/app/provider";
import axios from "axios";

function Credits() {
  const { user } = useAuthContext();
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GetUserCredits = async () => {
    if (!user?.email) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/check-user-credits", {
        email: user?.email,
      });

      setCredits(response.data.credits);
    } catch (err) {
      setError("Could not load your credits. Please try again later.");
      console.error("Error fetching credits:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      GetUserCredits();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Credits</h2>
      <div className="p-5 bg-slate-50 rounded-xl border flex justify-between items-center mt-4">
        <div>
          <h2 className="text-xl font-bold">My Credits:</h2>
          {isLoading && (
            <p className="text-lg text-gray-500">Loading credits...</p>
          )}
          {error && <p className="text-lg text-red-500">{error}</p>}
          {!isLoading && !error && (
            <p className="text-lg text-gray-500">
              {credits !== null
                ? `${credits} credits left`
                : "No credits information available"}
            </p>
          )}
        </div>
        <Button>Buy more credits</Button>
      </div>
    </div>
  );
}

export default Credits;
