#include <iostream>
using namespace std;
class node
{
public:
    int data;
    node *next, *prev;

    node(int value)
    {
        data = value;
        next = nullptr;
        prev = nullptr;
    }
};

node *newnode, *temp, *curr;
