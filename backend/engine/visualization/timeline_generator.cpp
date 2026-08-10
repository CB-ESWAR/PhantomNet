#include "timeline_generator.h"

using namespace std;

vector<double> TimelineGenerator::generate(
    const DashboardData& data)
{
    vector<double> timeline;

    timeline.push_back(data.aiProbability);
    timeline.push_back(data.confidence);
    timeline.push_back(data.reliability);

    return timeline;
}