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

void create(node *&head, int value)
{
    newnode = new node(value);

    if (head == nullptr)
    {
        head = newnode;
    }
    else
    {
        temp = head;
        while (temp->next != nullptr)
        {
            temp = temp->next;
        }

        temp->next = newnode;
        newnode->prev = temp;
    }
}
void insertAtFirst(node *&head, int value)
{
    newnode = new node(value);
    if (head == nullptr)
    {
        head = newnode;
    }
    else
    {
        newnode->next = head;
        head->prev = newnode;
        head = newnode;
    }
}
void insert(node *&head, int value)
{
    create(head, value);
}
void display(node *&head)
{
    temp = head;
    while (temp != nullptr)
    {
        cout << temp->data;
        if (temp->next != nullptr)
        {
            cout << "->";
        }
        temp = temp->next;
    }
}

void insertAtPos(node *&head, int value, int pos)
{
    newnode = new node(value);
    temp = head;
    for (int i = 1; i < pos - 1 && temp != nullptr; i++)
    {
        temp = temp->next;
    }

    if (temp != nullptr)
    {
        newnode->next = temp->next;
        temp->next = newnode;
    }
}
void Count(node *&head)
{
    temp = head;
    int a = 0;
    while (temp != nullptr)
    {
        ++a;
        temp = temp->next;
    }
    cout << "\nThere are " << a << " nodes in the list" << endl;
}

void deleteAtTail(node *&head)
{
    temp = head;
    if (head == nullptr)
    {
        cout << "List is empty " << endl;
        return;
    }
    else
    {

        if (head->next == nullptr)
        {
            delete head;
            head = nullptr;
            return;
        }
        else
        {
            while (temp->next != nullptr)
            {
                temp = temp->next;
            }
            temp->prev->next = nullptr;
            delete temp;
        }
    }
}
void deleteAtHead(node *&head)
{
    temp = head;
    if (head == nullptr)
    {
        cout << "The list is empty " << endl;
        return;
    }
    else
    {
        if (head->next == nullptr)
        {
            delete head;
            return;
        }
        else
        {
            head = head->next;
            head->prev = nullptr;
            delete temp;
        }
    }
}
node *deleteAtPos(node *&head, int pos)
{

    if (head == nullptr || pos < 1)
    {
        return head;
    }

    int i;
    temp = head;
    if (head == nullptr)
    {
        return head;
    }

    for (i = 1; temp != nullptr && i < pos; ++i)
    {
        temp = temp->next;
    }
    if (temp->prev != nullptr)
    {
        temp->prev->next = temp->next;
    }
    else
    {
        head = temp->next;
    }
    if (temp->next != nullptr)
    {
        temp->next->prev = temp->prev;
    }
    delete temp;
    return head;
}

void reverse(node *&head)
{
    temp = nullptr;
    curr = head;

    while (curr != nullptr)
    {
        temp = curr->prev;
        curr->prev = curr->next;
        curr->next = temp;
        curr = curr->prev;
    }
    if (temp != nullptr)
    {
        head = temp->prev;
    }
}

void swap(node *a,node *b){
    int temp=a->data;
    a->data=b->data;
    b->data=temp;
}
void sort(node *head) {
    if (!head) 
        return;

    bool swapped;
    node *curr;
    node *lastsorted = nullptr;

    do {
        swapped = false;
        curr = head;

        while (curr->next != lastsorted) {  // Ensure we stop before last sorted element
            if (curr->data > curr->next->data) {
                swap(curr, curr->next);
                swapped = true;
            }
            curr = curr->next;
        }
        lastsorted = curr;  // Set lastsorted to the last node in this pass
    } while (swapped);
}

void search(node* head, int value) {
    curr = head;
    bool found = false;
    int i=1;

    // Traverse the list to search for the value
    while (curr != nullptr) {
        if (curr->data == value) {
            found = true;  // Value found
            cout <<endl<< "Value found at position :"<<i << endl;
            break;  // Exit the loop once the value is found
        }
        i++;
        curr = curr->next;
    }

    if (!found) {
        cout <<endl<< "Value " << value << " not found in the list." << endl;
    }
}

int main()
{
    node *head = nullptr;
    // Create a node
    create(head, 100);
    create(head, 200);
    create(head, 300);
    create(head, 400);
    create(head, 500);
    create(head, 600);

    // insert at first position
    insertAtFirst(head, 0);

    // insert at given position
    insertAtPos(head, 5, 3);

    // delete a head node
    deleteAtHead(head);

    // delete last node
    deleteAtTail(head);

    //delete node at specific position
    deleteAtPos(head, 4);

    sort(head);

    // display list of nodes
    display(head);
    search(head,500);
    // count the node
    Count(head);
}