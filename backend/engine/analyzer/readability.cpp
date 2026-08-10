#include "readability.h"

using namespace std;

string Readability::level(
    const FeatureVector& features)
{
    double score =
        features.fleschReadingEase;

    if(score >= 90)
        return "Very Easy";

    if(score >= 80)
        return "Easy";

    if(score >= 70)
        return "Fairly Easy";

    if(score >= 60)
        return "Standard";

    if(score >= 50)
        return "Fairly Difficult";

    if(score >= 30)
        return "Difficult";

    return "Very Difficult";
}