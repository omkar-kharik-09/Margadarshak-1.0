'use client';

import { useState } from 'react';

interface College {
  institute: string;
  program: string;
  category: string;
  closingRank: number;
  state: string;
  collegeBranch: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  filters: {
    rank: number;
    category: string;
    gender: string;
    state: string;
  };
  eligibleColleges: College[];
  error?: string;
  message?: string;
}

export default function CollegePredictorPage() {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('Open');
  const [gender, setGender] = useState('Male');
  const [state, setState] = useState('Maharashtra');
  const [topN, setTopN] = useState('50');
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<ApiResponse['filters'] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setColleges([]);
    setFilters(null);

    try {
      const response = await fetch('/api/predict-colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rank: parseInt(rank),
          category,
          gender,
          state: state.trim() || undefined,
          top_n: parseInt(topN),
        }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setColleges(data.eligibleColleges);
        setFilters(data.filters);
      } else {
        setError(data.message || 'Failed to fetch colleges');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          MHT-CET College Predictor
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-2">
                  MHT-CET Rank <span className="text-red-500">*</span>
                </label>
                <input
                  id="rank"
                  type="number"
                  placeholder="e.g., 25000"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min="1"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Open">Open</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="VJ">VJ</option>
                  <option value="NT">NT</option>
                </select>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State (Optional)
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="e.g., Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="topN" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Results
                </label>
                <input
                  id="topN"
                  type="number"
                  placeholder="e.g., 50"
                  value={topN}
                  onChange={(e) => setTopN(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
            >
              {loading ? 'Searching...' : 'Find Eligible Colleges'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
            <strong>Error:</strong> {error}
          </div>
        )}

        {filters && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-4">
            <p className="text-sm">
              <strong>Filters Applied:</strong> Rank: {filters.rank} | Category: {filters.category} | 
              Gender: {filters.gender} | State: {filters.state}
            </p>
          </div>
        )}

        {colleges.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Found {colleges.length} Eligible Colleges
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institute
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Closing Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {colleges.map((college, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {college.institute}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {college.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {college.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {college.closingRank.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {college.state}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && colleges.length === 0 && filters && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
            <p>No eligible colleges found with the given criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

