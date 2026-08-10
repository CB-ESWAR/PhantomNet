#include "markdown_report.h"

#include <sstream>

using namespace std;

string MarkdownReport::generate(
    const Prediction& prediction)
{
    stringstream md;

    md << "# PhantomNet Report\n\n";

    md << "## Verdict\n";

    md << prediction.verdict << "\n\n";

    md << "## Probabilities\n";

    md << "- AI : "
       << prediction.aiProbability
       << "%\n";

    md << "- Human : "
       << prediction.humanProbability
       << "%\n";

    md << "- Confidence : "
       << prediction.confidence
       << "%\n";

    md << "- Reliability : "
       << prediction.reliability
       << "%\n\n";

    md << "## Evidence\n";

    for(const auto& item : prediction.evidence)
    {
        md << "- "
           << item
           << "\n";
    }

    md << "\n";

    md << "## Recommendation\n";

    md << prediction.recommendation
       << "\n";

    return md.str();
}