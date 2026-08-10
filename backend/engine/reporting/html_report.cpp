#include "html_report.h"

#include <sstream>

using namespace std;

string HtmlReport::generate(
    const Prediction& prediction)
{
    stringstream html;

    html << "<!DOCTYPE html>";
    html << "<html>";
    html << "<head>";
    html << "<title>PhantomNet Report</title>";
    html << "</head>";

    html << "<body>";

    html << "<h1>PhantomNet AI Detection Report</h1>";

    html << "<h2>Verdict</h2>";
    html << "<p>" << prediction.verdict << "</p>";

    html << "<h2>Probabilities</h2>";

    html << "<ul>";

    html << "<li>AI Probability : "
         << prediction.aiProbability
         << "%</li>";

    html << "<li>Human Probability : "
         << prediction.humanProbability
         << "%</li>";

    html << "<li>Confidence : "
         << prediction.confidence
         << "%</li>";

    html << "<li>Reliability : "
         << prediction.reliability
         << "%</li>";

    html << "</ul>";

    html << "<h2>Evidence</h2>";

    html << "<ul>";

    for(const auto& reason : prediction.evidence)
    {
        html << "<li>"
             << reason
             << "</li>";
    }

    html << "</ul>";

    html << "<h2>Recommendation</h2>";

    html << "<p>"
         << prediction.recommendation
         << "</p>";

    html << "</body>";

    html << "</html>";

    return html.str();
}