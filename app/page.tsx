"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingDown,
  CheckCircle,
  MapPin,
  StarIcon,
  DollarSignIcon,
  Calendar,
  BarChart3,
  Shield,
  Crown,
  Brain,
  Clock,
  Percent,
  Upload,
  TrendingUp,
  AlertTriangle,
  Star,
  Users,
  Search,
  Building2,
} from "lucide-react"

// Mock data for demonstration using real Numa properties
const mockProperties = [
  {
    id: 1,
    name: "Berlin Drift",
    stressScore: 85,
    stressCategory: "Critical",
    ngsScore: 72,
    bookingRating: 6.8,
    incidentsRatio: 0.15,
    tasksRatio: 0.22,
    revenue: 45000,
    location: "Berlin, DE",
    trend: "up",
    primaryDriver: "High incident rate",
  },
  {
    id: 2,
    name: "Amsterdam Docklands",
    stressScore: 35,
    stressCategory: "Low",
    ngsScore: 88,
    bookingRating: 8.9,
    incidentsRatio: 0.03,
    tasksRatio: 0.08,
    revenue: 52000,
    location: "Amsterdam, NL",
    trend: "down",
    primaryDriver: "Excellent performance",
  },
  {
    id: 3,
    name: "Munich Viktoria",
    stressScore: 65,
    stressCategory: "High",
    ngsScore: 75,
    bookingRating: 7.2,
    incidentsRatio: 0.09,
    tasksRatio: 0.18,
    revenue: 38000,
    location: "Munich, DE",
    trend: "up",
    primaryDriver: "Maintenance backlog",
  },
  {
    id: 4,
    name: "London Bloomsbury",
    stressScore: 45,
    stressCategory: "Moderate",
    ngsScore: 82,
    bookingRating: 8.1,
    incidentsRatio: 0.06,
    tasksRatio: 0.12,
    revenue: 41000,
    location: "London, GB",
    trend: "stable",
    primaryDriver: "Minor operational issues",
  },
  {
    id: 5,
    name: "Berlin Boxer",
    stressScore: 78,
    stressCategory: "High",
    ngsScore: 68,
    bookingRating: 7.0,
    incidentsRatio: 0.12,
    tasksRatio: 0.2,
    revenue: 35000,
    location: "Berlin, DE",
    trend: "up",
    primaryDriver: "Guest satisfaction issues",
  },
]

const mockTasks = [
  {
    id: 1,
    propertyId: 1,
    propertyName: "Berlin Drift",
    description: "Emergency property assessment",
    assignee: "John Smith",
    dueDate: "2024-01-15",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    propertyId: 3,
    description: "Maintenance planning review",
    propertyName: "Munich Viktoria",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-20",
    status: "To Do",
    priority: "Medium",
  },
]

// Mock data for Review Score Overview using real Numa properties
const mockReviewData = [
  {
    id: 1,
    name: "Berlin Drift",
    location: "Berlin, DE",
    target: 8.6,
    l7: 8.4,
    l14: 8.4,
    l30: 8.5,
    l60: 8.6,
    l90: 8.6,
    reviewCounts: { l7: 10, l14: 8, l30: 11, l60: 7, l90: 7 },
    stressLevel: "Elevated Gap",
    stressColor: "text-orange-600",
    drivers: "MNT, Noise",
    priority: "Urgent",
    priorityColor: "text-red-600",
    sparklineData: [8.2, 8.3, 8.1, 8.4, 8.5, 8.4, 8.6],
  },
  {
    id: 2,
    name: "Munich Viktoria",
    location: "Munich, DE",
    target: 8.8,
    l7: 8.9,
    l14: 8.8,
    l30: 8.7,
    l60: 8.8,
    l90: 8.9,
    reviewCounts: { l7: 15, l14: 12, l30: 18, l60: 14, l90: 16 },
    stressLevel: "Optimal",
    stressColor: "text-green-600",
    drivers: "Service Excellence",
    priority: "Low",
    priorityColor: "text-green-600",
    sparklineData: [8.7, 8.8, 8.9, 8.8, 8.7, 8.8, 8.9],
  },
  {
    id: 3,
    name: "Hamburg Fore",
    location: "Hamburg, DE",
    target: 8.2,
    l7: 7.8,
    l14: 7.9,
    l30: 8.0,
    l60: 8.1,
    l90: 8.0,
    reviewCounts: { l7: 8, l14: 6, l30: 9, l60: 11, l90: 13 },
    stressLevel: "Critical Gap",
    stressColor: "text-red-600",
    drivers: "Cleanliness, Staff",
    priority: "Critical",
    priorityColor: "text-red-600",
    sparklineData: [7.6, 7.7, 7.8, 7.9, 8.0, 7.9, 7.8],
  },
  {
    id: 4,
    name: "Frankfurt Bloc",
    location: "Frankfurt, DE",
    target: 8.5,
    l7: 8.7,
    l14: 8.6,
    l30: 8.5,
    l60: 8.4,
    l90: 8.5,
    reviewCounts: { l7: 12, l14: 14, l30: 16, l60: 18, l90: 15 },
    stressLevel: "Above Target",
    stressColor: "text-green-600",
    drivers: "Location, Amenities",
    priority: "Monitor",
    priorityColor: "text-blue-600",
    sparklineData: [8.3, 8.4, 8.5, 8.6, 8.7, 8.6, 8.7],
  },
  {
    id: 5,
    name: "Cologne Ehrenfeld",
    location: "Cologne, DE",
    target: 8.3,
    l7: 8.1,
    l14: 8.2,
    l30: 8.3,
    l60: 8.2,
    l90: 8.1,
    reviewCounts: { l7: 9, l14: 11, l30: 13, l60: 10, l90: 12 },
    stressLevel: "Minor Gap",
    stressColor: "text-yellow-600",
    drivers: "Breakfast, WiFi",
    priority: "Medium",
    priorityColor: "text-orange-600",
    sparklineData: [8.0, 8.1, 8.2, 8.3, 8.2, 8.1, 8.1],
  },
]

