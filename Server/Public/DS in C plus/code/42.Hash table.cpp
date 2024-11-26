#include <iostream>
#include <list>
#include <string>
using namespace std;

class Hash_table {
private:
    static const int HashGroups = 10;
    list<pair<int, string>> table[HashGroups]; // Array of lists to store key-value pairs

public:
    bool isEmpty() const;
    int hashFunction(int key);
    void insertItem(int key, string value);
    void removeItem(int key);
    string searchTable(int key);
    void printTable();
};

// Check if the hash table is empty
bool Hash_table::isEmpty() const {
    for (int i = 0; i < HashGroups; i++) {
        if (!table[i].empty()) {
            return false;
        }
    }
    return true;
}

// Hash function to get index for a key
int Hash_table::hashFunction(int key) {
    return key % HashGroups;
}

// Insert a key-value pair into the hash table
void Hash_table::insertItem(int key, string value) {
    int hashValue = hashFunction(key);
    auto& cell = table[hashValue];
    auto it = begin(cell);
    bool keyExists = false;

    // Check if the key already exists in the cell
    for (; it != end(cell); it++) {
        if (it->first == key) {
            keyExists = true;
            it->second = value; // Replace the existing value
            cout << "Key exists, value replaced." << endl;
            break;
        }
    }

    // If key does not exist, add a new key-value pair
    if (!keyExists) {
        cell.emplace_back(key, value);
    }
}

// Remove a key-value pair from the hash table
void Hash_table::removeItem(int key) {
    int hashValue = hashFunction(key);
    auto& cell = table[hashValue];
    auto it = begin(cell);

    for (; it != end(cell); it++) {
        if (it->first == key) {
            cell.erase(it);
            cout << "Key " << key << " removed." << endl;
            return;
        }
    }
    cout << "Key " << key << " not found." << endl;
}

// Search for a key in the hash table and return its value
string Hash_table::searchTable(int key) {
    int hashValue = hashFunction(key);
    auto& cell = table[hashValue];
    auto it = begin(cell);

    for (; it != end(cell); it++) {
        if (it->first == key) {
            return it->second;
        }
    }
    return "Key not found";
}

// Print the contents of the hash table
void Hash_table::printTable() {
    for (int i = 0; i < HashGroups; i++) {
        if (!table[i].empty()) {
            cout << "Hash Group " << i << " :";
            for (auto& pair : table[i]) {
                cout << " (Key: " << pair.first << ", Value: " << pair.second << ")";
            }
            cout << endl;
        }
    }
}

// Main function to test the Hash_table class
int main() {
    Hash_table ht;

    if (ht.isEmpty()) {
        cout << "Hash table is empty!" << endl;
    }

    ht.insertItem(100, "Alice");
    ht.insertItem(120, "Bob");
    ht.insertItem(130, "Charlie");
    ht.insertItem(120, "David"); // This should replace "Bob" with "David" for key 120

    ht.printTable();

    cout << "Searching for key 100: " << ht.searchTable(100) << endl;
    cout << "Searching for key 110: " << ht.searchTable(110) << endl;

    ht.removeItem(120); // Removes "David"
    ht.printTable();

    if (ht.isEmpty()) {
        cout << "Hash table is empty!" << endl;
    } else {
        cout << "Hash table is not empty!" << endl;
    }

    return 0;
}
