#ifndef EXPLANATION_ENGINE_H
#define EXPLANATION_ENGINE_H

#include "../models/models.h"

#include <vector>
#include <string>

class ExplanationEngine
{
public:

    static std::vector<std::string> generate(
        const FeatureVector& features
    );

};

#endif