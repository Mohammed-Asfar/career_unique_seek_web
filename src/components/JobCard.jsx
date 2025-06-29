import React from 'react'
import { MapPin, Calendar, Briefcase, DollarSign, ExternalLink, Building } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, truncateText, cleanDescription, normalizeSkills } from '@/lib/utils'

const JobCard = ({ job, onViewDetails }) => {
  const getSourceBadgeColor = (source) => {
    const colors = {
      'Indeed': 'bg-blue-500',
      'LinkedIn': 'bg-blue-600', 
      'Naukri': 'bg-purple-500',
      'Foundit': 'bg-green-500',
      'Dice': 'bg-cyan-500'
    }
    return colors[source] || 'bg-gray-500'
  }

  const getJobTypeBadge = (jobType) => {
    if (!jobType || jobType === 'any') return null

    const colors = {
      'fulltime': 'bg-green-100 text-green-800',
      'parttime': 'bg-blue-100 text-blue-800',
      'contract': 'bg-orange-100 text-orange-800',
      'internship': 'bg-purple-100 text-purple-800',
      'temporary': 'bg-gray-100 text-gray-800'
    }

    const labels = {
      'fulltime': 'Full Time',
      'parttime': 'Part Time',
      'contract': 'Contract',
      'internship': 'Internship',
      'temporary': 'Temporary'
    }

    return (
      <Badge className={colors[jobType] || 'bg-gray-100 text-gray-800'}>
        {labels[jobType] || jobType}
      </Badge>
    )
  }

  return (
    <Card className="gradient-card border-premium shadow-premium hover-lift cursor-pointer animate-fade-in group" onClick={() => onViewDetails(job)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {job.title || 'Job Title Not Available'}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <div className="p-1 rounded-full bg-secondary/20">
                <Building className="h-4 w-4 flex-shrink-0" />
              </div>
              <span className="truncate font-medium">{job.company || 'Company Not Specified'}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={`${getSourceBadgeColor(job.site)} text-white shadow-sm hover:shadow-md transition-shadow duration-200`}>
              {job.site}
            </Badge>
            {getJobTypeBadge(job.job_type)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Job Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          {job.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-1 rounded-full bg-secondary/20">
                <MapPin className="h-3 w-3" />
              </div>
              <span className="font-medium">{job.location}</span>
            </div>
          )}
          {job.date_posted_formatted && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-1 rounded-full bg-secondary/20">
                <Calendar className="h-3 w-3" />
              </div>
              <span className="font-medium">{job.date_posted_formatted}</span>
            </div>
          )}
          {(job.experience || job.experience_range) && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-1 rounded-full bg-secondary/20">
                <Briefcase className="h-3 w-3" />
              </div>
              <span className="font-medium">{job.experience || job.experience_range}</span>
            </div>
          )}
          {job.salary && (
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-900/30 border border-green-500/30">
                <DollarSign className="h-3 w-3 text-green-400" />
              </div>
              <span className="font-semibold text-green-300 bg-green-900/20 border border-green-500/30 px-3 py-1 rounded-full text-xs">
                {job.salary}
              </span>
            </div>
          )}
        </div>

        {/* Job Description */}
        {job.description && (
          <div className="text-sm text-muted-foreground mb-4 bg-dark-elevated p-4 rounded-lg border-l-4 border-primary/40 shadow-premium">
            <p className="line-clamp-3 leading-relaxed">
              {truncateText(cleanDescription(job.description), 200)}
            </p>
          </div>
        )}

        {/* Skills */}
        {(() => {
          const skills = normalizeSkills(job.skills)
          return skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs font-medium bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors duration-200">
                    +{skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )
        })()}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-secondary/30">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 font-medium btn-dark-outline hover:dark-glow transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails(job)
            }}
          >
            View Details
          </Button>
          {job.job_url && (
            <Button
              size="sm"
              className="flex-1 gradient-primary shadow-premium hover:shadow-premium-lg hover:dark-glow transition-all duration-300 font-medium"
              onClick={(e) => {
                e.stopPropagation()
                window.open(job.job_url, '_blank')
              }}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard
