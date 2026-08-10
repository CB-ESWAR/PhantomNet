#include "heatmap.h"

using namespace std;

vector<vector<double>> HeatMap::generate(
    const DashboardData& data)
{
    return
    {
        {
            data.gptSimilarity,
            data.claudeSimilarity,
            data.geminiSimilarity
        },
        {
            data.deepseekSimilarity,
            data.copilotSimilarity,
            data.mistralSimilarity
        },
        {
            data.llamaSimilarity,
            data.aiProbability,
            data.humanProbability
        }
    };
}