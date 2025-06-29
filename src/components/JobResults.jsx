import React from 'react'
import { Search, AlertCircle, Briefcase } from 'lucide-react'
import JobCard from './JobCard'
import { Card, CardContent } from '@/components/ui/card'

const JobResults = ({ jobs, isLoading, error, onJobSelect, searchParams }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2 text-visible">Searching for Jobs...</h3>
          <p className="text-muted-visible">
            Scanning {searchParams?.sources?.join(', ')} for "{searchParams?.search_term}"
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="border-destructive">
          <CardContent className="p-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-destructive mb-2">Search Error</h3>
              <p className="text-muted-visible">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-visible">No Jobs Found</h3>
              <p className="text-muted-visible">
                Try adjusting your search criteria or expanding your location range.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Group jobs by source for better organization
  const jobsBySource = jobs.reduce((acc, job) => {
    const source = job.site || 'Unknown'
    if (!acc[source]) {
      acc[source] = []
    }
    acc[source].push(job)
    return acc
  }, {})

  const totalJobs = jobs.length
  const sourceCount = Object.keys(jobsBySource).length

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-visible">
            Found {totalJobs} jobs from {sourceCount} source{sourceCount !== 1 ? 's' : ''}
          </h2>
        </div>
        {searchParams && (
          <div className="text-sm text-muted-visible">
            Searching for "{searchParams.search_term}"
            {searchParams.location && ` in ${searchParams.location}`}
          </div>
        )}
      </div>

      {/* Source Breakdown */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(jobsBySource).map(([source, sourceJobs]) => (
          <div key={source} className="text-xs bg-muted px-2 py-1 rounded text-visible">
            {source}: {sourceJobs.length} job{sourceJobs.length !== 1 ? 's' : ''}
          </div>
        ))}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <JobCard
            key={`${job.site}-${job.id || index}`}
            job={job}
            onViewDetails={onJobSelect}
          />
        ))}
      </div>

      {/* Load More Hint */}
      {totalJobs >= 20 && (
        <div className="text-center py-6">
          <p className="text-muted-visible text-sm">
            Showing {totalJobs} results. Refine your search for more specific results.
          </p>
        </div>
      )}
    </div>
  )
}

export default JobResults
