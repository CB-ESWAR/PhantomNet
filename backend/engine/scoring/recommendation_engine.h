#ifndef RECOMMENDATION_ENGINE_H
#define RECOMMENDATION_ENGINE_H

#include "../models/models.h"

#include <string>

class RecommendationEngine
{
public:

    static std::string generate(
        const Prediction& prediction
    );

};

#endif