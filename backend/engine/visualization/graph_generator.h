#ifndef GRAPH_GENERATOR_H
#define GRAPH_GENERATOR_H

#include "dashboard_data.h"

class GraphGenerator
{
public:

    static DashboardData generate(
        const Prediction& prediction
    );

};

#endif