const BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Something went wrong');
  }

  return res.json();
}

export function getCareers({ q = '', category = '' } = {}) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (category) params.set('category', category);
  return request(`/api/careers?${params}`);
}

export function getCareerBySlug(slug) {
  return request(`/api/careers/${encodeURIComponent(slug)}`);
}

export function matchCareers(answers) {
  return request('/api/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  });
}