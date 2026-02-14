// Extract keywords based on industry/sector/technology
export function extractKeywords(description, title, speakers = []) {
    if (!description && !title) return [];

    const text = `${title || ''} ${description || ''} ${speakers.join(' ')}`.toLowerCase();

    // Define keyword categories by domain/industry/technology
    const keywordMap = {
        // Core AI Technologies
        'AI Agents': ['agent', 'agentic', 'autonomous', 'multi-agent', 'llm agent'],
        'Machine Learning': ['machine learning', 'ml model', 'deep learning', 'neural network', 'training', 'inference'],
        'Natural Language': ['nlp', 'language model', 'llm', 'translation', 'multilingual', 'speech', 'voice', 'bhashini'],
        'Computer Vision': ['computer vision', 'image', 'video', 'visual', 'recognition', 'detection'],
        'Generative AI': ['generative', 'gen ai', 'chatgpt', 'gpt', 'synthetic', 'content generation'],

        // Industry Sectors
        'Healthcare': ['health', 'medical', 'hospital', 'clinical', 'patient', 'diagnosis', 'disease', 'pharma', 'medicine'],
        'Education': ['education', 'learning', 'student', 'university', 'school', 'teaching', 'curriculum', 'skill'],
        'Agriculture': ['agricult', 'farm', 'crop', 'soil', 'rural', 'food security', 'agritech'],
        'Finance': ['financ', 'banking', 'payment', 'credit', 'investment', 'fintech', 'trading'],
        'Manufacturing': ['manufactur', 'industry', 'factory', 'production', 'supply chain', 'logistics'],
        'Transportation': ['transport', 'mobility', 'vehicle', 'road', 'traffic', 'automotive'],

        // Cross-cutting Themes
        'Governance': ['governance', 'policy', 'regulat', 'government', 'public sector', 'civic', 'compliance'],
        'Ethics & Safety': ['ethic', 'responsible', 'safety', 'trust', 'fairness', 'bias', 'transparency', 'accountability'],
        'Data & Privacy': ['data', 'privacy', 'security', 'protection', 'gdpr', 'personal data'],
        'Infrastructure': ['infrastructure', 'compute', 'cloud', 'data center', 'hardware', 'chip', 'gpu'],
        'Research': ['research', 'academic', 'university', 'lab', 'scientist', 'publication', 'innovation'],

        // Application Areas
        'Climate & Sustainability': ['climate', 'sustainability', 'environment', 'carbon', 'energy', 'green', 'circular'],
        'Social Impact': ['inclusion', 'equity', 'accessibility', 'disability', 'rural', 'underserved', 'empowerment'],
        'Digital Public Goods': ['dpi', 'digital public', 'open source', 'commons', 'public infrastructure'],
        'Skilling & Workforce': ['skill', 'workforce', 'employment', 'job', 'talent', 'training', 'upskill', 'reskill'],

        // Emerging Areas
        'Startups & Innovation': ['startup', 'entrepreneur', 'venture', 'innovation', 'ecosystem'],
        'Global South': ['global south', 'developing', 'emerging market', 'africa', 'asia', 'south-south']
    };

    const matched = [];
    for (const [keyword, patterns] of Object.entries(keywordMap)) {
        for (const pattern of patterns) {
            if (text.includes(pattern)) {
                matched.push(keyword);
                break; // Only add once per keyword category
            }
        }
    }

    // Return up to 5 most relevant keywords
    return matched.slice(0, 5);
}
