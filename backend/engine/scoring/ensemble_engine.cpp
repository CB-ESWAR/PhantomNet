#include "ensemble_engine.h"

using namespace std;

double EnsembleEngine::combine(
    const FeatureVector& features,
    double fingerprintScore,
    double similarityScore,
    double reliabilityScore)
{
    double score = 0.0;

    score += features.stylometricScore * 0.20;

    score += features.statisticalScore * 0.15;

    score += features.readabilityScore * 0.10;

    score += fingerprintScore * 0.35;

    score += similarityScore * 0.10;

    score += reliabilityScore * 0.10;

    return max(
        0.0,
        min(1.0, score)
    );
}