#ifndef READABILITY_H
#define READABILITY_H

#include "../models/models.h"

class Readability
{
public:

    static std::string level(
        const FeatureVector& features
    );

};

#endif