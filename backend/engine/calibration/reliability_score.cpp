#include "reliability_score.h"

#include <algorithm>

using namespace std;

double ReliabilityScore::calculate(
    const FeatureVector& f)
{
    double readability =
        f.readabilityScore;

    readability =
        max(0.0, min(100.0, readability));

    readability /= 100.0;

    double score = 0.0;

    score += max(
        0.0,
        min(1.0, f.stylometricScore)
    );

    score += max(
        0.0,
        min(1.0, f.fingerprintScore)
    );

    score += max(
        0.0,
        min(1.0, f.similarityScore)
    );

    score += max(
        0.0,
        min(1.0, f.statisticalScore)
    );

    score += readability;

    return score / 5.0;
}