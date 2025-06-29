import React, { useState } from 'react'
import { Briefcase, Search, Users, TrendingUp, ExternalLink } from 'lucide-react'
import { Card, CardContent } from './components/ui/card'
import SearchForm from './components/SearchForm'
import JobResults from './components/JobResults'
import JobModal from './components/JobModal'

const API_BASE_URL = 'http://127.0.0.1:8080'

function App() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [searchParams, setSearchParams] = useState(null)

  const handleSearch = async (params) => {
    setIsLoading(true)
    setError(null)
    setSearchParams(params)

    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (err) {
      setError(err.message || 'Failed to search jobs. Please try again.')
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobSelect = (job) => {
    setSelectedJob(job)
  }

  const handleCloseModal = () => {
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-premium-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-lg shadow-premium">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-premium dark-text-glow">Career Unique Seek</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          {!jobs.length && !isLoading && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight text-premium dark-text-glow">
                  Search Jobs Across Multiple Platforms
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Find opportunities from Indeed, LinkedIn, Naukri, Foundit, and Dice all in one place
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="gradient-card shadow-premium hover-lift border-premium hover:dark-border-glow">
                  <CardContent className="p-8 text-center">
                    <div className="p-3 gradient-primary rounded-xl w-fit mx-auto mb-4 shadow-premium dark-glow">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-premium mb-2 dark-text-glow">5+</div>
                    <div className="text-sm text-muted-foreground font-medium">Job Platforms</div>
                  </CardContent>
                </Card>
                <Card className="gradient-card shadow-premium hover-lift border-premium hover:dark-border-glow">
                  <CardContent className="p-8 text-center">
                    <div className="p-3 gradient-primary rounded-xl w-fit mx-auto mb-4 shadow-premium dark-glow">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-premium mb-2 dark-text-glow">1000+</div>
                    <div className="text-sm text-muted-foreground font-medium">Companies</div>
                  </CardContent>
                </Card>
                <Card className="gradient-card shadow-premium hover-lift border-premium hover:dark-border-glow">
                  <CardContent className="p-8 text-center">
                    <div className="p-3 gradient-primary rounded-xl w-fit mx-auto mb-4 shadow-premium dark-glow">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-premium mb-2 dark-text-glow">Real-time</div>
                    <div className="text-sm text-muted-foreground font-medium">Job Updates</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Search Form */}
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {/* Results */}
          <JobResults
            jobs={jobs}
            isLoading={isLoading}
            error={error}
            onJobSelect={handleJobSelect}
            searchParams={searchParams}
          />
        </div>
      </main>

      {/* Job Details Modal */}
      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <footer className="border-t bg-card mt-20 shadow-premium-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 gradient-primary rounded-lg shadow-premium dark-glow">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-premium dark-text-glow">Career Unique Seek</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <a
                href="https://github.com/Mohammed-Asfar/career_unique_seek_web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 hover:dark-glow"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="font-medium">View on GitHub</span>
              </a>
            </div>
            <p className="text-muted-foreground font-medium">
              &copy; 2024 Career Unique Seek. Powered by multiple job platforms.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
