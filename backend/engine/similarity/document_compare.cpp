#include "document_compare.h"
#include "cosine_similarity.h"

#include <vector>

using namespace std;

double DocumentCompare::compare(
    const FeatureVector& first,
    const FeatureVector& second)
{
    vector<double> a =
    {
        first.lexicalDensity,
        first.wordEntropy,
        first.averageSentenceLength,
        first.burstiness,
        first.transitionDensity,
        first.aiPhraseDensity,
        first.rhythmConsistency,
        first.fleschReadingEase,
        first.templateSimilarity
    };

    vector<double> b =
    {
        second.lexicalDensity,
        second.wordEntropy,
        second.averageSentenceLength,
        second.burstiness,
        second.transitionDensity,
        second.aiPhraseDensity,
        second.rhythmConsistency,
        second.fleschReadingEase,
        second.templateSimilarity
    };

    return CosineSimilarity::compute(a, b);
}