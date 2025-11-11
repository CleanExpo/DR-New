import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Home, Clock, Ban, TrendingDown } from "lucide-react"

export function ProblemSection() {
  const problems = [
    {
      icon: Ban,
      title: "Wrong First Call = Lost Coverage",
      quote: "I called my brother-in-law first. Insurance denied my claim because I didn't follow proper procedures.",
      impact: "Claim Denied",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50/50",
      borderColor: "border-red-200",
    },
    {
      icon: AlertTriangle,
      title: "Wrong First Call = Wrong Contractor",
      quote:
        "The 'emergency' plumber I found online made it worse. Now I need a restoration company AND a new contractor.",
      impact: "Double Cost",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50/50",
      borderColor: "border-orange-200",
    },
    {
      icon: Clock,
      title: "Wrong First Call = Expensive Mistakes",
      quote: "I waited 3 days for quotes. The water damage spread. What started as $3,000 became $30,000.",
      impact: "10x Cost",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50/50",
      borderColor: "border-amber-200",
    },
    {
      icon: Home,
      title: "Wrong First Call = Claim Rejection",
      quote:
        "Insurance said I should have called them first. But they took 2 weeks to respond while mould grew everywhere.",
      impact: "Health Risk",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-200",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
            <TrendingDown className="h-4 w-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Common Mistakes</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Why Most People Make the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              Wrong First Call
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from homeowners who learned the hard way
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-16">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-2 ${problem.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${problem.color}`} />
              
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${problem.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <problem.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">{problem.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${problem.color} shadow-md`}>
                        {problem.impact}
                      </span>
                    </div>
                    <blockquote className="text-muted-foreground italic leading-relaxed text-base relative pl-4 border-l-2 border-muted">
                      "{problem.quote}"
                    </blockquote>
                  </div>
                </div>
              </CardContent>
              
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </Card>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-xl border border-slate-700">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              In disasters, the first decision determines everything that follows.
            </p>
            <p className="text-slate-300 text-lg mt-2">
              Make the right call from the start.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
