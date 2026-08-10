#include "similarity.h"
#include "fingerprint_similarity.h"

#include <algorithm>

using namespace std;

double Similarity::humanSimilarity(
    const FeatureVector& features)
{
    return FingerprintSimilarity::compareHuman(features);
}

double Similarity::aiSimilarity(
    const FeatureVector& features)
{
    double gpt =
        FingerprintSimilarity::compareGPT(features);

    double claude =
        FingerprintSimilarity::compareClaude(features);

    double gemini =
        FingerprintSimilarity::compareGemini(features);

    double deepseek =
        FingerprintSimilarity::compareDeepSeek(features);

    double llama =
        FingerprintSimilarity::compareLlama(features);

    double maximum = gpt;

    maximum = std::max(maximum, claude);
    maximum = std::max(maximum, gemini);
    maximum = std::max(maximum, deepseek);
    maximum = std::max(maximum, llama);

    return maximum;
}