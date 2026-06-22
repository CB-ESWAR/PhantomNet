#include <iostream>
#include <fstream>
#include <sstream>
#include <unordered_set>
#include <string>

using namespace std;

int main() {
    ifstream file("../data/comments.txt");

    if (!file.is_open()) {
        cout << "Error opening file!" << endl;
        return 1;
    }

    unordered_set<string> uniqueWords;
    string line;
    int totalWords = 0;

    while (getline(file, line)) {
        stringstream ss(line);
        string word;

        while (ss >> word) {
            totalWords++;
            uniqueWords.insert(word);
        }
    }

    file.close();

    double diversity = 0;

    if (totalWords > 0) {
        diversity = (double)uniqueWords.size() / totalWords;
    }

    cout << "===== PhantomNet Report =====" << endl;
    cout << "Total Words: " << totalWords << endl;
    cout << "Unique Words: " << uniqueWords.size() << endl;
    cout << "Vocabulary Diversity: " << diversity << endl;

    return 0;
}