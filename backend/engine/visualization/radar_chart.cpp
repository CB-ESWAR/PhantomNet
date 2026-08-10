#include "radar_chart.h"

using namespace std;

vector<double> RadarChart::generate(
    const DashboardData& data)
{
    vector<double> radar;

    radar.push_back(data.stylometricScore);
    radar.push_back(data.statisticalScore);
    radar.push_back(data.readabilityScore);
    radar.push_back(data.fingerprintScore);
    radar.push_back(data.similarityScore);

    return radar;
}