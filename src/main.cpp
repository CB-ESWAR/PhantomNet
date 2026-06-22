#include <iostream>
#include <fstream>
#include <sstream>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>
#include <vector>
#include <cmath>
#include <string>
#include <set>

using namespace std;

string normalizeWord(string word) {
    string result;

    for(char c : word) {
        if(isalpha(c)) {
            result += tolower(c);
        }
    }

    return result;
}

string cleanComment(string comment) {
    string result;

    for(char c : comment) {
        if(isalpha(c) || c == ' ') {
            result += tolower(c);
        }
    }

    return result;
}

set<string> getWords(string text) {

    set<string> words;

    stringstream ss(text);
    string word;

    while(ss >> word) {

        word = normalizeWord(word);

        if(!word.empty()) {
            words.insert(word);
        }
    }

    return words;
}

double similarityScore(string a, string b) {

    set<string> A = getWords(a);
    set<string> B = getWords(b);

    int common = 0;

    for(auto &word : A) {
        if(B.count(word))
            common++;
    }

    int total = A.size() + B.size() - common;

    if(total == 0)
        return 0;

    return (double)common / total * 100.0;
}

int main() {

    ifstream file("../data/comments.txt");

    if(!file.is_open()) {
        cout << "Error opening file!" << endl;
        return 1;
    }

    unordered_set<string> uniqueWords;
    unordered_map<string,int> commentFrequency;

    vector<int> commentLengths;
    vector<string> comments;

    string line;

    int totalWords = 0;
    int totalComments = 0;

    while(getline(file, line)) {

        if(line.empty())
            continue;

        totalComments++;

        comments.push_back(line);

        string normalizedComment = cleanComment(line);

        commentFrequency[normalizedComment]++;

        stringstream temp(line);

        string token;
        int wordsInComment = 0;

        while(temp >> token) {
            wordsInComment++;
        }

        commentLengths.push_back(wordsInComment);

        stringstream ss(line);
        string word;

        while(ss >> word) {

            word = normalizeWord(word);

            if(!word.empty()) {

                totalWords++;

                uniqueWords.insert(word);
            }
        }
    }

    file.close();

    double vocabularyDiversity = 0.0;

    if(totalWords > 0) {
        vocabularyDiversity =
            (double)uniqueWords.size() / totalWords;
    }

    int repeatedComments = 0;

    for(auto &entry : commentFrequency) {

        if(entry.second > 1) {
            repeatedComments += entry.second - 1;
        }
    }

    double repetitionIndex = 0.0;

    if(totalComments > 0) {

        repetitionIndex =
            ((double)repeatedComments /
            totalComments) * 100.0;
    }

    double averageLength = 0.0;

    for(int len : commentLengths) {
        averageLength += len;
    }

    if(!commentLengths.empty()) {
        averageLength /= commentLengths.size();
    }

    double variance = 0.0;

    for(int len : commentLengths) {

        variance +=
            (len - averageLength) *
            (len - averageLength);
    }

    if(!commentLengths.empty()) {
        variance /= commentLengths.size();
    }

    double standardDeviation =
        sqrt(variance);

    double highestSimilarity = 0.0;

    string firstComment;
    string secondComment;

    for(size_t i = 0; i < comments.size(); i++) {

        for(size_t j = i + 1;
            j < comments.size();
            j++) {

            double score =
                similarityScore(
                    comments[i],
                    comments[j]
                );

            if(score > highestSimilarity) {

                highestSimilarity = score;

                firstComment =
                    comments[i];

                secondComment =
                    comments[j];
            }
        }
    }

    double diversityScore =
        min(vocabularyDiversity * 100.0,
        100.0);

    double repetitionScore =
        max(0.0,
        100.0 - repetitionIndex);

    double varianceScore =
        min(standardDeviation * 20.0,
        100.0);

    double originalityScore =
        max(0.0,
        100.0 - highestSimilarity);

    double humanSignalScore =
        (0.3 * diversityScore) +
        (0.3 * repetitionScore) +
        (0.2 * varianceScore) +
        (0.2 * originalityScore);

    char grade;

    if(humanSignalScore >= 85)
        grade = 'A';
    else if(humanSignalScore >= 70)
        grade = 'B';
    else if(humanSignalScore >= 55)
        grade = 'C';
    else if(humanSignalScore >= 40)
        grade = 'D';
    else
        grade = 'E';

    string verdict;

    if(grade == 'A')
        verdict = "Highly Human";
    else if(grade == 'B')
        verdict = "Mostly Human";
    else if(grade == 'C')
        verdict = "Mixed Signals";
    else if(grade == 'D')
        verdict = "Suspicious";
    else
        verdict = "Highly Automated";

    cout << "====================================\n";
    cout << "         PHANTOMNET REPORT\n";
    cout << "====================================\n\n";

    cout << "Vocabulary Analysis\n";
    cout << "-------------------\n";

    cout << "Total Words: "
         << totalWords
         << endl;

    cout << "Unique Words: "
         << uniqueWords.size()
         << endl;

    cout << "Vocabulary Diversity: "
         << vocabularyDiversity
         << endl;

    cout << "\nRepetition Analysis\n";
    cout << "-------------------\n";

    cout << "Total Comments: "
         << totalComments
         << endl;

    cout << "Unique Comments: "
         << commentFrequency.size()
         << endl;

    cout << "Repeated Comments: "
         << repeatedComments
         << endl;

    cout << "Repetition Index: "
         << repetitionIndex
         << "%\n";

    cout << "\nSimilarity Detection\n";
    cout << "--------------------\n";

    int suspiciousPatterns = 0;

    for(auto &entry : commentFrequency) {

        if(entry.second >= 3) {
            suspiciousPatterns++;
        }
    }

    cout << "Suspicious Repeated Patterns: "
         << suspiciousPatterns
         << endl;

    cout << "\nTop Repeated Comments\n";
    cout << "---------------------\n";

    bool found = false;

    for(auto &entry : commentFrequency) {

        if(entry.second > 1) {

            found = true;

            cout << "\""
                 << entry.first
                 << "\" -> "
                 << entry.second
                 << " times\n";
        }
    }

    if(!found) {
        cout << "No repeated comments found\n";
    }

    cout << "\nComment Length Analysis\n";
    cout << "-----------------------\n";

    cout << "Average Length: "
         << averageLength
         << " words\n";

    cout << "Length Variance: "
         << variance
         << endl;

    cout << "Standard Deviation: "
         << standardDeviation
         << endl;

    cout << "\nOriginality Analysis\n";
    cout << "--------------------\n";

    cout << "Originality Score: "
         << originalityScore
         << "/100\n";

    cout << "Highest Similarity: "
         << highestSimilarity
         << "%\n";

    if(highestSimilarity > 50) {

        cout << "\nMost Similar Pair:\n";

        cout << firstComment
             << endl;

        cout << secondComment
             << endl;
    }

    cout << "\nBot Risk Assessment\n";
    cout << "-------------------\n";

    if(repetitionIndex > 50)
        cout << "HIGH BOT RISK\n";
    else if(repetitionIndex > 25)
        cout << "MEDIUM BOT RISK\n";
    else
        cout << "LOW BOT RISK\n";

    cout << "\nHuman Signal Analysis\n";
    cout << "---------------------\n";

    cout << "Human Signal Score: "
         << humanSignalScore
         << "/100\n";

    cout << "Grade: "
         << grade
         << endl;

    cout << "Verdict: "
         << verdict
         << endl;

    return 0;
}