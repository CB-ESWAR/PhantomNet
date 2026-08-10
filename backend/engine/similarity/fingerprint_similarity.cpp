#include "fingerprint_similarity.h"
#include "document_compare.h"

using namespace std;

namespace
{

FeatureVector createProfile(
    double lexicalDensity,
    double wordEntropy,
    double averageSentenceLength,
    double burstiness,
    double transitionDensity,
    double aiPhraseDensity,
    double rhythmConsistency,
    double fleschReadingEase,
    double templateSimilarity)
{
    FeatureVector f;

    f.lexicalDensity = lexicalDensity;
    f.wordEntropy = wordEntropy;
    f.averageSentenceLength = averageSentenceLength;
    f.burstiness = burstiness;
    f.transitionDensity = transitionDensity;
    f.aiPhraseDensity = aiPhraseDensity;
    f.rhythmConsistency = rhythmConsistency;
    f.fleschReadingEase = fleschReadingEase;
    f.templateSimilarity = templateSimilarity;

    return f;
}

}

double FingerprintSimilarity::compareHuman(
    const FeatureVector& features)
{
    return DocumentCompare::compare(
        features,
        createProfile(
            0.72,6.10,19.0,0.44,
            0.08,0.04,0.55,
            70.0,0.10
        )
    );
}

double FingerprintSimilarity::compareGPT(
    const FeatureVector& features)
{
    return DocumentCompare::compare(
        features,
        createProfile(
            0.86,6.90,24.0,0.18,
            0.32,0.28,0.90,
            84.0,0.82
        )
    );
}

double FingerprintSimilarity::compareClaude(
    const FeatureVector& features)
{
    return DocumentCompare::compare(
        features,
        createProfile(
            0.82,6.80,22.0,0.25,
            0.24,0.21,0.82,
            79.0,0.65
        )
    );
}

double FingerprintSimilarity::compareGemini(
    const FeatureVector& features)
{
    return DocumentCompare::compare(
        features,
        createProfile(
            0.81,6.75,21.0,0.27,
            0.22,0.20,0.79,
            81.0,0.60
        )
    );
}

double FingerprintSimilarity::compareDeepSeek(
    const FeatureVector& features)
{
    return DocumentCompare::compare(
        features,
        createProfile(
            0.83,6.70,22.0,0.22,
            0.25,0.19,0.81,
            78.0,0.58
        )
    );
}

double FingerprintSimilarity::compareLlama(
    const FeatureVector& features)
{
    return DocumentCompare::compare(
        features,
        createProfile(
            0.79,6.60,20.0,0.30,
            0.20,0.18,0.75,
            76.0,0.55
        )
    );
}