#include "vocabulary_profiler.h"

using namespace std;

double VocabularyProfiler::richness(
    const FeatureVector& features)
{
    return
        (
            features.vocabularyDiversity +
            features.typeTokenRatio +
            features.hapaxRatio +
            features.uniqueWordRatio
        ) / 4.0;
}

string VocabularyProfiler::level(
    const FeatureVector& features)
{
    double score = richness(features);

    if(score >= 0.85)
        return "Excellent";

    if(score >= 0.70)
        return "High";

    if(score >= 0.55)
        return "Moderate";

    if(score >= 0.40)
        return "Basic";

    return "Limited";
}