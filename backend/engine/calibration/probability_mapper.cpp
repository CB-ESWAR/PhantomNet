#include "probability_mapper.h"

#include <algorithm>

using namespace std;

double ProbabilityMapper::map(
    double score)
{
    score = std::max(0.0, score);
    score = std::min(1.0, score);

    return score * 100.0;
}