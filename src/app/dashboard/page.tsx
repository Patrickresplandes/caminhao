"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/fireBase/index";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { FaCar, FaHourglassHalf, FaFileArchive, FaRoad, FaDollarSign, FaClock } from "react-icons/fa";

interface Journey {
  id?: string;
  titulo: string;
  numero: any;
  motorista: string;
  inicioJornada: string;
  fazenda: string;
  fimJornada: string;
  placa: string;
  kmInicio: number;
  kmFim: number;
  abastecimento: number;
}

interface ControleOrData {
  id: string;
  valor: number; // Monetary value
  duration: number; // Duration in hours
}

const Dashboard: React.FC = () => {
  const [journeyData, setJourneyData] = useState<Journey[]>([]);
  const [controleOrData, setControleOrData] = useState<ControleOrData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Journey Data
        const journeySnapshot = await getDocs(collection(db, "notas"));
        const journeyDocs: Journey[] = journeySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Journey));
        setJourneyData(journeyDocs);

        // Fetch Controle OR Data
        const controleOrSnapshot = await getDocs(collection(db, "controleOr"));
        const controleOrDocs: ControleOrData[] = controleOrSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as ControleOrData));
        setControleOrData(controleOrDocs);
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cálculos
  const totalFarms = new Set(journeyData.map((journey) => journey.fazenda)).size;

  // Total Distance and Average Distance
  const totalDistance = journeyData.reduce((sum, journey) => sum + (journey.kmFim - journey.kmInicio), 0);
  const averageDistance = journeyData.length > 0 ? (totalDistance / journeyData.length).toFixed(2) : "N/A";

  // Total Trips per Day
  const tripsPerDay = journeyData.reduce((acc, journey) => {
    const date = new Date(journey.inicioJornada).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const last30Days = Object.entries(tripsPerDay)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-30);

  // Data for Chart
  const chartData = {
    labels: last30Days.map(([date]) => date),
    datasets: [
      {
        label: "Viagens por dia",
        data: last30Days.map(([_, count]) => count),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Total Value (OR)
  const totalValue = controleOrData.reduce((sum, or) => sum + or.valor, 0);

  // Average Duration (OR)
  const averageDuration = controleOrData.length > 0
    ? (controleOrData.reduce((sum, or) => sum + or.duration, 0) / controleOrData.length).toFixed(2)
    : "N/A";

  return (
    <div className="p-6">
      <title>Dashboard</title>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Card for Journey */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <FaCar className="inline-block mr-2" /> Total de Viagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{journeyData.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <FaHourglassHalf className="inline-block mr-2" /> Tempo Médio de Jornada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {journeyData.length > 0
                    ? (
                        journeyData.reduce((sum, journey) => {
                          const start = new Date(journey.inicioJornada).getTime();
                          const end = new Date(journey.fimJornada).getTime();
                          return sum + (end - start) / (1000 * 3600); // Convert ms to hours
                        }, 0) / journeyData.length
                      ).toFixed(2)
                    : "N/A"}{" "}
                  horas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <FaFileArchive className="inline-block mr-2" /> Total de Fazendas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{totalFarms}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <FaRoad className="inline-block mr-2" /> Média de KM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{averageDistance} km</p>
              </CardContent>
            </Card>

            {/* Card for Controle OR */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <FaDollarSign className="inline-block mr-2" /> Valor Total (OR)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">R$ {totalValue.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <FaClock className="inline-block mr-2" /> Tempo Médio (OR)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{averageDuration} horas</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-4 rounded shadow overflow-x-auto max-w-full">
            <h2 className="text-xl font-bold mb-4">Gráfico de Viagens nos Últimos 30 Dias</h2>
            <div className="relative w-full h-64 md:h-72 lg:h-96">
              <Chart type="bar" data={chartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
