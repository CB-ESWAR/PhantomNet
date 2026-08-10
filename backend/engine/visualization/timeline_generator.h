#ifndef TIMELINE_GENERATOR_H
#define TIMELINE_GENERATOR_H

#include "dashboard_data.h"

#include <vector>

class TimelineGenerator
{
public:

    static std::vector<double> generate(
        const DashboardData& data
    );

};

#endif