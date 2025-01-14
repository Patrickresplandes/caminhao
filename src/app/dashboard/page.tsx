"use client"
import React, { useEffect, useState } from "react";
import { db } from "@/fireBase/index";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface Journey {
  id: string;
  driver: string;
  date: string;
  duration: number;
  distance: number;
}

const Dashboard: React.FC = () => {
  const [journeyData, setJourneyData] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "journeys"));
        const data: Journey[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Journey));
        setJourneyData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Total de Viagens</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{journeyData.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tempo Médio de Jornada</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {journeyData.length > 0
              ? (
                  journeyData.reduce((sum, journey) => sum + journey.duration, 0) /
                  journeyData.length
                ).toFixed(2)
              : "N/A"}{" "}
            horas
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default Dashboard;
