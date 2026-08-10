#ifndef COSINE_SIMILARITY_H
#define COSINE_SIMILARITY_H

#include <vector>

class CosineSimilarity
{
public:

    static double compute(
        const std::vector<double>& a,
        const std::vector<double>& b
    );
};

#endif