#ifndef DASHBOARD_DATA_H
#define DASHBOARD_DATA_H

#include "../models/prediction.h"

#include <vector>
#include <string>

struct DashboardData
{
    double aiProbability = 0.0;
    double humanProbability = 0.0;

    double confidence = 0.0;
    double reliability = 0.0;

    double stylometricScore = 0.0;
    double statisticalScore = 0.0;
    double readabilityScore = 0.0;
    double fingerprintScore = 0.0;
    double similarityScore = 0.0;

    double gptSimilarity = 0.0;
    double claudeSimilarity = 0.0;
    double geminiSimilarity = 0.0;
    double deepseekSimilarity = 0.0;
    double copilotSimilarity = 0.0;
    double mistralSimilarity = 0.0;
    double llamaSimilarity = 0.0;

    std::vector<std::string> evidence;

    std::string recommendation;
};

#endif