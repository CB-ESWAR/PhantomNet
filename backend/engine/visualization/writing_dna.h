#ifndef WRITING_DNA_H
#define WRITING_DNA_H

#include "dashboard_data.h"

#include <vector>

class WritingDNA
{
public:

    static std::vector<double> generate(
        const DashboardData& data
    );

};

#endif