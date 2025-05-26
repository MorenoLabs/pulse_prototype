import { Download, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  {
    title: "Total Revenue",
    description: "Total revenue generated this month",
    amount: "$240,000",
    change: "+12%",
    type: "revenue",
  },
  {
    title: "Profit Margin",
    description: "Overall profit margin this month",
    amount: "24%",
    change: "-4%",
    type: "margin",
  },
  {
    title: "New Customers",
    description: "Number of new customers acquired this month",
    amount: "124",
    change: "+22%",
    type: "customers",
  },
]

const GmCenterPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">COO Center</h1>
          <p className="text-muted-foreground">
            Financial performance and operational insights for chief operating officers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.amount}</div>
              <div className="text-sm text-muted-foreground">{card.change} from last month</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default GmCenterPage