function getStressColor(category: string) {
  switch (category) {
    case "Critical":
      return "bg-red-500"
    case "High":
      return "bg-orange-500"
    case "Moderate":
      return "bg-yellow-500"
    case "Low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

function getStressBadgeVariant(category: string) {
  switch (category) {
    case "Critical":
      return "destructive"
    case "High":
      return "destructive"
    case "Moderate":
      return "secondary"
    case "Low":
      return "default"
    default:
      return "outline"
  }
}

function getScoreColor(score: number, target: number) {
  const diff = score - target
  if (diff >= 0) return "bg-green-100 border-green-300 text-green-800"
  if (diff >= -0.2) return "bg-yellow-100 border-yellow-300 text-yellow-800"
  return "bg-red-100 border-red-300 text-red-800"
}

function SimpleSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  return (
    <div className="flex items-end h-8 w-16 space-x-0.5">
      {data.map((value, index) => {
        const height = ((value - min) / range) * 24 + 4
        return <div key={index} className="bg-blue-400 w-1.5 rounded-sm" style={{ height: `${height}px` }} />
      })}
    </div>
  )
}

export default function NumaPulse() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)

  const stressDistribution = {
    Critical: mockProperties.filter((p) => p.stressCategory === "Critical").length,
    High: mockProperties.filter((p) => p.stressCategory === "High").length,
    Moderate: mockProperties.filter((p) => p.stressCategory === "Moderate").length,
    Low: mockProperties.filter((p) => p.stressCategory === "Low").length,
  }

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === "all" || property.stressCategory === filterCategory
    return matchesSearch && matchesFilter
  })

  const filteredReviewData = mockReviewData.filter((property) => {
    return property.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const averageStressScore = Math.round(
    mockProperties.reduce((sum, p) => sum + p.stressScore, 0) / mockProperties.length,
  )

  const renderPlaceholderContent = (title: string, description: string, icon: React.ReactNode) => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight numa-headline-big">
          {title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed numa-body">
          {description}
        </p>
      </div>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-[#ffc9d2] rounded-full flex items-center justify-center mx-auto">{icon}</div>
            <div>
              <h3 className="text-xl font-medium text-[#191919] mb-2 numa-headline-small">
                Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto numa-body">
                This feature is currently in development and will be available soon.
              </p>
            </div>
            <Button className="bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90 border-0">
              Get Notified
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#ffc9d2] rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-[#191919]" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#191919] tracking-tight numa-headline-small">
                  NumaPulse
                </h1>
                <p className="text-sm text-gray-600 font-light numa-body">
                  Property Intelligence
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties..."
                className="pl-10 w-64 border-gray-200 focus:border-[#ffc9d2] focus:ring-[#ffc9d2]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-[#191919] hover:bg-[#ffc9d2] hover:border-[#ffc9d2] numa-body"
            >
              <Users className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 min-h-screen">
          <nav className="p-6 space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "dashboard"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="h-4 w-4 mr-3" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "properties" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "properties"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("properties")}
            >
              <Building2 className="h-4 w-4 mr-3" />
              All Properties
            </Button>
            <Button
              variant={activeTab === "review-scores" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "review-scores"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("review-scores")}
            >
              <Star className="h-4 w-4 mr-3" />
              Review Score Overview
            </Button>
            <Button
              variant={activeTab === "gm-reports" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "gm-reports"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("gm-reports")}
            >
              <AlertTriangle className="h-4 w-4 mr-3" />
              GM Reports
            </Button>
            <Button
              variant={activeTab === "actions" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "actions"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("actions")}
            >
              <CheckCircle className="h-4 w-4 mr-3" />
              Action Center
            </Button>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            <Button
              variant={activeTab === "coo-center" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "coo-center"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("coo-center")}
            >
              <Shield className="h-4 w-4 mr-3" />
              COO Center
            </Button>
            <Button
              variant={activeTab === "vip-dashboard" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "vip-dashboard"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("vip-dashboard")}
            >
              <Crown className="h-4 w-4 mr-3" />
              VIP Dashboard
            </Button>
            <Button
              variant={activeTab === "ai-projections" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "ai-projections"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("ai-projections")}
            >
              <Brain className="h-4 w-4 mr-3" />
              AI Review Projections
            </Button>
            <Button
              variant={activeTab === "custom-reports" ? "default" : "ghost"}
              className={`w-full justify-start text-left numa-body ${
                activeTab === "custom-reports"
                  ? "bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("custom-reports")}
            >
              <Upload className="h-4 w-4 mr-3" />
              Custom Report Upload
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight numa-headline-big">
                  Portfolio Overview
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed numa-body">
                  Real-time snapshot of all 18 properties
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 numa-body">
                      Average Stress Score
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-[#ffc9d2]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold text-[#191919] mb-1 numa-headline-small">
                      {averageStressScore}
                    </div>
                    <p className="text-xs text-gray-500 numa-body">
                      +2.1 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 numa-body">
                      Critical Properties
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold text-red-600 mb-1 numa-headline-small">
                      {stressDistribution.Critical}
                    </div>
                    <p className="text-xs text-gray-500 numa-body">
                      Require immediate attention
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 numa-body">
                      NGS Gold Standard
                    </CardTitle>
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold text-[#191919] mb-1 numa-headline-small">
                      12
                    </div>
                    <p className="text-xs text-gray-500 numa-body">
                      Properties achieving gold
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 numa-body">
                      Total Revenue
                    </CardTitle>
                    <DollarSignIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold text-[#191919] mb-1 numa-headline-small">
                      €3.8M
                    </div>
                    <p className="text-xs text-gray-500 numa-body">
                      Monthly portfolio revenue
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Stress Distribution */}
              <Card className="border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-[#191919] numa-headline-small">
                    Stress Category Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6">
                    {Object.entries(stressDistribution).map(([category, count]) => (
                      <div key={category} className="text-center">
                        <div
                          className={`w-full h-24 ${getStressColor(category)} rounded-lg mb-3 flex items-center justify-center shadow-sm`}
                        >
                          <span className="text-white text-3xl font-semibold numa-headline-small">
                            {count}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[#191919] mb-1 numa-body">
                          {category}
                        </p>
                        <p className="text-xs text-gray-500 numa-body">
                          {Math.round((count / mockProperties.length) * 100)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top/Bottom Performers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-600 text-xl font-medium numa-headline-small">
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProperties
                        .filter((p) => p.stressCategory === "Low")
                        .slice(0, 3)
                        .map((property) => (
                          <div
                            key={property.id}
                            className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
                          >
                            <div>
                              <p className="font-medium text-[#191919] numa-body">
                                {property.name}
                              </p>
                              <p className="text-sm text-gray-600 numa-body">
                                {property.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600 text-lg numa-headline-small">
                                {property.stressScore}
                              </p>
                              <TrendingDown className="h-4 w-4 text-green-500 ml-auto" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-red-600 text-xl font-medium numa-headline-small">
                      Needs Attention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProperties
                        .filter((p) => p.stressCategory === "Critical" || p.stressCategory === "High")
                        .slice(0, 3)
                        .map((property) => (
                          <div
                            key={property.id}
                            className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100"
                          >
                            <div>
                              <p className="font-medium text-[#191919] numa-body">
                                {property.name}
                              </p>
                              <p className="text-sm text-gray-600 numa-body">
                                {property.primaryDriver}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-red-600 text-lg numa-headline-small">
                                {property.stressScore}
                              </p>
                              <TrendingUp className="h-4 w-4 text-red-500 ml-auto" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "properties" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                  >
                    All Properties
                  </h2>
                  <p
                    className="text-gray-600 text-lg leading-relaxed"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                  >
                    Manage and monitor all portfolio properties
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48 border-gray-200 focus:border-[#ffc9d2] focus:ring-[#ffc9d2]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="border-gray-100 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th
                            className="text-left p-6 font-medium text-[#191919]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Property
                          </th>
                          <th
                            className="text-left p-6 font-medium text-[#191919]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Stress Score
                          </th>
                          <th
                            className="text-left p-6 font-medium text-[#191919]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Category
                          </th>
                          <th
                            className="text-left p-6 font-medium text-[#191919]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            NGS Score
                          </th>
                          <th
                            className="text-left p-6 font-medium text-[#191919]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Booking Rating
                          </th>
                          <th
                            className="text-left p-6 font-medium text-[#191919]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Primary Driver
                          </th>
                          <th
                            className="text-left p-6 font-medium text-[#191919]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProperties.map((property) => (
                          <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-6">
                              <div>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {property.name}
                                </p>
                                <p
                                  className="text-sm text-gray-600 flex items-center mt-1"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property.location}
                                </p>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center space-x-2">
                                <span
                                  className="font-semibold text-lg text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {property.stressScore}
                                </span>
                                {property.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                                {property.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                              </div>
                            </td>
                            <td className="p-6">
                              <Badge variant={getStressBadgeVariant(property.stressCategory)}>
                                {property.stressCategory}
                              </Badge>
                            </td>
                            <td
                              className="p-6 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              {property.ngsScore}
                            </td>
                            <td
                              className="p-6 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              {property.bookingRating}
                            </td>
                            <td
                              className="p-6 text-sm text-gray-600"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                            >
                              {property.primaryDriver}
                            </td>
                            <td className="p-6">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedProperty(property)}
                                className="border-gray-200 text-[#191919] hover:bg-[#ffc9d2] hover:border-[#ffc9d2]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "review-scores" && (
            <div className="space-y-8">
              <div>
                <h2
                  className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight"
                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                >
                  Review Score Overview
                </h2>
                <p
                  className="text-gray-600 text-lg leading-relaxed"
                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                >
                  Track guest satisfaction scores across all time periods and identify improvement opportunities
                </p>
              </div>

              <Card className="border-gray-100 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th
                            className="text-left p-4 font-medium text-[#191919] min-w-[200px]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Property
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-20"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Target
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-16"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            L7
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-16"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            L14
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-16"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            L30
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-16"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            L60
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-16"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            L90
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-32"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Stress Level
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-20"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Sparkline
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-32"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Drivers
                          </th>
                          <th
                            className="text-center p-4 font-medium text-[#191919] w-24"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Priority
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReviewData.map((property) => (
                          <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">
                              <div>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {property.name}
                                </p>
                                <p
                                  className="text-sm text-gray-600 flex items-center mt-1"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property.location}
                                </p>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="inline-block border-2 border-[#191919] px-2 py-1 rounded">
                                <span
                                  className="font-semibold text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {property.target}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="space-y-1">
                                <div
                                  className={`inline-block px-2 py-1 rounded border ${getScoreColor(property.l7, property.target)}`}
                                >
                                  <span
                                    className="font-semibold text-sm"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {property.l7}
                                  </span>
                                </div>
                                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 inline-block px-2 py-1 rounded text-xs font-semibold">
                                  {property.reviewCounts.l7}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="space-y-1">
                                <div
                                  className={`inline-block px-2 py-1 rounded border ${getScoreColor(property.l14, property.target)}`}
                                >
                                  <span
                                    className="font-semibold text-sm"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {property.l14}
                                  </span>
                                </div>
                                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 inline-block px-2 py-1 rounded text-xs font-semibold">
                                  {property.reviewCounts.l14}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="space-y-1">
                                <div
                                  className={`inline-block px-2 py-1 rounded border ${getScoreColor(property.l30, property.target)}`}
                                >
                                  <span
                                    className="font-semibold text-sm"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {property.l30}
                                  </span>
                                </div>
                                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 inline-block px-2 py-1 rounded text-xs font-semibold">
                                  {property.reviewCounts.l30}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="space-y-1">
                                <div
                                  className={`inline-block px-2 py-1 rounded border ${getScoreColor(property.l60, property.target)}`}
                                >
                                  <span
                                    className="font-semibold text-sm"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {property.l60}
                                  </span>
                                </div>
                                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 inline-block px-2 py-1 rounded text-xs font-semibold">
                                  {property.reviewCounts.l60}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="space-y-1">
                                <div
                                  className={`inline-block px-2 py-1 rounded border ${getScoreColor(property.l90, property.target)}`}
                                >
                                  <span
                                    className="font-semibold text-sm"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {property.l90}
                                  </span>
                                </div>
                                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 inline-block px-2 py-1 rounded text-xs font-semibold">
                                  {property.reviewCounts.l90}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className={`font-medium text-sm ${property.stressColor}`}
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                {property.stressLevel}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center">
                                <SimpleSparkline data={property.sparklineData} />
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className="text-sm text-gray-700"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                {property.drivers}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className={`font-medium text-sm ${property.priorityColor}`}
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                {property.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "stress-action-report" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                  >
                    Stress Action Report
                  </h2>
                  <p
                    className="text-gray-600 text-lg leading-relaxed"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                  >
                    Executive insights combining review sentiment, operational stress factors, and action status
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Select
                    value={selectedProperty?.id?.toString() || ""}
                    onValueChange={(value) => {
                      const property = mockProperties.find((p) => p.id.toString() === value)
                      setSelectedProperty(property)
                    }}
                  >
                    <SelectTrigger className="w-64 border-gray-200 focus:border-[#ffc9d2] focus:ring-[#ffc9d2]">
                      <SelectValue placeholder="Select property for report" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProperties.map((property) => (
                        <SelectItem key={property.id} value={property.id.toString()}>
                          {property.name} - {property.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedProperty ? (
                <div className="space-y-8">
                  {/* Executive Summary Header */}
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-[#ffc9d2] to-[#ffc9d2]/80">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle
                            className="text-2xl font-semibold text-[#191919] mb-2"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            {selectedProperty.name} - Executive Stress Action Report
                          </CardTitle>
                          <p
                            className="text-[#191919]/80 flex items-center"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            {selectedProperty.location} • Report Generated: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div
                                className="text-3xl font-bold text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                {selectedProperty.stressScore}
                              </div>
                              <p
                                className="text-sm text-[#191919]/80"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Stress Score
                              </p>
                            </div>
                            <Badge
                              variant={getStressBadgeVariant(selectedProperty.stressCategory)}
                              className="text-lg px-4 py-2"
                            >
                              {selectedProperty.stressCategory}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Key Performance Indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle
                          className="text-sm font-medium text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Guest Satisfaction
                        </CardTitle>
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                      </CardHeader>
                      <CardContent>
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          {selectedProperty.bookingRating}/10
                        </div>
                        <p
                          className="text-xs text-gray-500"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Average booking rating
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle
                          className="text-sm font-medium text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Incident Rate
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </CardHeader>
                      <CardContent>
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          {(selectedProperty.incidentsRatio * 100).toFixed(1)}%
                        </div>
                        <p
                          className="text-xs text-gray-500"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Monthly incident ratio
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle
                          className="text-sm font-medium text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          NGS Performance
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          {selectedProperty.ngsScore}/100
                        </div>
                        <p
                          className="text-xs text-gray-500"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Numa Gold Standard
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle
                          className="text-sm font-medium text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Monthly Revenue
                        </CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          €{selectedProperty.revenue.toLocaleString()}
                        </div>
                        <p
                          className="text-xs text-gray-500"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Current month performance
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sentiment Analysis & Review Insights */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader>
                        <CardTitle
                          className="text-xl font-medium text-[#191919] flex items-center"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          <TrendingUp className="h-5 w-5 text-[#ffc9d2] mr-2" />
                          Sentiment Analysis Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Overall Sentiment Score */}
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div
                              className="text-3xl font-bold text-[#191919] mb-2"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              {selectedProperty.stressCategory === "Critical"
                                ? "68%"
                                : selectedProperty.stressCategory === "High"
                                  ? "74%"
                                  : selectedProperty.stressCategory === "Moderate"
                                    ? "82%"
                                    : "89%"}
                            </div>
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                            >
                              Overall Positive Sentiment
                            </p>
                          </div>

                          {/* Sentiment Breakdown */}
                          <div className="space-y-3">
                            <h4
                              className="font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Key Sentiment Drivers
                            </h4>
                            {(selectedProperty.stressCategory === "Critical"
                              ? [
                                  { aspect: "Cleanliness", sentiment: 45, trend: "down", mentions: 89 },
                                  { aspect: "Noise Levels", sentiment: 32, trend: "down", mentions: 67 },
                                  { aspect: "Staff Response", sentiment: 58, trend: "stable", mentions: 43 },
                                  { aspect: "Maintenance", sentiment: 41, trend: "down", mentions: 78 },
                                ]
                              : selectedProperty.stressCategory === "High"
                                ? [
                                    { aspect: "Room Comfort", sentiment: 72, trend: "up", mentions: 56 },
                                    { aspect: "Breakfast Quality", sentiment: 68, trend: "stable", mentions: 34 },
                                    { aspect: "WiFi Service", sentiment: 61, trend: "down", mentions: 29 },
                                    { aspect: "Location", sentiment: 85, trend: "up", mentions: 67 },
                                  ]
                                : [
                                    { aspect: "Service Quality", sentiment: 91, trend: "up", mentions: 78 },
                                    { aspect: "Cleanliness", sentiment: 88, trend: "stable", mentions: 65 },
                                    { aspect: "Value for Money", sentiment: 84, trend: "up", mentions: 52 },
                                    { aspect: "Amenities", sentiment: 87, trend: "stable", mentions: 41 },
                                  ]
                            ).map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                              >
                                <div>
                                  <p
                                    className="font-medium text-[#191919]"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {item.aspect}
                                  </p>
                                  <p
                                    className="text-sm text-gray-600"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                  >
                                    {item.mentions} mentions
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span
                                    className={`font-semibold ${
                                      item.sentiment >= 80
                                        ? "text-green-600"
                                        : item.sentiment >= 60
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                    }`}
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {item.sentiment}%
                                  </span>
                                  {item.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                                  {item.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader>
                        <CardTitle
                          className="text-xl font-medium text-[#191919] flex items-center"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                          Critical Issues Identified
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {(selectedProperty.stressCategory === "Critical"
                            ? [
                                {
                                  issue: "Recurring maintenance failures",
                                  severity: "Critical",
                                  impact: "Guest satisfaction declining",
                                  lastReported: "2 days ago",
                                  severityColor: "bg-red-100 text-red-800",
                                },
                                {
                                  issue: "Noise complaints increasing",
                                  severity: "High",
                                  impact: "Multiple negative reviews",
                                  lastReported: "1 day ago",
                                  severityColor: "bg-orange-100 text-orange-800",
                                },
                                {
                                  issue: "Cleaning standards inconsistent",
                                  severity: "High",
                                  impact: "NGS score impact",
                                  lastReported: "3 days ago",
                                  severityColor: "bg-orange-100 text-orange-800",
                                },
                              ]
                            : selectedProperty.stressCategory === "High"
                              ? [
                                  {
                                    issue: "WiFi connectivity issues",
                                    severity: "Medium",
                                    impact: "Business traveler complaints",
                                    lastReported: "1 day ago",
                                    severityColor: "bg-yellow-100 text-yellow-800",
                                  },
                                  {
                                    issue: "Breakfast service delays",
                                    severity: "Medium",
                                    impact: "Morning rush complaints",
                                    lastReported: "2 days ago",
                                    severityColor: "bg-yellow-100 text-yellow-800",
                                  },
                                ]
                              : [
                                  {
                                    issue: "Minor amenity requests",
                                    severity: "Low",
                                    impact: "Enhancement opportunities",
                                    lastReported: "1 week ago",
                                    severityColor: "bg-green-100 text-green-800",
                                  },
                                ]
                          ).map((issue, index) => (
                            <div key={index} className="p-4 border border-gray-100 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {issue.issue}
                                </p>
                                <Badge className={issue.severityColor}>{issue.severity}</Badge>
                              </div>
                              <p
                                className="text-sm text-gray-600 mb-1"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Impact: {issue.impact}
                              </p>
                              <p
                                className="text-xs text-gray-500"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Last reported: {issue.lastReported}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Site Visit Report Integration */}
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader>
                        <CardTitle
                          className="text-xl font-medium text-[#191919] flex items-center"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          <Building2 className="h-5 w-5 text-[#ffc9d2] mr-2" />
                          Latest Site Visit Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  Executive Assessment Report
                                </h4>
                                <span
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Uploaded: {new Date().toLocaleDateString()}
                                </span>
                              </div>
                              <p
                                className="text-sm text-gray-700 mb-3"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                {selectedProperty.name === "Berlin Drift"
                                  ? "Comprehensive facility inspection revealed multiple immediate action items requiring urgent attention. Lighting systems showing signs of electrical issues, cleaning protocols need reinforcement, and guest-facing areas require maintenance updates."
                                  : "Property assessment shows good overall condition with minor improvement opportunities. Maintenance schedules are being followed effectively, and guest satisfaction metrics align with operational standards."}
                              </p>
                              <div className="flex items-center space-x-4 text-sm">
                                <span
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Inspector: Regional Manager
                                </span>
                                <span
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Duration: 4 hours
                                </span>
                                <span
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Areas Covered: 12
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4
                                className="font-medium text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                Key Findings Summary
                              </h4>
                              {(selectedProperty.name === "Berlin Drift"
                                ? [
                                    {
                                      area: "Electrical Systems",
                                      finding: "Flashing lights in stairways and restaurant",
                                      priority: "Immediate",
                                      status: "Action Required",
                                    },
                                    {
                                      area: "Cleaning Standards",
                                      finding: "Breakfast area carpet needs deep cleaning",
                                      priority: "Immediate",
                                      status: "Scheduled",
                                    },
                                    {
                                      area: "Safety Compliance",
                                      finding: "Missing light switch cover in basement",
                                      priority: "Immediate",
                                      status: "Parts Ordered",
                                    },
                                    {
                                      area: "Guest Amenities",
                                      finding: "Gym equipment showing wear",
                                      priority: "Standard",
                                      status: "Assessment Pending",
                                    },
                                  ]
                                : [
                                    {
                                      area: "Maintenance",
                                      finding: "Preventive maintenance up to date",
                                      priority: "Standard",
                                      status: "Compliant",
                                    },
                                    {
                                      area: "Cleanliness",
                                      finding: "High standards maintained",
                                      priority: "Standard",
                                      status: "Excellent",
                                    },
                                    {
                                      area: "Guest Experience",
                                      finding: "Minor amenity enhancements possible",
                                      priority: "Low",
                                      status: "Under Review",
                                    },
                                  ]
                                ).map((finding, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                                  >
                                    <div>
                                      <p
                                        className="font-medium text-[#191919]"
                                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                      >
                                        {finding.area}
                                      </p>
                                      <p
                                        className="text-sm text-gray-600"
                                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                      >
                                        {finding.finding}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <Badge
                                        variant={finding.priority === "Immediate" ? "destructive" : "secondary"}
                                        className="mb-1"
                                      >
                                        {finding.priority}
                                      </Badge>
                                      <p
                                        className="text-xs text-gray-500"
                                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                      >
                                        {finding.status}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div>
                            <h4
                              className="font-medium text-[#191919] mb-3"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Assessment Scores
                            </h4>
                            <div className="space-y-3">
                              {[
                                {
                                  category: "Safety & Compliance",
                                  score: selectedProperty.stressCategory === "Critical" ? 72 : 94,
                                },
                                {
                                  category: "Cleanliness Standards",
                                  score: selectedProperty.stressCategory === "Critical" ? 68 : 91,
                                },
                                {
                                  category: "Guest Experience",
                                  score: selectedProperty.stressCategory === "Critical" ? 65 : 88,
                                },
                                {
                                  category: "Maintenance Quality",
                                  score: selectedProperty.stressCategory === "Critical" ? 58 : 92,
                                },
                              ].map((score, index) => (
                                <div key={index} className="space-y-1">
                                  <div className="flex justify-between">
                                    <span
                                      className="text-sm font-medium text-[#191919]"
                                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                    >
                                      {score.category}
                                    </span>
                                    <span
                                      className="text-sm font-semibold text-[#191919]"
                                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                    >
                                      {score.score}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        score.score >= 90
                                          ? "bg-green-500"
                                          : score.score >= 75
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                      style={{ width: `${score.score}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Items & Asana Integration */}
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader>
                        <CardTitle
                          className="text-xl font-medium text-[#191919] flex items-center"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Action Items & Task Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4
                              className="font-medium text-[#191919] mb-4"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Active Asana Tasks
                            </h4>
                            <div className="space-y-3">
                              {(selectedProperty.name === "Berlin Drift"
                                ? [
                                    {
                                      task: "Fix flashing stairway lighting (floors 2-3)",
                                      assignee: "Facility Manager",
                                      dueDate: "Today",
                                      status: "In Progress",
                                      priority: "Critical",
                                      asanaId: "ASN-2024-001",
                                      statusColor: "bg-orange-100 text-orange-800",
                                    },
                                    {
                                      task: "Deep clean breakfast area carpet",
                                      assignee: "Cleaning Service",
                                      dueDate: "Tomorrow",
                                      status: "Scheduled",
                                      priority: "High",
                                      asanaId: "ASN-2024-002",
                                      statusColor: "bg-blue-100 text-blue-800",
                                    },
                                    {
                                      task: "Install basement light switch cover",
                                      assignee: "Maintenance",
                                      dueDate: "Jan 20",
                                      status: "Parts Ordered",
                                      priority: "Medium",
                                      asanaId: "ASN-2024-003",
                                      statusColor: "bg-yellow-100 text-yellow-800",
                                    },
                                    {
                                      task: "Replace broken gym equipment",
                                      assignee: "Facility Manager",
                                      dueDate: "Jan 25",
                                      status: "Quote Pending",
                                      priority: "Medium",
                                      asanaId: "ASN-2024-004",
                                      statusColor: "bg-gray-100 text-gray-800",
                                    },
                                  ]
                                : [
                                    {
                                      task: "Monthly preventive maintenance check",
                                      assignee: "Maintenance Team",
                                      dueDate: "Jan 30",
                                      status: "Scheduled",
                                      priority: "Standard",
                                      asanaId: "ASN-2024-015",
                                      statusColor: "bg-blue-100 text-blue-800",
                                    },
                                    {
                                      task: "Guest amenity enhancement review",
                                      assignee: "Hotel Manager",
                                      dueDate: "Feb 5",
                                      status: "Planning",
                                      priority: "Low",
                                      asanaId: "ASN-2024-016",
                                      statusColor: "bg-gray-100 text-gray-800",
                                    },
                                  ]
                                ).map((task, index) => (
                                  <div key={index} className="p-4 border border-gray-100 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <p
                                        className="font-medium text-[#191919]"
                                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                      >
                                        {task.task}
                                      </p>
                                      <Badge variant={task.priority === "Critical" ? "destructive" : "secondary"}>
                                        {task.priority}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <div>
                                        <p
                                          className="text-gray-600"
                                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                        >
                                          Assigned: {task.assignee}
                                        </p>
                                        <p
                                          className="text-gray-500"
                                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                        >
                                          Due: {task.dueDate} • {task.asanaId}
                                        </p>
                                      </div>
                                      <Badge className={task.statusColor}>{task.status}</Badge>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div>
                            <h4
                              className="font-medium text-[#191919] mb-4"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Completion Metrics
                            </h4>
                            <div className="space-y-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span
                                    className="text-sm font-medium text-[#191919]"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    Tasks Completed This Month
                                  </span>
                                  <span
                                    className="text-lg font-semibold text-[#191919]"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {selectedProperty.stressCategory === "Critical" ? "12/18" : "8/10"}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-[#ffc9d2] h-2 rounded-full"
                                    style={{ width: selectedProperty.stressCategory === "Critical" ? "67%" : "80%" }}
                                  ></div>
                                </div>
                              </div>

                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span
                                    className="text-sm font-medium text-[#191919]"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    Average Resolution Time
                                  </span>
                                  <span
                                    className="text-lg font-semibold text-[#191919]"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {selectedProperty.stressCategory === "Critical" ? "6.2 days" : "3.1 days"}
                                  </span>
                                </div>
                                <p
                                  className="text-xs text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Target: 4.0 days
                                </p>
                              </div>

                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span
                                    className="text-sm font-medium text-[#191919]"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    Overdue Tasks
                                  </span>
                                  <span
                                    className={`text-lg font-semibold ${
                                      selectedProperty.stressCategory === "Critical" ? "text-red-600" : "text-green-600"
                                    }`}
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {selectedProperty.stressCategory === "Critical" ? "3" : "0"}
                                  </span>
                                </div>
                                <p
                                  className="text-xs text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Requires immediate attention
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recommendations & Next Steps */}
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader>
                        <CardTitle
                          className="text-xl font-medium text-[#191919] flex items-center"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          <Brain className="h-5 w-5 text-[#ffc9d2] mr-2" />
                          AI-Generated Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4
                              className="font-medium text-[#191919] mb-4"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Immediate Actions Required
                            </h4>
                            <div className="space-y-3">
                              {(selectedProperty.stressCategory === "Critical"
                                ? [
                                    "Prioritize electrical system repairs to prevent safety issues",
                                    "Implement enhanced cleaning protocols for guest-facing areas",
                                    "Schedule emergency maintenance assessment within 48 hours",
                                    "Increase guest communication regarding ongoing improvements",
                                  ]
                                : selectedProperty.stressCategory === "High"
                                  ? [
                                      "Address WiFi connectivity issues in business center",
                                      "Optimize breakfast service timing during peak hours",
                                      "Review maintenance schedules for preventive measures",
                                    ]
                                  : [
                                      "Continue current excellent operational standards",
                                      "Consider guest amenity enhancements for competitive advantage",
                                      "Maintain regular preventive maintenance schedule",
                                    ]
                                ).map((action, index) => (
                                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    <p
                                      className="text-sm text-[#191919]"
                                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                    >
                                      {action}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div>
                            <h4
                              className="font-medium text-[#191919] mb-4"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Strategic Improvements
                            </h4>
                            <div className="space-y-3">
                              {(selectedProperty.stressCategory === "Critical"
                                ? [
                                    "Develop comprehensive maintenance training program",
                                    "Implement guest feedback monitoring system",
                                    "Review vendor contracts for service quality improvements",
                                    "Create escalation procedures for critical issues",
                                  ]
                                : [
                                    "Explore technology upgrades for enhanced guest experience",
                                    "Consider sustainability initiatives for cost optimization",
                                    "Develop staff recognition programs for continued excellence",
                                  ]
                                ).map((improvement, index) => (
                                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                    <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <p
                                      className="text-sm text-[#191919]"
                                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                    >
                                      {improvement}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-gray-100 shadow-sm">
                    <CardContent className="p-12">
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-[#ffc9d2] rounded-full flex items-center justify-center mx-auto">
                          <Building2 className="h-12 w-12 text-[#191919]" />
                        </div>
                        <div>
                          <h3
                            className="text-xl font-medium text-[#191919] mb-2"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Select a Property
                          </h3>
                          <p
                            className="text-gray-600 max-w-md mx-auto"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                          >
                            Choose a property from the dropdown above to view its comprehensive stress action report.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
\
            {activeTab === "actions" && (
              <div className="space-y-8">
                <div>
                  <h2
                    className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                  >
                    Action Center
                  </h2>
                  <p
                    className="text-gray-600 text-lg leading-relaxed"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                  >
                    Track and manage all property improvement tasks
                  </p>
                </div>

                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle
                      className="text-xl font-medium text-[#191919]"
                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                    >
                      Active Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-6 border border-gray-100 rounded-lg"
                        >
                          <div className="flex-1">
                            <p
                              className="font-medium text-[#191919] mb-1"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              {task.description}
                            </p>
                            <p
                              className="text-sm text-gray-600 mb-1"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                            >
                              {task.propertyName}
                            </p>
                            <p
                              className="text-sm text-gray-500"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                            >
                              Assigned to: {task.assignee}
                            </p>
                          </div>
                          <div className="flex items-center space-x-6">
                            <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
                              {task.priority}
                            </Badge>
                            <div className="text-right">
                              <p
                                className="text-sm font-medium text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                {task.status}
                              </p>
                              <p
                                className="text-xs text-gray-500 flex items-center"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                Due: {task.dueDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "gm-center" && (
              <div className="space-y-8">
                <div>
                  <h2
                    className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                  >
                    GM Center
                  </h2>
                  <p
                    className="text-gray-600 text-lg leading-relaxed"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                  >
                    Financial performance and operational insights for property optimization
                  </p>
                </div>

                {/* Financial Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        Portfolio Contribution Margin
                      </CardTitle>
                      <Percent className="h-4 w-4 text-[#ffc9d2]" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        68.4%
                      </div>
                      <p
                        className="text-xs text-green-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        +2.3% vs target (66.1%)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        Average RevPAR
                      </CardTitle>
                      <DollarSignIcon className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        €142
                      </div>
                      <p
                        className="text-xs text-green-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        +8.2% vs last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        Occupancy Rate
                      </CardTitle>
                      <Users className="h-4 w-4 text-[#ffc9d2]" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        84.7%
                      </div>
                      <p
                        className="text-xs text-orange-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        -1.2% vs target (85.9%)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        Operating Cost Ratio
                      </CardTitle>
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        31.6%
                      </div>
                      <p
                        className="text-xs text-green-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        -1.8% efficiency gain
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Contribution Margin Status by Property */}
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle
                      className="text-xl font-medium text-[#191919]"
                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                    >
                      Property Contribution Margin Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th
                              className="text-left p-4 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Property
                            </th>
                            <th
                              className="text-center p-4 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Current Margin
                            </th>
                            <th
                              className="text-center p-4 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Target
                            </th>
                            <th
                              className="text-center p-4 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Variance
                            </th>
                            <th
                              className="text-center p-4 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Monthly Revenue
                            </th>
                            <th
                              className="text-center p-4 font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              name: "Amsterdam Docklands",
                              location: "Amsterdam, NL",
                              current: 72.3,
                              target: 66.0,
                              variance: 6.3,
                              revenue: 52000,
                              status: "Exceeding",
                              statusColor: "bg-green-100 text-green-800",
                            },
                            {
                              name: "London Bloomsbury",
                              location: "London, GB",
                              current: 68.1,
                              target: 67.0,
                              variance: 1.1,
                              revenue: 41000,
                              status: "On Target",
                              statusColor: "bg-blue-100 text-blue-800",
                            },
                            {
                              name: "Munich Viktoria",
                              location: "Munich, DE",
                              current: 64.2,
                              target: 66.5,
                              variance: -2.3,
                              revenue: 38000,
                              status: "Below Target",
                              statusColor: "bg-orange-100 text-orange-800",
                            },
                            {
                              name: "Berlin Drift",
                              location: "Berlin, DE",
                              current: 58.7,
                              target: 65.0,
                              variance: -6.3,
                              revenue: 45000,
                              status: "Critical",
                              statusColor: "bg-red-100 text-red-800",
                            },
                            {
                              name: "Berlin Boxer",
                              location: "Berlin, DE",
                              current: 61.4,
                              target: 64.0,
                              variance: -2.6,
                              revenue: 35000,
                              status: "Below Target",
                              statusColor: "bg-orange-100 text-orange-800",
                            },
                          ].map((property, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="p-4">
                                <div>
                                  <p
                                    className="font-medium text-[#191919]"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                  >
                                    {property.name}
                                  </p>
                                  <p
                                    className="text-sm text-gray-600"
                                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                  >
                                    {property.location}
                                  </p>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className="font-semibold text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {property.current}%
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  {property.target}%
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className={`font-medium ${property.variance > 0 ? "text-green-600" : "text-red-600"}`}
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {property.variance > 0 ? "+" : ""}
                                  {property.variance}%
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  €{property.revenue.toLocaleString()}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <Badge className={property.statusColor}>{property.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Drivers Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Cost Categories */}
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle
                        className="text-xl font-medium text-[#191919]"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        Highest Impact Cost Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            category: "Maintenance & Repairs",
                            monthlySpend: 28500,
                            budgetVariance: 12.3,
                            impact: "High",
                            impactColor: "bg-red-100 text-red-800",
                            properties: "Berlin Drift, Munich Viktoria",
                          },
                          {
                            category: "Cleaning Services",
                            monthlySpend: 22100,
                            budgetVariance: -3.2,
                            impact: "Medium",
                            impactColor: "bg-yellow-100 text-yellow-800",
                            properties: "All Properties",
                          },
                          {
                            category: "Utilities & Energy",
                            monthlySpend: 18700,
                            budgetVariance: 8.1,
                            impact: "Medium",
                            impactColor: "bg-yellow-100 text-yellow-800",
                            properties: "Berlin Boxer, Amsterdam Docklands",
                          },
                          {
                            category: "Guest Amenities",
                            monthlySpend: 12300,
                            budgetVariance: -1.5,
                            impact: "Low",
                            impactColor: "bg-green-100 text-green-800",
                            properties: "London Bloomsbury, Amsterdam Docklands",
                          },
                        ].map((cost, index) => (
                          <div key={index} className="p-4 border border-gray-100 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p
                                className="font-medium text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                {cost.category}
                              </p>
                              <Badge className={cost.impactColor}>{cost.impact} Impact</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Monthly Spend
                                </p>
                                <p
                                  className="font-semibold text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  €{cost.monthlySpend.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Budget Variance
                                </p>
                                <p
                                  className={`font-semibold ${
                                    cost.budgetVariance > 0 ? "text-red-600" : "text-green-600"
                                  }`}
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {cost.budgetVariance > 0 ? "+" : ""}
                                  {cost.budgetVariance}%
                                </p>
                              </div>
                            </div>
                            <p
                              className="text-xs text-gray-500 mt-2"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                            >
                              Primary Properties: {cost.properties}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cost Optimization */}
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle
                        className="text-xl font-medium text-[#191919]"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        Cost Optimization Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            opportunity: "Centralized Maintenance Contracts",
                            potentialSavings: 4200,
                            timeframe: "3-6 months",
                            effort: "High",
                            effortColor: "bg-red-100 text-red-800",
                          },
                          {
                            opportunity: "Energy Efficiency Upgrades",
                            potentialSavings: 2800,
                            timeframe: "6-12 months",
                            effort: "Medium",
                            effortColor: "bg-yellow-100 text-yellow-800",
                          },
                          {
                            opportunity: "Cleaning Service Optimization",
                            potentialSavings: 1900,
                            timeframe: "1-3 months",
                            effort: "Low",
                            effortColor: "bg-green-100 text-green-800",
                          },
                          {
                            opportunity: "Vendor Consolidation",
                            potentialSavings: 1500,
                            timeframe: "2-4 months",
                            effort: "Medium",
                            effortColor: "bg-yellow-100 text-yellow-800",
                          },
                        ].map((opp, index) => (
                          <div key={index} className="p-4 border border-gray-100 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p
                                className="font-medium text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                {opp.opportunity}
                              </p>
                              <Badge className={opp.effortColor}>{opp.effort} Effort</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Monthly Savings
                                </p>
                                <p
                                  className="font-semibold text-green-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  €{opp.potentialSavings.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p
                                  className="text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Timeframe
                                </p>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {opp.timeframe}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Guest Experience Analytics */}
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle
                      className="text-xl font-medium text-[#191919]"
                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                    >
                      Guest Experience Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Overall Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          8.4
                        </div>
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Average OTA Rating
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          67
                        </div>
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          NPS Score
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          92%
                        </div>
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Satisfaction Rate
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Top Positive Themes */}
                      <div>
                        <h4
                          className="text-lg font-medium text-[#191919] mb-4"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          Top Positive Themes
                        </h4>
                        <div className="space-y-3">
                          {[
                            { theme: "Location & Accessibility", mentions: 342, sentiment: 94 },
                            { theme: "Staff Friendliness", mentions: 298, sentiment: 91 },
                            { theme: "Cleanliness", mentions: 276, sentiment: 89 },
                            { theme: "Value for Money", mentions: 234, sentiment: 87 },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <div>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {item.theme}
                                </p>
                                <p
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  {item.mentions} mentions
                                </p>
                              </div>
                              <div className="text-right">
                                <p
                                  className="font-semibold text-green-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {item.sentiment}%
                                </p>
                                <p
                                  className="text-xs text-gray-500"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  positive
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Areas for Improvement */}
                      <div>
                        <h4
                          className="text-lg font-medium text-[#191919] mb-4"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          Areas for Improvement
                        </h4>
                        <div className="space-y-3">
                          {[
                            {
                              issue: "Noise Levels",
                              mentions: 156,
                              priority: "High",
                              priorityColor: "bg-red-100 text-red-800",
                            },
                            {
                              issue: "WiFi Connectivity",
                              mentions: 134,
                              priority: "Medium",
                              priorityColor: "bg-yellow-100 text-yellow-800",
                            },
                            {
                              issue: "Breakfast Quality",
                              mentions: 98,
                              priority: "High",
                              priorityColor: "bg-red-100 text-red-800",
                            },
                            {
                              issue: "Check-in Process",
                              mentions: 87,
                              priority: "Medium",
                              priorityColor: "bg-yellow-100 text-yellow-800",
                            },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                              <div>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {item.issue}
                                </p>
                                <p
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  {item.mentions} mentions
                                </p>
                              </div>
                              <Badge className={item.priorityColor}>{item.priority} Priority</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Tickets & Operations */}
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle
                      className="text-xl font-medium text-[#191919]"
                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                    >
                      Service Tickets & Operations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          127
                        </div>
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Open Tickets
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className="text-2xl font-semibold text-[#191919] mb-1"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          4.2h
                        </div>
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Avg Resolution Time
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Common Service Requests */}
                      <div>
                        <h4
                          className="text-lg font-medium text-[#191919] mb-4"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          Common Service Requests
                        </h4>
                        <div className="space-y-3">
                          {[
                            { type: "Maintenance Issues", count: 45, percentage: 35 },
                            { type: "Housekeeping Requests", count: 32, percentage: 25 },
                            { type: "Technical Support", count: 28, percentage: 22 },
                            { type: "Guest Amenities", count: 22, percentage: 18 },
                          ].map((request, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                            >
                              <div>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {request.type}
                                </p>
                                <p
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  {request.count} tickets
                                </p>
                              </div>
                              <div className="text-right">
                                <p
                                  className="font-semibold text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {request.percentage}%
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Property Service Performance */}
                      <div>
                        <h4
                          className="text-lg font-medium text-[#191919] mb-4"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          Property Service Performance
                        </h4>
                        <div className="space-y-3">
                          {[
                            {
                              property: "Amsterdam Docklands",
                              tickets: 18,
                              avgTime: "3.2h",
                              status: "Excellent",
                              statusColor: "bg-green-100 text-green-800",
                            },
                            {
                              property: "London Bloomsbury",
                              tickets: 22,
                              avgTime: "3.8h",
                              status: "Good",
                              statusColor: "bg-blue-100 text-blue-800",
                            },
                            {
                              property: "Munich Viktoria",
                              tickets: 31,
                              avgTime: "5.1h",
                              status: "Needs Attention",
                              statusColor: "bg-orange-100 text-orange-800",
                            },
                            {
                              property: "Berlin Drift",
                              tickets: 38,
                              avgTime: "6.3h",
                              status: "Critical",
                              statusColor: "bg-red-100 text-red-800",
                            },
                          ].map((property, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                            >
                              <div>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {property.property}
                                </p>
                                <p
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  {property.tickets} tickets • {property.avgTime} avg
                                </p>
                              </div>
                              <Badge className={property.statusColor}>{property.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "vip-dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2
                    className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                  >
                    VIP Dashboard
                  </h2>
                  <p
                    className="text-gray-600 text-lg leading-relaxed"
                    style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                  >
                    Premium guest experience management and high-value customer insights
                  </p>
                </div>

                {/* VIP Metrics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        Active VIP Guests
                      </CardTitle>
                      <Crown className="h-4 w-4 text-[#ffc9d2]" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        47
                      </div>
                      <p
                        className="text-xs text-green-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        +12% vs last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        VIP Satisfaction Score
                      </CardTitle>
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        9.2
                      </div>
                      <p
                        className="text-xs text-green-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        +0.3 vs portfolio avg (8.9)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        VIP Revenue Share
                      </CardTitle>
                      <DollarSignIcon className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        34%
                      </div>
                      <p
                        className="text-xs text-green-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        €1.4M monthly contribution
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        Avg Response Time
                      </CardTitle>
                      <Clock className="h-4 w-4 text-[#ffc9d2]" />
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-3xl font-semibold text-[#191919] mb-1"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        4.2m
                      </div>
                      <p
                        className="text-xs text-green-600"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        -1.3m vs target (5.5m)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Current VIP Guests & Service Requests */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current VIP Guests */}
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle
                        className="text-xl font-medium text-[#191919] flex items-center"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        <Crown className="h-5 w-5 text-[#ffc9d2] mr-2" />
                        Current VIP Guests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Alexandra Chen",
                            tier: "Platinum",
                            room: "Amsterdam Docklands - Suite 1201",
                            checkIn: "Today",
                            preferences: "Late checkout, champagne welcome",
                            status: "In-Stay",
                            statusColor: "bg-green-100 text-green-800",
                          },
                          {
                            name: "Marcus Rodriguez",
                            tier: "Gold",
                            room: "London Bloomsbury - Penthouse",
                            checkIn: "Yesterday",
                            preferences: "Quiet room, early breakfast",
                            status: "In-Stay",
                            statusColor: "bg-green-100 text-green-800",
                          },
                          {
                            name: "Sarah Williams",
                            tier: "Platinum",
                            room: "Munich Viktoria - 804",
                            checkIn: "2 days ago",
                            preferences: "Pet-friendly, city view",
                            status: "In-Stay",
                            statusColor: "bg-green-100 text-green-800",
                          },
                          {
                            name: "David Kim",
                            tier: "Gold",
                            room: "Berlin Boxer - 502",
                            checkIn: "Tomorrow",
                            preferences: "Airport transfer, business center",
                            status: "Pre-Arrival",
                            statusColor: "bg-blue-100 text-blue-800",
                          },
                        ].map((guest, index) => (
                          <div key={index} className="p-4 border border-gray-100 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p
                                  className="font-medium text-[#191919]"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                                >
                                  {guest.name}
                                </p>
                                <p
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  {guest.room}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge
                                  className={
                                    guest.tier === "Platinum"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {guest.tier}
                                </Badge>
                                <Badge className={`${guest.statusColor} ml-2`}>{guest.status}</Badge>
                              </div>
                            </div>
                            <div className="text-sm">
                              <p
                                className="text-gray-600 mb-1"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Check-in: {guest.checkIn}
                              </p>
                              <p
                                className="text-gray-600"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                Preferences: {guest.preferences}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Service Requests */}
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle
                        className="text-xl font-medium text-[#191919] flex items-center"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                        Active Service Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            guest: "Alexandra Chen",
                            request: "Room service - champagne and strawberries",
                            priority: "High",
                            assignedTo: "Maria Santos",
                            timeRequested: "12 minutes ago",
                            status: "In Progress",
                            statusColor: "bg-orange-100 text-orange-800",
                          },
                          {
                            guest: "Marcus Rodriguez",
                            request: "Late checkout extension until 3 PM",
                            priority: "Medium",
                            assignedTo: "James Wilson",
                            timeRequested: "25 minutes ago",
                            status: "Approved",
                            statusColor: "bg-green-100 text-green-800",
                          },
                          {
                            guest: "Sarah Williams",
                            request: "Pet walking service for afternoon",
                            priority: "Medium",
                            assignedTo: "Lisa Chen",
                            timeRequested: "1 hour ago",
                            status: "Scheduled",
                            statusColor: "bg-blue-100 text-blue-800",
                          },
                          {
                            guest: "David Kim",
                            request: "Airport transfer booking for arrival",
                            priority: "High",
                            assignedTo: "Carlos Rodriguez",
                            timeRequested: "2 hours ago",
                            status: "Confirmed",
                            statusColor: "bg-green-100 text-green-800",
                          },
                        ].map((request, index) => (
                          <div key={index} className="p-4 border border-gray-100 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p
                                className="font-medium text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                {request.guest}
                              </p>
                              <Badge variant={request.priority === "High" ? "destructive" : "secondary"}>
                                {request.priority}
                              </Badge>
                            </div>
                            <p
                              className="text-sm text-gray-600 mb-2"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                            >
                              {request.request}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <div>
                                <p
                                  className="text-gray-500"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Assigned to: {request.assignedTo}
                                </p>
                                <p
                                  className="text-gray-500"
                                  style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                                >
                                  Requested: {request.timeRequested}
                                </p>
                              </div>
                              <Badge className={request.statusColor}>{request.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "ai-projections" &&
              renderPlaceholderContent(
                "AI Review Projections",
                "AI-powered predictive analytics for guest review trends and property performance forecasting",
                <Brain className="h-12 w-12 text-[#191919]" />,
              )}

            {activeTab === "custom-reports" && (
              <div className="space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2
                      className="text-4xl font-semibold text-[#191919] mb-3 tracking-tight"
                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                    >
                      Custom Report Upload
                    </h2>
                    <p
                      className="text-gray-600 text-lg leading-relaxed"
                      style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                    >
                      Upload and AI analyze site visit memos and reports to create RACI actions and Asana tickets
                      automatically
                    </p>
                  </div>

                  {/* Upload Section - Moved to top right */}
                  <Card className="border-gray-100 shadow-sm w-80">
                    <CardHeader>
                      <CardTitle
                        className="text-lg font-medium text-[#191919] flex items-center"
                        style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                      >
                        <Upload className="h-4 w-4 text-[#ffc9d2] mr-2" />
                        Upload New Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                        <p
                          className="text-sm font-medium text-[#191919] mb-2"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          Drop files here or click to upload
                        </p>
                        <p
                          className="text-xs text-gray-600 mb-3"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          PDF, Excel, CSV up to 10MB
                        </p>
                        <Button
                          size="sm"
                          className="bg-[#ffc9d2] text-[#191919] hover:bg-[#ffc9d2]/90 border-0"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          Choose Files
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* RACI Matrix Table */}
                <Card className="border-gray-100 shadow-sm overflow-hidden">
                  <CardHeader>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle
                            className="text-xl font-medium text-[#191919] flex items-center mb-2"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            <Building2 className="h-5 w-5 text-[#ffc9d2] mr-2" />
                            Berlin Drift - Facility Improvement RACI Matrix
                          </CardTitle>
                          <p
                            className="text-sm text-gray-600"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                          >
                            Berlin Kreuzberg • Executive Assessment Report • Uploaded: Today
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 text-[#191919] hover:bg-[#ffc9d2] hover:border-[#ffc9d2]"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          Download Report
                        </Button>
                      </div>

                      {/* RACI Legend - Horizontal layout */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4
                          className="text-sm font-medium text-[#191919] mb-3"
                          style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                        >
                          RACI Legend
                        </h4>
                        <div className="flex items-center space-x-8">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                              R
                            </div>
                            <div>
                              <p
                                className="text-xs font-semibold text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                Responsible
                              </p>
                              <p
                                className="text-xs text-gray-600"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Executes task
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-[#ffc9d2] rounded-full flex items-center justify-center text-[#191919] font-semibold text-xs">
                              A
                            </div>
                            <div>
                              <p
                                className="text-xs font-semibold text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                Accountable
                              </p>
                              <p
                                className="text-xs text-gray-600"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Owns outcome
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-[#87a1be] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                              C
                            </div>
                            <div>
                              <p
                                className="text-xs font-semibold text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                Consulted
                              </p>
                              <p
                                className="text-xs text-gray-600"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Provides input
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-[#b8c5d1] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                              I
                            </div>
                            <div>
                              <p
                                className="text-xs font-semibold text-[#191919]"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                              >
                                Informed
                              </p>
                              <p
                                className="text-xs text-gray-600"
                                style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 300 }}
                              >
                                Stays updated
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#191919]">
                          <th
                            className="text-left p-4 text-white font-semibold text-sm min-w-[350px]"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Task
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Timeline
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Effort
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            GM
                            <br />
                            <span className="text-xs font-normal opacity-80">Sarah Chen</span>
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Cluster
                            <br />
                            Manager
                            <br />
                            <span className="text-xs font-normal opacity-80">Marcus Weber</span>
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Regional
                            <br />
                            Manager
                            <br />
                            <span className="text-xs font-normal opacity-80">Lisa Rodriguez</span>
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Ops
                            <br />
                            Coordinator
                            <br />
                            <span className="text-xs font-normal opacity-80">James Wilson</span>
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Maintenance
                            <br />
                            <span className="text-xs font-normal opacity-80">Alex Mueller</span>
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            External
                            <br />
                            Partner
                            <br />
                            <span className="text-xs font-normal opacity-80">TechFix GmbH</span>
                          </th>
                          <th
                            className="text-center p-4 text-white font-semibold text-xs uppercase tracking-wider"
                            style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Asana Task
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {/* IMMEDIATE PRIORITY TASKS */}
                        <tr className="border-b border-gray-100 border-l-4 border-l-red-500">
                          <td className="p-4">
                            <span
                              className="font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Fix flashing stairway lighting (floors 2-3)
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">IMMEDIATE</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1">MEDIUM</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#ffc9d2] rounded-full flex items-center justify-center text-[#191919] font-semibold text-sm mx-auto">
                              A
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              R
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#b8c5d1] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              I
                            </div>
                          </td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              R
                            </div>
                          </td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs px-2 py-1 h-7 border-gray-300 hover:bg-gray-50"
                            >
                              View Task
                            </Button>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 border-l-4 border-l-red-500">
                          <td className="p-4">
                            <span
                              className="font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Fix flashing restaurant lights
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">IMMEDIATE</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1">MEDIUM</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#ffc9d2] rounded-full flex items-center justify-center text-[#191919] font-semibold text-sm mx-auto">
                              A
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              R
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#b8c5d1] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              I
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#87a1be] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              C
                            </div>
                          </td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              R
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs px-2 py-1 h-7 border-gray-300 hover:bg-gray-50"
                            >
                              View Task
                            </Button>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 border-l-4 border-l-red-500">
                          <td className="p-4">
                            <span
                              className="font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Deep clean breakfast area carpet & bathroom
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">IMMEDIATE</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">LOW</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#ffc9d2] rounded-full flex items-center justify-center text-[#191919] font-semibold text-sm mx-auto">
                              A
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#87a1be] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              C
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#b8c5d1] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              I
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#87a1be] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              C
                            </div>
                          </td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              R
                            </div>
                          </td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs px-2 py-1 h-7 border-gray-300 hover:bg-gray-50"
                            >
                              View Task
                            </Button>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 border-l-4 border-l-red-500">
                          <td className="p-4">
                            <span
                              className="font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Install basement light switch cover
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">IMMEDIATE</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">LOW</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#ffc9d2] rounded-full flex items-center justify-center text-[#191919] font-semibold text-sm mx-auto">
                              A
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              R
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#b8c5d1] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              I
                            </div>
                          </td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto">
                              R
                            </div>
                          </td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center"></td>
                          <td className="p-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs px-2 py-1 h-7 border-gray-300 hover:bg-gray-50"
                            >
                              View Task
                            </Button>
                          </td>
                        </tr>

                        {/* STANDARD PRIORITY TASKS */}
                        <tr className="border-b border-gray-100 border-l-4 border-l-yellow-500">
                          <td className="p-4">
                            <span
                              className="font-medium text-[#191919]"
                              style={{ fontFamily: "Lausanne, Helvetica, sans-serif", fontWeight: 600 }}
                            >
                              Replace broken gym equipment
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1">STANDARD</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1">MEDIUM</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 bg-[#ffc9d2] rounded-full flex items-center justify-center text-[#191919] font-semibold text-sm mx-auto">
                              A
                            </div>\
                          </td>
