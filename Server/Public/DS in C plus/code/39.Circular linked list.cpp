#include <iostream>
using namespace std;

class node
{
public:
    int data;
    node *next;

    node(int value)
    {
        data = value;
        next = nullptr;
    }
};

node *newnode, *temp, *curr;

void insertAtHead(node *&head, int value)
{
    newnode = new node(value);

    if (head == nullptr)
    {
        newnode->next = newnode;
        head = newnode;
        return;
    }
    temp = head;

    while (temp->next != head)
    {
        temp = temp->next;
    }
    newnode->next = head;
    temp->next = newnode;
    head = newnode;
}

void insertAtTail(node *&head, int value)
{
    if (head == nullptr)
    {
        insertAtHead(head, value);
        return;
    }
    newnode = new node(value);
    temp = head;

    while (temp->next != head)
    {
        temp = temp->next;
    }
    temp->next = newnode;
    newnode->next = head;
}

void insertAtPos(node *&head, int pos, int value)
{
    // If the list is empty
    if (head == nullptr)
    {
        if (pos != 1)
        {
            cout << "Invalid position!" << endl;
            return;
        }
        // Create a new node and make it point to itself (circular list)
        newnode = new node(value);
        head = newnode;
        head->next = head;
        return;
    }

    // Create a new node with the given data
    newnode = new node(value);

    // If inserting at position 1 (the head of the list)
    if (pos == 1)
    {
        curr = head;

        // Traverse to the last node
        while (curr->next != head)
        {
            curr = curr->next;
        }

        // Insert new node at the beginning
        newnode->next = head;
        curr->next = newnode;
        head = newnode; // Update head to the new node
        return;
    }

    // For other positions, traverse the list to find the correct spot
    curr = head;
    int count = 1;

    // Traverse the list to the position just before the desired position
    while (count < pos - 1 && curr->next != head)
    {
        curr = curr->next;
        count++;
    }

    // If we reached the position
    if (count == pos - 1)
    {
        newnode->next = curr->next;
        curr->next = newnode;
    }
    else
    {
        // Position is out of bounds
        cout << "Invalid position!" << endl;
    }

    return;
}

void display(node *head)
{
    if (head == nullptr)
    {
        cout << "List is empty" << endl;
        return;
    }
    temp = head;

    do
    {
        cout << temp->data << " ";
        temp = temp->next;
    } while (temp != head);

    cout << endl;
}

void deleteAtTail(node *&head)
{
    if (head == nullptr)
    {
        // If the list is empty
        cout << "List is empty, nothing to delete." << endl;
        return;
    }

    temp = head; // Temporary pointer to traverse the list

    // If there's only one node in the list
    if (head->next == head)
    {
        delete head;    // Delete the single node
        head = nullptr; // Set head to nullptr since the list is now empty
        return;
    }

    // Traverse the list to find the second last node
    curr = head;
    while (curr->next->next != head)
    { // Stop at the second last node
        curr = curr->next;
    }

    // Delete the last node (curr->next)
    node *lastNode = curr->next;
    curr->next = head; // Update the second last node to point to head
    delete lastNode;   // Update head to the new last node
}
void Search(node *head, int value)
{
    if (head == nullptr)
    {
        cout << "List is empty!" << endl;
        return;
    }

    curr = head;
    int position = 1; // Start with position 1

    // Loop through the circular linked list
    do
    {
        if (curr->data == value)
        {
            cout << "Value " << value << " found at node " << position << endl;
            return;
        }
        curr = curr->next;
        position++;
    } while (curr != head); // Loop ends when we come back to the head

    // If the value is not found
    cout << "Value " << value << " not found in the list." << endl;
}
void deleteAtHead(node *&head)
{
    temp = head;

    while (temp->next != head)
    {
        temp = temp->next;
    }
    node *todelete = head;

    temp->next = head->next;
    head = head->next;
    delete todelete;
}

void updateValue(node *head, int currValue, int newValue)
{
    if (head == nullptr)
    {
        cout << "List is empty!" << endl;
        return;
    }

    curr = head;

    // Loop through the circular linked list
    do
    {
        if (curr->data == currValue)
        {
            curr->data = newValue; // Update node value
            cout << "Node with value " << currValue << " updated to " << newValue << endl;
            return;
        }
        curr = curr->next;
    } while (curr != head); // Loop ends when we come back to the head

    // If the node with the currValue is not found
    cout << "Node with value " << currValue << " not found in the list." << endl;
}
int count(node *head)
{
    if (head == nullptr)
    {
        return 0; // If the list is empty, return 0
    }

    curr = head;
    int count = 0;

    // Loop through the circular linked list
    do
    {
        count++; // Increment the counter for each node
        curr = curr->next;
    } while (curr != head); // Stop when we get back to the head

    cout << "There are " << count << " nodes in the list " << endl; // Return the total number of nodes
}
void reverse(node *&head)
{
    if (head == nullptr || head->next == head)
    {
        return; // List is empty or has only one node
    }

    node *prev = nullptr;
    node *curr = head;
    node *next = nullptr;
    node *tail = head;

    // Loop through the list and reverse the links
    do
    {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    } while (curr != head); // Stop when you complete the circle

    // Fix the links of the new head and tail
    head->next = prev; // Last node (original head) now points to the new head
    head = prev;       // Update the head to the new head
}

int main()
{
    node *head = nullptr;

    insertAtHead(head, 1);
    insertAtPos(head, 2, 2);
    insertAtTail(head, 3);
    insertAtTail(head, 4);
    insertAtTail(head, 5);

    deleteAtHead(head);

    Search(head, 3);
    display(head);
    updateValue(head, 4, 400);
    deleteAtTail(head);
    reverse(head);
    display(head);
    count(head);
}