import React, { useState } from 'react'
import { Search, MapPin, Briefcase, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const SearchForm = ({ onSearch, isLoading }) => {
  const [searchParams, setSearchParams] = useState({
    search_term: '',
    location: '',
    sources: ['indeed', 'linkedin', 'naukri'],
    job_type: 'any',
    posted_date: 'any',
    limit: 5
  })

  const handleSourceChange = (source, checked) => {
    setSearchParams(prev => ({
      ...prev,
      sources: checked 
        ? [...prev.sources, source]
        : prev.sources.filter(s => s !== source)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchParams.search_term.trim()) {
      alert('Please enter a search term')
      return
    }
    if (searchParams.sources.length === 0) {
      alert('Please select at least one job source')
      return
    }

    // Convert "any" values to empty strings for backend compatibility
    const processedParams = {
      ...searchParams,
      job_type: searchParams.job_type === 'any' ? '' : searchParams.job_type
    }

    onSearch(processedParams)
  }

  const jobSources = [
    { id: 'indeed', name: 'Indeed', color: 'bg-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-600' },
    { id: 'naukri', name: 'Naukri', color: 'bg-purple-500' },
    { id: 'foundit', name: 'Foundit', color: 'bg-green-500' },
    { id: 'dice', name: 'Dice', color: 'bg-cyan-500' }
  ]

  return (
    <Card className="w-full max-w-5xl mx-auto gradient-card shadow-premium-lg border-premium animate-slide-up">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Search Term and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-visible">
                <Search className="h-4 w-4" />
                Job Title or Keywords
              </label>
              <Input
                placeholder="e.g., Software Engineer, Data Scientist"
                value={searchParams.search_term}
                onChange={(e) => setSearchParams(prev => ({ ...prev, search_term: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-visible">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <Input
                placeholder="e.g., San Francisco, CA"
                value={searchParams.location}
                onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>

          {/* Job Sources */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-visible">Job Sources</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {jobSources.map((source) => (
                <div key={source.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={source.id}
                    checked={searchParams.sources.includes(source.id)}
                    onCheckedChange={(checked) => handleSourceChange(source.id, checked)}
                  />
                  <label
                    htmlFor={source.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 text-visible"
                  >
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    {source.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-visible">
                <Briefcase className="h-4 w-4" />
                Job Type
              </label>
              <Select value={searchParams.job_type} onValueChange={(value) => setSearchParams(prev => ({ ...prev, job_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="fulltime">Full Time</SelectItem>
                  <SelectItem value="parttime">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-visible">
                <Calendar className="h-4 w-4" />
                Posted Date
              </label>
              <Select value={searchParams.posted_date} onValueChange={(value) => setSearchParams(prev => ({ ...prev, posted_date: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="1day">Last 24 hours</SelectItem>
                  <SelectItem value="3days">Last 3 days</SelectItem>
                  <SelectItem value="1week">Last week</SelectItem>
                  <SelectItem value="2weeks">Last 2 weeks</SelectItem>
                  <SelectItem value="1month">Last month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-visible">Results per Source</label>
              <Select value={searchParams.limit.toString()} onValueChange={(value) => setSearchParams(prev => ({ ...prev, limit: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 jobs</SelectItem>
                  <SelectItem value="10">10 jobs</SelectItem>
                  <SelectItem value="15">15 jobs</SelectItem>
                  <SelectItem value="20">20 jobs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-12 py-3 text-lg gradient-primary shadow-premium-xl hover:shadow-premium-xl font-semibold transition-all duration-300 hover:scale-105"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Searching Jobs...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-3" />
                  Search Jobs
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SearchForm
