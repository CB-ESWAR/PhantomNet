#include "graph_generator.h"

DashboardData GraphGenerator::generate(
    const Prediction& prediction)
{
    DashboardData data;

    data.aiProbability = prediction.aiProbability;
    data.humanProbability = prediction.humanProbability;

    data.confidence = prediction.confidence;
    data.reliability = prediction.reliability;

    data.stylometricScore = prediction.stylometricScore;
    data.statisticalScore = prediction.statisticalScore;
    data.readabilityScore = prediction.readabilityScore;
    data.fingerprintScore = prediction.fingerprintScore;
    data.similarityScore = prediction.similarityScore;

    data.gptSimilarity = prediction.gptSimilarity;
    data.claudeSimilarity = prediction.claudeSimilarity;
    data.geminiSimilarity = prediction.geminiSimilarity;
    data.deepseekSimilarity = prediction.deepseekSimilarity;
    data.copilotSimilarity = prediction.copilotSimilarity;
    data.mistralSimilarity = prediction.mistralSimilarity;
    data.llamaSimilarity = prediction.llamaSimilarity;

    data.evidence = prediction.evidence;

    data.recommendation =
        prediction.recommendation;

    return data;
}