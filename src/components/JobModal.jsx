import React from 'react'
import { MapPin, Calendar, Briefcase, DollarSign, ExternalLink, Building, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, cleanDescription, normalizeSkills } from '@/lib/utils'

const JobModal = ({ job, isOpen, onClose }) => {
  if (!job) return null

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gradient-card shadow-premium-xl border-premium max-w-5xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold leading-tight mb-2 text-visible">
                {job.title || 'Job Title Not Available'}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-muted-visible mb-3">
                <Building className="h-5 w-5" />
                <span className="text-lg">{job.company || 'Company Not Specified'}</span>
              </DialogDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={`${getSourceBadgeColor(job.site)} text-white`}>
                {job.site}
              </Badge>
              {getJobTypeBadge(job.job_type)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Meta Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-visible">{job.location}</span>
              </div>
            )}
            {job.date_posted_formatted && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-visible">{job.date_posted_formatted}</span>
              </div>
            )}
            {job.job_type && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-visible">{job.job_type}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-green-400">{job.salary}</span>
              </div>
            )}
          </div>

          {/* Experience */}
          {(job.experience || job.experience_range) && (
            <div>
              <h3 className="text-accent-foreground text-lg font-semibold mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experience Required
              </h3>
              <p className="text-muted-foreground">{job.experience || job.experience_range}</p>
            </div>
          )}

          {/* Skills */}
          {(() => {
            const skills = normalizeSkills(job.skills)
            return skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-visible">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Job Description */}
          {job.description && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-visible">Job Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-visible leading-relaxed whitespace-pre-wrap">
                  {cleanDescription(job.description)}
                </p>
              </div>
            </div>
          )}

          {/* Company Information */}
          {(job.company_url || job.company_logo) && (
            <div>
              <h3 className="text-accent-foreground text-lg font-semibold mb-3">Company Information</h3>
              <div className="text-muted-visible flex items-center gap-4">
                {job.company_logo && (
                  <img 
                    src={job.company_logo} 
                    alt={`${job.company} logo`}
                    className="w-16 h-16 object-contain rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                )}
                <div>
                  <p className="font-medium">{job.company}</p>
                  {job.company_url && (
                    <a 
                      href={job.company_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Visit Company Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {job.job_url && (
              <Button 
                className="flex-1"
                onClick={() => window.open(job.job_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply for this Job
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={onClose}
              className="bg-muted text-accent-foreground px-6"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default JobModal
