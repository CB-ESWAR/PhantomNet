#ifndef HEATMAP_H
#define HEATMAP_H

#include "dashboard_data.h"

#include <vector>

class HeatMap
{
public:

    static std::vector<std::vector<double>> generate(
        const DashboardData& data
    );

};

#endif