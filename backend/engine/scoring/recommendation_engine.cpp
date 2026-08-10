#include "recommendation_engine.h"

using namespace std;

string RecommendationEngine::generate(
    const Prediction& prediction)
{
    if(prediction.aiProbability >= 90)
    {
        return
        "Strongly recommend manual review before submission.";
    }

    if(prediction.aiProbability >= 70)
    {
        return
        "Review suspicious sections of the document.";
    }

    if(prediction.aiProbability >= 50)
    {
        return
        "Mixed writing characteristics detected.";
    }

    return
    "Writing appears predominantly human.";
}