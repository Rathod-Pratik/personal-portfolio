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

// Create function that takes head by reference to a pointer
void create(node *&head, int value)
{
    newnode = new node(value);

    if (head == nullptr) // If the list is empty
    {
        head = temp = newnode;
    }
    else
    {
        temp->next = newnode; // Link the new node
        temp = newnode;       // Move temp to the new node
    }
}

// Display function
void display(node *head)
{
    temp = head;
    cout << endl;
    while (temp != nullptr) // Traverse till the end of the list
    {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
}

/// Delete head of list
void deleteAtHead(node *&head)
{
    node *todelete = head;
    head = head->next;
    delete todelete;
}

// Delete specific value from list
void deletion(node *&head, int value)
{
    node *temp = head;

    if (head == nullptr)
    { // If the list is empty
        return;
    }

    // Check if the value to be deleted is at the head
    if (head->data == value)
    {
        deleteAtHead(head);
        return;
    }

    // Check if there is only one element in the list
    if (head->next == nullptr)
    {
        deleteAtHead(head);
        return;
    }

    // Traverse to find the node before the target node
    while (temp->next->data != value)
    {
        temp = temp->next;
    }

    if (temp->next == nullptr)
    { // If the value is not found
        return;
    }

    node *todelete = temp->next;
    temp->next = temp->next->next;

    delete todelete;
}

// make a node and insert at first node
void insertTop(node *&head, int value)
{
    newnode = new node(value);
    temp = head;

    newnode->next = head;
    head = newnode;
}

// make a node and insert at specific position
void insertAtPos(node *&head, int value, int pos)
{
    node *newNode = new node(value); // Create a new node
    node *temp = head;

    for (int i = 1; i < pos - 1 && temp != nullptr; i++)
    {
        temp = temp->next; // Traverse to the position
    }

    if (temp != nullptr)
    {
        newNode->next = temp->next; // Insert the node
        temp->next = newNode;
    }
}

// make a node and insert at specfic position
void insertEnd(node *&head, int value)
{
    newnode = new node(value);
    temp = head;

    temp = temp->next;
    while (temp->next != nullptr)
    {
        temp = temp->next;
    }
    temp->next = newnode;
}

node *reverse(node *&head)
{
    if (head == nullptr || head->next == nullptr)
    {
        return head;
    }

    newnode = reverse(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newnode;
}
void Sort(node *&head)
{
    if (!head || !head->next)
        return; // If the list is empty or has only one node, it's already sorted.

    bool swapped;
    node *ptr1;
    node *lptr = nullptr; // This will mark the end of the unsorted portion of the list

    do
    {
        swapped = false;
        ptr1 = head;

        while (ptr1->next != lptr)
        {
            if (ptr1->data > ptr1->next->data)
            {
                // Swap the data
                swap(ptr1->data, ptr1->next->data);
                swapped = true;
            }
            ptr1 = ptr1->next;
        }
        lptr = ptr1; // Reduce the unsorted portion of the list
    } while (swapped);
}

bool findNode(node *head, int value)
{
    node *temp = head;
    while (temp != nullptr)
    {
        if (temp->data == value)
        {
            return true; // Value found
        }
        temp = temp->next;
    }
    return false; // Value not found
}

void Cout(node *&head)
{
    temp = head;
    int a = 1;
    temp = temp->next;
    while (temp->next != nullptr)
    {
        temp = temp->next;
        ++a;
    }
    if (a == 1)
    {
        cout << "There one element in the list" << endl;
    }
    else
    {
        cout << "There are " << a << " element in the list" << endl;
    }
}
int main()
{
    node *head = nullptr; // Head pointer initialized to nullptr (empty list)

    // use to create node
    create(head, 10);
    create(head, 90);
    create(head, 100);

    // insert node at top of the list
    insertTop(head, 5);

    // insert node at end of the list
    insertEnd(head, 35);

    // insert node at specific lacation of the list
    insertAtPos(head, 200, 2);

    // Display all node of the list
    display(head); // Display the list

    // delete the node from the list
     deletion(head, 10);

    // dlelete the fisrt node of the list
    deleteAtHead(head);

    // sort list in assending order
    Sort(head);

    // display(head); // Display the list

    // reverse the list
    head = reverse(head);
    display(head); // Display the list

    // cout the length of the list
    Cout(head);

    // find value in the node
    int node = findNode(head, 100);
    cout << "Value find at the " << node << " location";
    return 0;
}
