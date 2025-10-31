'use client';

import { Trophy, TrendingUp, TrendingDown, MapPin, Users, GraduationCap, Building2, Calendar, ExternalLink, Info } from 'lucide-react';

interface ComparisonData {
  success: boolean;
  comparison: Array<{
    college_name: string;
    score: number;
    ranking?: number;
    strengths: string[];
    weaknesses: string[];
    data: {
      city: string;
      state: string;
      type: string;
      established: number;
      university: string;
      campus_size: string;
      total_students: number;
      total_faculty: number;
      student_faculty_ratio: number | null;
      fees: number;
      rating: number;
      facilities: string;
      courses: string;
      google_maps: string;
    };
    quota_insights?: {
      category: string;
      applicable_quotas: string[];
      fee_benefits: string[];
      admission_notes: string[];
    };
  }>;
  recommendation?: string;
  personalization_applied?: boolean;
  user_category?: string;
  metadata: {
    total_colleges: number;
    features_compared: string[];
  };
}

interface ComparisonResultsProps {
  data: ComparisonData;
}

export function ComparisonResults({ data }: ComparisonResultsProps) {
  if (!data.success || !data.comparison) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-green-600 dark:text-green-400';
    if (score >= 6.5) return 'text-blue-600 dark:text-blue-400';
    if (score >= 5.0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-muted-foreground';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8.0) return 'bg-green-100 dark:bg-green-950/30';
    if (score >= 6.5) return 'bg-blue-100 dark:bg-blue-950/30';
    if (score >= 5.0) return 'bg-yellow-100 dark:bg-yellow-950/30';
    return 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Recommendation Banner */}
      {data.recommendation && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Trophy className="text-primary mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Recommendation
              </h3>
              <p className="text-foreground">{data.recommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {data.comparison.map((college, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-3 flex-1">
                {index === 0 && (
                  <Trophy className="text-primary flex-shrink-0 mt-1" size={24} />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-foreground break-words">
                    {college.college_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    <span>{college.data.city}, {college.data.state}</span>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full flex-shrink-0 ml-2 ${getScoreBgColor(college.score)}`}>
                <span className={`text-xl font-bold ${getScoreColor(college.score)}`}>
                  {college.score.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                <Building2 size={16} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-semibold text-foreground truncate" title={college.data.type}>
                    {college.data.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                <Calendar size={16} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Established</p>
                  <p className="text-sm font-semibold text-foreground">
                    {college.data.established || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                <Users size={16} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Students</p>
                  <p className="text-sm font-semibold text-foreground">
                    {college.data.total_students || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                <GraduationCap size={16} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Faculty</p>
                  <p className="text-sm font-semibold text-foreground">
                    {college.data.total_faculty || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Student-Faculty Ratio */}
            {college.data.student_faculty_ratio && (
              <div className="mb-4 p-3 bg-accent/30 border border-accent/40 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Student-Faculty Ratio</p>
                    <p className="text-lg font-bold text-foreground">
                      {college.data.student_faculty_ratio}:1
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {college.data.student_faculty_ratio < 15 ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold">Excellent</span>
                      ) : college.data.student_faculty_ratio < 20 ? (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Good</span>
                      ) : college.data.student_faculty_ratio < 25 ? (
                        <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Average</span>
                      ) : (
                        <span className="text-muted-foreground font-semibold">High</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quota Insights */}
            {college.quota_insights && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
                <div className="flex items-start gap-2 mb-3">
                  <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={16} />
                  <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                    Personalized for {college.quota_insights.category} Category
                  </h4>
                </div>
                
                <div className="space-y-2 text-sm">
                  {college.quota_insights.applicable_quotas.length > 0 && (
                    <div>
                      <span className="font-medium text-blue-800 dark:text-blue-200">Quota:</span>
                      <ul className="mt-1 space-y-1">
                        {college.quota_insights.applicable_quotas.map((quota, i) => (
                          <li key={i} className="text-blue-700 dark:text-blue-300 ml-4">• {quota}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {college.quota_insights.fee_benefits.length > 0 && (
                    <div>
                      <span className="font-medium text-blue-800 dark:text-blue-200">Fee Benefits:</span>
                      <ul className="mt-1 space-y-1">
                        {college.quota_insights.fee_benefits.map((benefit, i) => (
                          <li key={i} className="text-blue-700 dark:text-blue-300 ml-4">• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {college.quota_insights.admission_notes.length > 0 && (
                    <div>
                      <span className="font-medium text-blue-800 dark:text-blue-200">Important Notes:</span>
                      <ul className="mt-1 space-y-1">
                        {college.quota_insights.admission_notes.map((note, i) => (
                          <li key={i} className="text-blue-700 dark:text-blue-300 ml-4">• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Strengths and Weaknesses */}
            <div className="space-y-3 mb-4">
              {college.strengths.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-green-600 dark:text-green-400" size={16} />
                    <h4 className="font-semibold text-sm text-foreground">Strengths</h4>
                  </div>
                  <ul className="space-y-1">
                    {college.strengths.map((strength, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {college.weaknesses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="text-destructive" size={16} />
                    <h4 className="font-semibold text-sm text-foreground">Considerations</h4>
                  </div>
                  <ul className="space-y-1">
                    {college.weaknesses.map((weakness, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-destructive">!</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Google Maps Link */}
            {college.data.google_maps && (
              <a
                href={college.data.google_maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <MapPin size={14} />
                View on Google Maps
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
        Compared {data.metadata.total_colleges} colleges • Data sourced from official Maharashtra college database
      </div>
    </div>
  );
}


