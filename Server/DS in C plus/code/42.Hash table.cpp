#include<iostream>
#include<list>
#include<cstring>
using namespace std;

class Hash_table
{
private:
    static const int HashGroups=10;
    list<pair<int,string>>table[HashGroups];
public:
   bool isEmpty()const;
   int hashFunction(int key);
   void insertItem(int key,string value);
   void removeItem(int key);
   string searchTable(int key);
   void printTable();
};

bool Hash_table::isEmpty() const{
    int sum{};
    for(int i{}; i<HashGroups; i++){
        sum+=table[i].size();
    }

    if(!sum){
        return true;
    }
    return false;
}
int Hash_table::hashFunction(int key){
    return key % HashGroups;
}
void Hash_table::insertItem(int key,string value){
    int hashvalue=hashFunction(key);
    auto& ceil=table(hashvalue);
    auto a=begin(ceil);
    bool keyExists=false;
    for(; a !=end(ceil); a++){
        if(a->first==key){
            keyExists=true;
            a->second=value;
            cout<<"key exists, value replaced"<<endl;
            break;
        }
    }
    if(!keyExists){
        ceil.emplace_back(key,value);
    }
    return;
}