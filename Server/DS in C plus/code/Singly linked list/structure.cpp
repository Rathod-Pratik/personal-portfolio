#include <iostream>
using namespace std;

class node
{
public:
    int data;
    node *next;

    // Constructor for the node
    node(int value)
    {
        data = value;
        next = nullptr;
    }
};

node *newnode, *temp;