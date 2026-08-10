#include "explanation_engine.h"

using namespace std;

vector<string> ExplanationEngine::generate(
    const FeatureVector& f)
{
    vector<string> reasons;

    if(f.transitionDensity > 0.20)
        reasons.push_back(
            "High transition phrase density"
        );

    if(f.aiPhraseDensity > 0.20)
        reasons.push_back(
            "Frequent AI-style phrases"
        );

    if(f.rhythmConsistency > 0.80)
        reasons.push_back(
            "Highly uniform sentence rhythm"
        );

    if(f.templateSimilarity > 0.60)
        reasons.push_back(
            "Template-like document structure"
        );

    if(f.lexicalDensity > 0.80)
        reasons.push_back(
            "High lexical density"
        );

    return reasons;
}