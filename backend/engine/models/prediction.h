#ifndef PREDICTION_H
#define PREDICTION_H

#include <string>
#include <vector>

struct Prediction
{
    //------------------------------------
    // Final Decision
    //------------------------------------
    std::string verdict;

    //------------------------------------
    // Probabilities
    //------------------------------------
    double humanProbability = 0.0;
    double aiProbability = 0.0;

    //------------------------------------
    // Confidence
    //------------------------------------
    double confidence = 0.0;
    double reliability = 0.0;
    std::string reliabilityGrade;

    //------------------------------------
    // Individual Engine Scores
    //------------------------------------
    double stylometricScore = 0.0;
    double statisticalScore = 0.0;
    double readabilityScore = 0.0;
    double fingerprintScore = 0.0;
    double similarityScore = 0.0;

    //------------------------------------
    // AI Model Similarities
    //------------------------------------
    double gptSimilarity = 0.0;
    double claudeSimilarity = 0.0;
    double geminiSimilarity = 0.0;
    double deepseekSimilarity = 0.0;
    double copilotSimilarity = 0.0;
    double mistralSimilarity = 0.0;
    double llamaSimilarity = 0.0;

    //------------------------------------
    // Explainability
    //------------------------------------
    std::vector<std::string> evidence;

    //------------------------------------
    // Recommendation
    //------------------------------------
    std::string recommendation;
};

#endif