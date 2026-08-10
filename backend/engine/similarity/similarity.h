#ifndef SIMILARITY_H
#define SIMILARITY_H

#include "../models/models.h"

class Similarity
{
public:

    static double humanSimilarity(
        const FeatureVector& features
    );

    static double aiSimilarity(
        const FeatureVector& features
    );
};

#endif