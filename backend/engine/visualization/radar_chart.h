#ifndef RADAR_CHART_H
#define RADAR_CHART_H

#include "dashboard_data.h"

#include <vector>

class RadarChart
{
public:

    static std::vector<double> generate(
        const DashboardData& data
    );

};

#endif