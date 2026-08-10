#ifndef DASHBOARD_MODELS_H
#define DASHBOARD_MODELS_H

#include <string>
#include <vector>

struct DashboardMetric
{
    std::string name;
    double value = 0.0;
};

struct RadarMetric
{
    std::string label;
    double value = 0.0;
};

struct TimelinePoint
{
    int sentenceNumber = 0;
    double aiScore = 0.0;
    double humanScore = 0.0;
};

struct DashboardData
{
    std::vector<DashboardMetric> statistics;
    std::vector<RadarMetric> radar;
    std::vector<TimelinePoint> timeline;
};

#endif