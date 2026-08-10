#include "cosine_similarity.h"

#include <cmath>

using namespace std;

double CosineSimilarity::compute(
    const vector<double>& a,
    const vector<double>& b)
{
    if(a.empty() || b.empty())
        return 0.0;

    if(a.size() != b.size())
        return 0.0;

    double dot = 0.0;
    double normA = 0.0;
    double normB = 0.0;

    for(size_t i = 0; i < a.size(); i++)
    {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    if(normA == 0.0 || normB == 0.0)
        return 0.0;

    return dot / (sqrt(normA) * sqrt(normB));
}